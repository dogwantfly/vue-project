<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <div class="d-flex justify-content-between align-items-center">
      <h1>訂單頁面</h1>
      <button type="button" class="btn btn-danger" @click="openModal('delete',item)" :class="{'disabled': !orders.length}">刪除全部訂單</button>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">聯絡人 / 電話</th>
          <th scope="col">電子郵件</th>
          <th scope="col">訂單品項</th>
          <th scope="col">應付金額</th>
          <th scope="col">訂單日期</th>
          <th scope="col">訂單狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" v-bind:key="item.id">
          <td scope="row">{{ item.id }}</td>
          <td v-if="item.user">
            {{ item.user.name }} <br>
            {{ item.user.tel }}
          </td>
          <td v-else>
            無
          </td>
          <td v-if="item.user">{{ item.user.email }}</td>
          <td v-else>無</td>
          <td>
            <template v-for="(item , key) in item.products" :key="key">
            <p>
              {{ item.product.title }} * {{ item.qty }}
            </p>
            </template>
          </td>
          <td>
            {{ $filters.currency(item.total) }}
          </td>
          <td>
            {{ $filters.date(item.create_at) }}
          </td>
          <td v-bind:class="item.is_paid ? 'text-success' : 'text-muted'">{{item.is_paid ? "已付款" : "未付款" }}</td>
          <td class="text-end">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-warning" v-on:click="openModal('edit',item)">檢視</button>
              <button type="button" class="btn btn-danger" v-on:click="openModal('delete',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 分頁 -->
  <pagination :pagination="pagination" @change-page="getOrders"></pagination>
  <!-- orderModal -->
  <order-modal :temp-order="tempOrder" ref="orderModal" @update="getOrders"></order-modal>
  <!-- delOrderModal -->
  <del-order-modal :temp-order="tempOrder" ref="delOrderModal" @delete="getOrders"></del-order-modal>
</template>
<script>
import pagination from '@/components/Pagination.vue'
import orderModal from '@/components/OrderModal.vue'
import delOrderModal from '@/components/DelOrderModal.vue'
export default ({
  components: {
    pagination,
    orderModal,
    delOrderModal
  },
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      loadingStatus: {},
      current_page: 1,
      isLoading: false
    }
  },
  methods: {
    // 取得訂單列表
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
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          console.log(error)
        })
    },
    // 開啟編輯、刪除、查看更多
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
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    // 取商品資料
    this.getOrders()
  }
})
</script>
