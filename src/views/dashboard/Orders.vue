<template>
  <h1>訂單頁面</h1>
  <table class="table">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">聯絡人 / 電話</th>
          <th scope="col">電子郵件</th>
          <th scope="col">訂單品項</th>
          <th scope="col">訂單日期</th>
          <th scope="col">應付金額</th>
          <th scope="col">訂單狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" v-bind:key="item.id">
          <td scope="row">{{ item.id }}</td>
          <td>
            {{item.user.name}} <br>
            {{item.user.tel}}
          </td>
          <td>{{item.user.email}}</td>
          <td>
            <template v-for="(item , key) in item.products" :key="key">
            <p>
              {{item.product.title}} * {{item.qty}}
            </p>
            </template>
          </td>
          <td>
            {{ item.total }}
          </td>
          <td>
            {{ new Date(item.create_at*1000).toLocaleString()}}
          </td>
          <td v-bind:class="{ 'text-success': item.is_paid}">{{item.is_paid ? "已付款" : "未付款" }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-warning" v-on:click="openModal('edit',item)">檢視</button>
              <button type="button" class="btn btn-danger" v-on:click="openModal('delete',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
      current_page: 1
    }
  },
  methods: {
    // 取得訂單列表
    getOrders (page = this.current_page) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.orders = response.data.orders
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
        })
        .catch(error => {
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
