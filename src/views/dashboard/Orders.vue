<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <header class="mb-5">
    <h1 class="mb-3">訂單管理</h1>
  </header>
  <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
    <button type="button" class="btn btn-outline-danger border-0" @click="openModal('delete',item)" :class="{'disabled': !orders.length}">
      <i class="bi bi-trash-fill me-2"></i>
      刪除全部訂單
    </button>
    <div class="input-group w-25 align-items-center border rounded-3">
      <div class="input-text px-3">
        <i class="bi bi-search"></i>
      </div>
       <input type="search" v-model="orderSearchBar" placeholder="搜尋訂單編號" class="form-control border-0 flex-shrink-0">
    </div>
    <div class="input-group w-auto align-items-center">
      <label for="sort" class="me-2">排序</label>
      <select class="form-select" aria-label="select" v-model="sortBy" id="sort">
        <option selected value="">日期由新到舊（預設）</option>
        <option value="totalFromHighest">金額由高至低</option>
        <option value="totalFromLowest">金額由低至高</option>
      </select>
    </div>
  </div>
  <div class="alert alert-danger border-0" v-if="orderSearchBar && searchResults">
    {{ searchResults }}
  </div>
  <div class="table-responsive">
    <table class="table table-borderless table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">聯絡人 / 電話</th>
          <th scope="col">電子郵件</th>
          <th scope="col">應付金額</th>
          <th scope="col">訂單日期</th>
          <th scope="col">訂單狀態</th>
          <th scope="col" class="text-end">檢視 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td scope="row">{{ item.id }}</td>
          <td v-if="item.user">
            <i class="bi bi-person-fill me-2 text-muted"></i>
            {{ item.user.name }} <br>
            <i class="bi bi-telephone-fill me-2 text-muted"></i>
            {{ item.user.tel }}
          </td>
          <td v-else>
            無
          </td>
          <td v-if="item.user">{{ item.user.email }}</td>
          <td v-else>無</td>
          <td>
            ${{ $filters.currency(item.total) }}
          </td>
          <td>
            {{ $filters.date(item.create_at) }}
          </td>
          <td :class="item.is_paid ? 'text-success' : 'text-muted'">{{item.is_paid ? "已付款" : "未付款" }}</td>
          <td class="text-end">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-outline-secondary border-0 bi bi-eye-fill" @click="openModal('edit',item)"></button>
              <button type="button" class="btn btn-outline-danger border-0 bi bi-trash-fill" @click="openModal('delete',item)"></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pagination="pagination" @change-page="getOrders"/>
  <OrderModal :temp-order="tempOrder" ref="orderModal" @update="getOrders"/>
  <DelOrderModal :temp-order="tempOrder" ref="delOrderModal" @delete="getOrders"/>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/OrderModal.vue'
import DelOrderModal from '@/components/DelOrderModal.vue'
export default ({
  components: {
    Pagination,
    OrderModal,
    DelOrderModal
  },
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      loadingStatus: {},
      current_page: 1,
      isLoading: false,
      orderSearchBar: '',
      searchResults: '',
      allOrders: [],
      sortBy: ''
    }
  },
  methods: {
    getOrders (page = this.current_page) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.isLoading = false
            return
          }
          this.orders = response.data.orders
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          this.orderSearchBar = ''
          this.sortBy = ''
          this.allOrders = []
          this.orders.forEach(order => {
            this.allOrders.push(order)
          })
          if (this.pagination.total_pages > 1) {
            for (let i = 2; i <= this.pagination.total_pages; i += 1) {
              this.$http.get(`/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${i}`)
                .then(response => {
                  if (!response.data.success) {
                    this.isLoading = false
                    return
                  }
                  const orders = response.data.orders
                  orders.forEach(order => {
                    this.allOrders.push(order)
                  })
                })
            }
          }
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    openModal (action, item) {
      switch (action) {
        case 'edit':
          this.tempOrder = { ...item }
          this.$refs.orderModal.openModal()
          break
        case 'delete':
          this.tempOrder = { ...item }
          this.$refs.delOrderModal.openModal()
          break
      }
    },
    searchOrders () {
      const matchOrders = this.allOrders.filter(order => order.id.toLowerCase().includes(this.orderSearchBar.trim().toLowerCase()))
      if (matchOrders.length) {
        this.searchResults = ''
        this.orders = matchOrders
        this.pagination = ''
      } else {
        this.searchResults = '無符合搜尋結果，請再試試其他關鍵字～'
      }
    },
    sortOrders (sortBy) {
      switch (sortBy) {
        case 'totalFromLowest':
          this.allOrders.sort(function (a, b) {
            return a.total - b.total
          })
          this.orders = this.allOrders
          this.pagination = ''
          break
        case 'totalFromHighest':
          this.allOrders.sort(function (a, b) {
            return b.total - a.total
          })
          this.orders = this.allOrders
          this.pagination = ''
          break
        default:
          break
      }
    }
  },
  watch: {
    sortBy (newSort, oldSort) {
      if (newSort === oldSort) {
        if (newSort === 'totalFromLowest' || newSort === 'totalFromHighest') {
          this.sortOrders()
        }
      } else if (newSort === '') {
        this.getOrders()
      } else {
        this.sortOrders(newSort)
      }
    },
    orderSearchBar (newValue) {
      if (newValue !== '') {
        this.searchOrders()
      } else {
        this.getOrders()
      }
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrders()
  }
})
</script>
