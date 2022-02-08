<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <header class="mb-5">
    <h1 class="mb-3">訂單管理</h1>
  </header>
  <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
    <button
      type="button"
      class="btn btn-outline-danger border-0"
      @click="openModal('delete',item)"
      :class="{'disabled': !orders.length}">
        <i class="bi bi-trash-fill me-2"></i>
      刪除全部訂單
    </button>
    <div class="input-group w-25 align-items-center border rounded-3">
      <div class="input-text px-3">
        <i class="bi bi-search"></i>
      </div>
      <input
        type="search"
        v-model.trim="orderSearchBar"
        placeholder="搜尋訂單編號"
        class="form-control border-0 flex-shrink-0">
    </div>
    <div class="input-group w-auto align-items-center">
      <label for="sort" class="me-2">排序</label>
      <select class="form-select" aria-label="select" v-model="sortBy" id="sort">
        <option selected value="">日期由新到舊（預設）</option>
        <option value="createdFromOldest" :disabled="orders.length ? false : true">日期由舊到新</option>
        <option value="totalFromHighest" :disabled="orders.length ? false : true">金額由高至低</option>
        <option value="totalFromLowest" :disabled="orders.length ? false : true">金額由低至高</option>
      </select>
    </div>
  </div>
  <div class="alert alert-danger border-0" v-if="orderSearchBar && searchResults">
    {{ searchResults }}
  </div>
  <ul class="nav nav-pills mb-3">
    <li class="nav-item">
      <a
        class="nav-link rounded-pill"
        :class="{'active': filterBy === ''}"
        href="#"
        @click.prevent="getOrders(1, 'allOrders')">
        所有訂單
      </a>
    </li>
    <li class="nav-item">
      <a
        class="nav-link rounded-pill"
        :class="{'active': filterBy === 'paid'}"
        href="#" @click.prevent="filterData('paid')">
        已付款
      </a>
    </li>
    <li class="nav-item">
      <a
        class="nav-link rounded-pill"
        href="#"
        :class="{'active': filterBy === 'unpaid'}"
        @click.prevent="filterData('unpaid')">
        未付款
      </a>
    </li>
  </ul>
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
          <td :class="item.is_paid ? 'text-success' : 'text-muted'">
            {{ item.is_paid ? "已付款" : "未付款" }}
          </td>
          <td class="text-end">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button
                type="button"
                class="btn btn-outline-secondary border-0 bi bi-eye-fill"
                @click="openModal('edit',item)"></button>
              <button
                type="button"
                class="btn btn-outline-danger border-0 bi bi-trash-fill"
                @click="openModal('delete',item)"></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="text-center text-muted" v-if="filterBy !== '' && !orders.length">
    <span v-if="filterBy === 'unpaid'">無未付款訂單</span>
    <span v-else-if="filterBy === 'paid'">無已付款訂單</span>
  </p>
  <Pagination :pagination="pagination" @change-page="getOrders"/>
  <OrderModal :temp-order="tempOrder" ref="orderModal" @update="getOrders"/>
  <DelOrderModal :temp-order="tempOrder" ref="delOrderModal" @delete="getOrders"/>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/backend/OrderModal.vue';
import DelOrderModal from '@/components/backend/DelOrderModal.vue';

