<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="container pt-5">
    <ul class="row pt-5">
      <li class="card col-lg-3 border-0" v-for="item in products" v-bind:key="item.id">
        <button type="button" @click="toggleFavorite(item)" class="btn text-danger">
          <i class="bi" :class="myFavorite.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
        </button>
        <img :src="item.imageUrl" :alt="item.title" class="cart-img card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <del>原價 {{ $filters.currency(item.origin_price) }} 元</del>
          <br>
          <p class="fw-bold card-text">現在只要 {{ $filters.currency(item.price) }} 元</p>
          <div class="btn-group w-100" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary" v-on:click="getProductInfo(item.id)">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingItem === item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              查看更多
            </button>
            <button type="button" class="btn btn-primary" v-on:click="addCart(item.id, 1)" :disabled="loadingStatus.loadingCart === item.id">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCart === item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              加到購物車
            </button>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分頁 -->
    <Pagination :pagination="pagination" @change-page="getProducts"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import handleFavorite from '@/methods/handleFavorite'

export default ({
  data () {
    return {
      products: {},
      pagination: '',
      tempProduct: {},
      loadingStatus: {},
      myFavorite: handleFavorite.getFavorite() || [],
      isLoading: false
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  components: {
    Pagination
  },
  methods: {
    // 取得商品列表
    getProducts (page = 1) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/products?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得產品資料')
            this.isLoading = false
            return
          }
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    // 商品細節
    getProductInfo (productId) {
      this.$router.push(`/product/${productId}`)
    },
    // 加入購物車
    addCart (id, qty = 1) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`
      const data = {
        product_id: id,
        qty
      }
      this.loadingStatus.loadingCart = id
      this.$http.post(api, { data })
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            return
          }
          this.emitter.emit('update-cart')
          this.loadingStatus.loadingCart = ''
        })
        .catch(error => {
          this.loadingStatus.loadingCart = ''
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    toggleFavorite (item) {
      if (this.myFavorite.includes(item.id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1)
        this.$httpMessageState({
          data: {
            success: true,
            message: `已將 ${item.title} 移除收藏`
          }
        }, '移除收藏')
      } else {
        this.myFavorite.push(item.id)
        this.$httpMessageState({
          data: {
            success: true,
            message: `已將${item.title}加入收藏`
          }
        }, '加入收藏')
      }
      handleFavorite.storeFavorite(this.myFavorite)
      this.emitter.emit('update-favorite')
    },
    updateFavorite () {
      this.myFavorite = handleFavorite.getFavorite()
      this.getProducts()
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getProducts()
    this.emitter.on('update-favorite', this.updateFavorite)
  },
  unmounted () {
    this.emitter.off('update-favorite', this.updateFavorite)
  }
})
</script>

<style scoped>
.cart-img{
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.table.products{
  margin-top: 80px;
}
</style>
