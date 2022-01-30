<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <div class="bg-light">
    <div class="container py-5">
      <div class="row mb-3">
        <div class="col-md-8 mx-auto">
          <ol class="progress-bar row list-unstyled justify-content-between text-center">
            <li class="col-4 done">確認購物車品項</li>
            <li class="col-4 done">填寫資料</li>
            <li class="col-4" :class="order.is_paid ? 'done' : 'active'">確認訂單並付款</li>
          </ol>
        </div>
      </div>
      <div class="col-lg-10 mb-3 mx-auto">
        <p class="text-primary">
          <i class="bi bi-person-check-fill me-2"></i>
          親愛的客戶您好，訂單已建立成功，請在確認資訊後付款
        </p>
        <h1 class="fs-4 text-secondary text-center bg-info py-2">訂單資訊</h1>
      </div>
      <div class="checkout row rounded-3 justify-content-center gy-3 py-3 mt-3">
        <div class="checkout-product col-lg-6 text-primary">
          <div class="h-100 d-flex flex-column">
            <h3 class="h6 bg-primary d-inline-block text-white rounded-top align-self-start px-3 py-2 mb-0">
              商品資訊
            </h3>
            <div class="table-responsive bg-white shadow-sm rounded-bottom border border-info h-100 p-3">
              <table class="table table-borderless mb-0" v-if="order.products">
                <tbody>
                  <tr v-for="product in order.products" :key="product.id">
                    <td>
                      <img :src="product.product.imageUrl" :alt="product.product.title" class="img-fluid img-size d-block object-fit-cover">
                    </td>
                    <td>
                      {{ product.product.title }}
                    </td>
                    <td>
                      x {{ product.qty }}
                    </td>
                    <td class="text-end">
                      <template v-if="product.final_total !== product.total">
                        <del class="small text-muted">${{ $filters.currency(product.total) }}</del>
                        <br>
                        <small class="text-primary me-1">折扣價</small>
                      </template>
                      <span class="text-primary fw-bold">${{ $filters.currency(product.final_total) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-4 border-start border-light d-flex flex-column">
          <h3 class="h6 bg-primary d-inline-block text-white rounded-top align-self-start px-3 py-2 mb-0">訂購人資料</h3>
          <div class="table-responsive bg-white shadow-sm rounded-bottom border border-info p-3 mb-4">
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
          <h3 class="h6 bg-primary d-inline-block text-white rounded-top align-self-start px-3 py-2 mb-0">訂單細節</h3>
          <div class="table-responsive bg-white shadow-sm rounded-bottom border border-info p-3">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 align-middle">訂單編號</th>
                  <td class="border-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <code class="text-dark mb-0" :ref="order.id">{{ order.id }}</code>
                      <button type="button" class="btn btn-link p-0" title="點擊複製" @click="copyOrderId(order.id)">
                        <i class="bi bi-clipboard"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="border-0">訂單日期</th>
                  <td class="border-0">
                    <time class="text-secondary">
                      {{ new Date(order.create_at * 1000).toLocaleString() }}
                    </time>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="border-0">訂單狀態</th>
                  <td class="border-0">
                    <label for="is_paid" class="form-label d-inline-block w-auto rounded p-1" :class="order.is_paid ? 'text-primary bg-info' : 'text-muted'">
                      <i class="bi bi-check" v-if="order.is_paid"></i>
                      {{ order.is_paid ? '已付款' : '未付款' }}
                    </label>
                  </td>
                </tr>
                <tr v-if="order.is_paid">
                  <th scope="row" class="border-0">付款時間</th>
                  <td class="border-0"> {{ new Date(order.paid_date * 1000).toLocaleString() }}</td>
                </tr>
                <tr class="fs-5 fw-bold">
                  <th scope="row" class="border-0">總金額</th>
                  <td class="border-0">${{ $filters.currency(order.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-10 text-center text-lg-end py-3 mx-auto" v-if="!order.is_paid">
        <button type="button" class="btn btn-primary" @click="payOrder">
          確認並付款
          <i class="bi bi-check-lg ms-2"></i>
        </button>
      </div>
      <div class="text-end col-lg-10 py-2 mx-auto" v-else-if="order.is_paid">
        <router-link to="/orders" class="btn btn-outline-primary me-3">查看歷史訂單</router-link>
        <router-link to="/" class="btn btn-primary">回到首頁</router-link>
      </div>
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
  inject: ['$httpMessageState'],
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
          if (!response.data.success) {
            this.$httpMessageState('付款失敗，請再試一次', '付款')
            this.isLoading = false
            return
          }
          this.$router.push({ path: `/checkoutsuccess/${id}` })
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    copyOrderId (orderId) {
      const str = this.$refs[orderId]
      window.getSelection().selectAllChildren(str)
      document.execCommand('Copy')
      this.$httpMessageState({
        data: {
          success: true,
          message: `已複製訂單編號： ${orderId}`
        }
      }, '複製訂單編號')
    }
  },
  created () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrder()
  }
}
</script>
