<template>
<!-- http://localhost:8080/#/checkout/-MmE0wRI4QLlgsc4hT9f -->
<!-- https://dribbble.com/shots/15024858-Marketplace-UIKIT -->
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <div class="banner" v-if="!order.is_paid">
    <div class="container h-100 d-flex align-items-center justify-content-center">
      <h1>
        確認訂單並付款
      </h1>
    </div>
  </div>
  <div class="order-success banner" v-else>
    <div class="container h-100 d-flex align-items-center justify-content-center text-light">
      <h1 class="text-center">
        訂單成立 <span class="d-none d-md-inline">，</span><br class="d-md-none">感謝您的購買
      </h1>
    </div>
  </div>
  <div class="container pt-5">
    <div class="row mb-5">
      <div class="col-md-10 mx-auto">
        <ol class="progress-bar row list-unstyled justify-content-between text-center">
          <li class="col-4 done">確認購物車品項</li>
          <li class="col-4 done">填寫資料</li>
          <li class="col-4" :class="order.is_paid ? 'done' : 'active'">確認訂單並付款</li>
        </ol>
      </div>
    </div>
    <div class="checkout row py-3 bg-light rounded-3 my-5">
      <div class="col-12 py-3">
        <h2 class="h3">訂單日期  {{ new Date(order.create_at * 1000).toLocaleString() }}</h2>
      </div>
      <div class="checkout-product col-lg-8">
        <h3 class="h5">商品資訊</h3>
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
                  {{ product.qty }} {{ product.product.unit }}
                </td>
                <td>
                  ${{ $filters.currency(product.product.price) }}
                </td>
                <td>
                  <template v-if="product.final_total !== product.total">
                    <del class="small text-muted">${{ $filters.currency(product.total) }}</del>
                    <br>
                    <small class="text-success me-1">折扣價</small>
                  </template>
                    <span class="text-success">${{ $filters.currency(product.final_total) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-4 border-start border-light d-flex flex-column">
        <h3 class="h5">用戶資料</h3>
        <div class="table-responsive">
          <table class="table">
            <tbody v-if="order.user">
              <tr>
                <th scope="row" class="border-0">姓名</th>
                <td class="border-0"> {{ order.user.name }} </td>
              </tr>
              <tr>
                <th scope="row" class="border-0">電話</th>
                <td class="border-0">{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0">地址</th>
                <td class="border-0">{{ order.user.address }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0">Email</th>
                <td class="border-0">{{ order.user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="h5 border-top pt-3">訂單細節</h3>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row" class="border-0">訂單編號</th>
                <td class="border-0">{{ order.id }}</td>
              </tr>
              <tr class="fs-5 fw-bold">
                <th scope="row" class="border-0">總金額</th>
                <td class="border-0">${{ $filters.currency(order.total) }}</td>
              </tr>
              <tr v-if="order.is_paid">
                <th scope="row" class="border-0">付款時間</th>
                <td class="border-0"> {{ new Date(order.paid_date * 1000).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="h5 border-top pt-3">訂單狀態</h3>
        <label for="is_paid" class="form-label d-block mb-5" :class="order.is_paid ? 'text-success' : 'text-muted'">{{ order.is_paid ? '已付款' : '未付款'}}</label>
        <div class="text-center text-lg-end p-3 mt-auto">
          <button v-if="!order.is_paid" type="button" class="btn btn-primary" @click="payOrder">確認後付款</button>
        </div>
      </div>
    </div>
    <div class="text-end py-5" v-if="order.is_paid">
      <router-link to="/orders" class="btn btn-outline-primary me-3">查看歷史訂單</router-link>
      <router-link to="/" class="btn btn-primary">回到首頁</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: '',
      isLoading: false
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    getOrder () {
      this.isLoading = true
      const id = this.$route.params.orderId
      const api = `/api/${process.env.VUE_APP_APIPATH}/order/${id}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得訂單資料')
            this.isLoading = false
            return
          }
          this.order = response.data.order
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    payOrder () {
      const id = this.$route.params.orderId
      const api = `/api/${process.env.VUE_APP_APIPATH}/pay/${id}`
      this.$http.post(api)
        .then(response => {
          if (!response.data.success) return
          this.getOrder()
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    }
  },
  created () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrder()
  }
}
</script>
