<template>
<Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
<div class="banner">
  <div class="container h-100 d-flex align-items-center justify-content-center">
    <h1>
      查看您的歷史訂單 / 訂單狀態
    </h1>
  </div>
</div>
<div class="orders container">
  <div class="row py-5">
    <div class="col-md-10 col-xl-8 mx-auto">
      <div class="input-group mb-5 flex-nowrap">
        <span class="input-group-text bi bi-search border-0"></span>
        <input type="search" name="searchOrder" class="d-block w-100 form-control border-0" id="searchOrder" placeholder="搜尋您的訂單編號" @keydown="searchOrder($event)" v-model="searchOrderId">
        <button class="btn btn-primary flex-shrink-0" type="button" @click="searchOrder">搜尋</button>
      </div>
      <template v-if="searchOrderResult && orderResult">
        <div class="bg-light rounded-3 p-3 text-primary">
          <h2 class="fs-4 text-center mb-3">訂單編號:<br> {{ orderResult.id }}</h2>
          <h3 class="fs-5">付款狀態</h3>
          <p :class="orderResult.is_paid ? 'text-success' : 'text-muted'">
            {{ orderResult.is_paid ? '已付款' : '未付款'}}
          </p>
          <router-link :to="`/checkout/${orderResult.id}`" class="btn btn-outline-primary mb-3" v-if="!orderResult.is_paid">
            前往付款
          </router-link>
          <h3 class="fs-5">用戶資料</h3>
          <div class="table-responsive">
            <table class="table">
              <tbody v-if="orderResult.user">
                <tr>
                  <th scope="row">姓名</th>
                  <td> {{ orderResult.user.name }} </td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>{{ orderResult.user.tel }}</td>
                </tr>
                <tr>
                  <th scope="row">地址</th>
                  <td>{{ orderResult.user.address }}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{{ orderResult.user.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 class="fs-5 border-top pt-3">訂單細節</h3>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">訂單日期</th>
                  <td> {{ new Date(orderResult.create_at * 1000).toLocaleString() }} </td>
                </tr>
                <tr>
                  <th scope="row">訂單編號</th>
                  <td>{{ orderResult.id }}</td>
                </tr>
                <tr>
                  <th scope="row">總金額</th>
                  <td>NT$ {{ $filters.currency(orderResult.total) }}</td>
                </tr>
                <tr v-if="orderResult.is_paid">
                  <th scope="row">付款時間</th>
                  <td> {{ $filters.date(orderResult.paid_date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 class="fs-5 border-top pt-3">訂單品項</h3>
          <table class="table" v-if="orderResult.products">
            <tbody>
              <tr v-for="product in orderResult.products" :key="product.id">
                <td>
                  <img :src="product.product.imageUrl" :alt="product.product.title" class="img-fluid mb-3 img-size">
                </td>
                <td>
                  {{ product.product.title }}
                </td>
                <td>
                  x{{ product.qty }}
                </td>
                <td class="d-none d-md-block">
                  NT${{ $filters.currency(product.product.price) }}
                </td>
                <td>
                  <template v-if="product.final_total !== product.total">
                    <del>{{ $filters.currency(product.total) }}</del>
                    <br>
                    <small class="text-success">折扣價：</small>
                  </template>
                    {{ $filters.currency(product.final_total) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <p v-else-if="searchOrderResult === false && searchOrderId" class="text-center bg-light rounded-3 py-3">無符合的訂單</p>
    </div>
  </div>
  <div class="row py-5">
    <div class="col-md-10 col-xl-8 mx-auto">
      <h3 class="fs-5 text-center">
        尚未付款的訂單共 <span class="text-danger fw-bold">{{ unpaidOrders.length }}</span>  筆
      </h3>
      <ul class="accordion bg-light" id="accordionOrders">
        <li class="accordion-item rounded-3 border-0" v-for="order in unpaidOrders" :key="order.id">
          <h2 class="accordion-header" :id="`heading${order.num}`">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#${order.id}`" aria-expanded="true" :aria-controls="`collapse${order.num}`">
              {{ order.id }}
            </button>
          </h2>
          <div :id="order.id" class="accordion-collapse collapse" :aria-labelledby="`heading${order.num}`" data-bs-parent="#accordionOrders">
            <div class="accordion-body">
              <div class="table-responsive">
                <table class="table" v-if="order.products">
                  <tbody>
                    <tr v-for="product in order.products" :key="product.id">
                      <td>
                        <img :src="product.product.imageUrl" :alt="product.product.title" class="img-fluid mb-3 img-size">
                      </td>
                      <td>
                        {{ product.product.title }}
                      </td>
                      <td>
                        x{{ product.qty }}
                      </td>
                      <td class="d-none d-md-block">
                        {{ $filters.currency(product.product.price) }}
                      </td>
                      <td>
                        <template v-if="product.final_total !== product.total">
                          <del>{{ $filters.currency(product.total) }}</del>
                          <br>
                          <small class="text-success">折扣價：</small>
                        </template>
                          {{ $filters.currency(product.final_total) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>NT$ {{ $filters.currency(order.total) }}</p>
              <router-link :to="`/checkout/${order.id}`" class="btn btn-outline-primary">
                前往付款
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      orders: '',
      unpaidOrders: '',
      isLoading: false,
      searchOrderResult: '',
      orderResult: '',
      searchOrderId: ''
    }
  },
  inject: ['$httpMessageState'],
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/orders?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得訂單列表')
            this.isLoading = false
            return
          }
          this.orders = response.data.orders
          this.unpaidOrders = this.orders.filter(order => !order.is_paid)
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    searchOrder (e) {
      this.searchOrderResult = ''
      this.orderResult = ''
      if (e.type === 'keydown' && e.keyCode !== 13) return
      this.orders.forEach(order => {
        if (order.id === this.searchOrderId) {
          this.searchOrderResult = true
          this.orderResult = { ...order }
        }
      })
      if (!this.orderResult) {
        this.searchOrderResult = false
      }
    }
  },
  created () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrders()
  }
}
</script>
