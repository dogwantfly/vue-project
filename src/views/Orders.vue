<template>
  訂單管理
  搜尋訂單
  尚未付款的訂單
  <ul class="list-group">
    <li class="list-group-item" v-for="order in unpaidOrders" :key="order.id">
      <router-link :to="`/checkout/${order.id}`">{{ order.id }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      orders: '',
      unpaidOrders: ''
    }
  },
  inject: ['$httpMessageState'],
  methods: {
    getOrders (page = 1) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/orders?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得訂單列表')
            return
          }
          this.orders = response.data.orders
          this.unpaidOrders = this.orders.filter(order => !order.is_paid)
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    }
  },
  created () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getOrders()
  }
}
</script>
