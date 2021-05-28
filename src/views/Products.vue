<template>
  <!-- 商品列表 -->
  <table class="table products">
    <thead>
      <tr>
        <th scope="col">圖片</th>
        <th scope="col">商品名稱</th>
        <th scope="col">價格</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in products" v-bind:key="item.id">
        <td scope="row">
          <img :src="item.imgUrl" :alt="item.title" class="cart-img">
        </td>
        <td>{{item.title}}</td>
        <td>
          <del>原價 {{ item.origin_price }} 元</del>
          <br>
          <span class="fw-bold">現在只要 {{item.price}} 元</span>
        </td>
        <td class="text-end">
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-outline-secondary" v-on:click="getProductInfo(item)">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingItem === item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-primary" v-on:click="addCart(item.id, 1, $event)">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCart === item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 分頁 -->
  <pagination :pagination="pagination" @change-page="getProduct"></pagination>
  <!-- userProductModal -->
  <userProductModal :temp-product="tempProduct" ref="userProductModal" @add-cart="addCart"></userProductModal>
</template>
<style scoped>
.cart-img{
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.modal-img {
  height: 500px;
  object-fit: cover;
}
.table.products{
  margin-top: 80px;
}
</style>
<script>
import pagination from '@/components/Pagination.vue'
import userProductModal from '@/components/UserProductModal.vue'
export default ({
  data () {
    return {
      products: {},
      pagination: '',
      tempProduct: {},
      loadingStatus: {}
    }
  },
  components: {
    pagination,
    userProductModal
  },
  methods: {
    // 取得商品列表
    getProduct (page = 1) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/products?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.products = response.data.products
          this.pagination = response.data.pagination
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 商品細節
    getProductInfo (item) {
      this.tempProduct = { ...item }
      const id = this.tempProduct.id
      const api = `/api/${process.env.VUE_APP_APIPATH}/product/${id}`
      this.loadingStatus.loadingItem = id
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            return
          }
          this.loadingStatus.loadingItem = ''
          this.$refs.userProductModal.openModal()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 加入購物車
    addCart (id, qty = 1, e) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`
      let data = {
        product_id: id,
        qty
      }
      if (e.target.dataset.action === 'changeQty') {
        const newQty = e.target.value - qty
        data = {
          product_id: id,
          qty: newQty
        }
      }
      if (e.target.nodeName === 'BUTTON') {
        this.loadingStatus.loadingCart = id
      }
      this.$refs.userProductModal.hideModal()
      this.$http.post(api, { data })
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            return
          }
          // this.getCart();
          this.loadingStatus.loadingCart = ''
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getProduct()
  }
})
</script>