export default ({
  components: {
    Pagination,
    OrderModal,
    DelOrderModal,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: '',
      loadingStatus: {},
      current_page: 1,
      isLoading: false,
      orderSearchBar: '',
      searchResults: '',
      allOrders: [],
      sortBy: '',
      filterBy: '',
      filtedOrders: '',
      sortedOrders: '',
      matchOrders: '',
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    getOrders(page = this.current_page, filter) {
      if (this.pagination !== '' && filter === 'allOrders') return;
      this.isLoading = true;
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`;
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得訂單');
            this.isLoading = false;
            return;
          }
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          this.current_page = response.data.pagination.current_page;
          this.filterBy = '';
          this.filtedOrders = '';
          this.matchOrders = '';
          this.allOrders = [];
          this.orders.forEach((order) => {
            this.allOrders.push(order);
          });
          if (this.pagination.total_pages > 1) {
            for (let i = 2; i <= this.pagination.total_pages; i += 1) {
              this.$http.get(`/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${i}`)
                .then((res) => {
                  if (!res.data.success) {
                    this.$httpMessageState(response, '取得訂單');
                    this.isLoading = false;
                    return;
                  }
                  const { orders } = res.data;
                  orders.forEach((order) => {
                    this.allOrders.push(order);
                  });
                  if (this.orderSearchBar !== '') {
                    this.searchOrders();
                  }
                  if (this.sortedOrders !== '') {
                    this.sortOrders(this.sortBy);
                  }
                });
            }
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
          this.isLoading = false;
        });
    },
    openModal(action, item) {
      switch (action) {
        case 'edit':
          this.tempOrder = { ...item };
          this.$refs.orderModal.openModal();
          break;
        case 'delete':
          this.tempOrder = { ...item };
          this.$refs.delOrderModal.openModal();
          break;
        default:
          break;
      }
    },
    searchOrders() {
      this.matchOrders = this.allOrders
        .filter((order) => order.id.toLowerCase().includes(this.orderSearchBar.toLowerCase()));
      if (this.matchOrders.length) {
        this.searchResults = '';
        this.orders = this.matchOrders;
        if (this.sortedOrders) {
          this.sortOrders(this.sortBy);
        } else {
          this.sortBy = '';
          this.sortedOrders = '';
        }
        this.filterBy = '';
        this.filtedOrders = '';
        this.pagination = '';
      } else {
        this.searchResults = '無符合搜尋結果，請再試試其他關鍵字～';
      }
    },
    sortOrders(sortBy) {
      let orders = [];
      this.pagination = '';
      if (this.filtedOrders) {
        orders = this.filtedOrders;
      } else if (this.matchOrders) {
        orders = this.matchOrders;
      } else {
        orders = this.allOrders;
      }
      switch (sortBy) {
        case 'totalFromLowest':
          orders.sort((a, b) => a.total - b.total);
          break;
        case 'totalFromHighest':
          orders.sort((a, b) => b.total - a.total);
          break;
        case 'createdFromOldest':
          orders.sort((a, b) => a.create_at - b.create_at);
          break;
        default:
          break;
      }
      this.sortedOrders = orders;
      this.orders = this.sortedOrders;
    },
    filterData(filterBy) {
      if (this.filterBy === filterBy) return;
      this.pagination = '';
      this.filterBy = filterBy;
      let orders = [];
      if (this.matchOrders) {
        orders = this.matchOrders;
      } else {
        orders = this.allOrders;
      }
      switch (filterBy) {
        case 'paid':
          this.filtedOrders = orders.filter((order) => order.is_paid);
          break;
        case 'unpaid':
          this.filtedOrders = orders.filter((order) => !order.is_paid);
          break;
        default:
          break;
      }
      if (this.sortedOrders) {
        this.sortOrders(this.sortBy);
      } else {
        this.orders = this.filtedOrders;
      }
    },
  },
  watch: {
    sortBy(newSort, oldSort) {
      if (newSort === oldSort) {
        if (newSort === 'totalFromLowest' || newSort === 'totalFromHighest') {
          this.sortOrders(newSort);
        }
      } else if (newSort === '') {
        this.sortedOrders = '';
        this.getOrders();
      } else {
        this.sortOrders(newSort);
      }
    },
    orderSearchBar(newValue) {
      if (newValue !== '') {
        this.searchOrders();
      } else {
        this.getOrders();
      }
    },
  },
  mounted() {
    this.$http.defaults.baseURL = process.env.VUE_APP_API;
    this.getOrders();
  },
});
</script>
