<template>
  <h2>訂單編號: {{ order.id }}</h2>
  <div class="row">
    <div class="col-sm-4">
      <h3>用戶資料</h3>
      <table class="table">
        <tbody v-if="order.user">
          <tr>
            <th scope="row">姓名</th>
            <td> {{ order.user.name }} </td>
          </tr>
          <tr>
            <th scope="row">電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th scope="row">地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-sm-8">
      <h3>訂單細節</h3>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">訂單日期</th>
            <td> {{ new Date(order.create_at * 1000).toLocaleString() }} </td>
          </tr>
          <tr>
            <th scope="row">訂單編號</th>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <th scope="row">總金額</th>
            <td>$ {{ order.total }}</td>
          </tr>
          <tr v-if="order.is_paid">
            <th scope="row">付款時間</th>
            <td> {{ order.paid_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-sm-8">
      <h3>訂單品項</h3>
      <table class="table" v-if="order.products">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">價錢</th>
            <th scope="col">總價</th>
          </tr>
        </thead>
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
              {{ product.product.price }}
            </td>
            <td>
              <template v-if="product.final_total !== product.total">
                <del>{{ product.total }}</del>
                <br>
                <small class="text-success">折扣價：</small>
              </template>
                {{ product.final_total }}
            </td>
          </tr>
        </tbody>
      </table>
      <h3>付款狀態</h3>
      <label for="is_paid" class="form-label me-3" :class="order.is_paid ? 'text-success' : 'text-muted'">{{ order.is_paid ? '已付款' : '未付款'}}</label>
      <button v-if="!order.is_paid" type="button" class="btn btn-primary" @click="payOrder">確認後付款</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: ''
    }
  },
  inject: ['$httpMessageState'],
  methods: {
    getOrder () {
      const id = this.$route.params.orderId
      const api = `/api/${process.env.VUE_APP_APIPATH}/order/${id}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.order = response.data.order
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
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
    console.log(this.$route.params)
    console.log(this.$route.params.orderId)
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrder()
  }
}
</script>

<style scoped>
  .img-size {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
</style>
