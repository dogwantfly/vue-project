<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="container pt-5">
    <div class="row pt-3">
      <div class="col-lg-7">
        <img :src="product.imageUrl" :alt="product.title">
      </div>
      <div class="col-lg-5">
        <div class="d-flex align-items-center">
          <h1 class="mb-0">{{ product.title }}</h1>
          <button type="button" @click="toggleFavorite(product)" class="btn text-danger">
            <i class="bi" :class="myFavorite.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
          </button>
          <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
        </div>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6">原價 {{ product.origin_price }} 元</del>
        <div class="h5">現在只要 {{ product.price }} 元</div>
        <div>
          <div class="input-group">
            <input type="number" class="form-control"
                  v-model.number="qty" min="1">
            <button type="button" class="btn btn-primary" @click="addCart(product.id)">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCart === product.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite'

export default {
  data () {
    return {
      product: '',
      qty: 1,
      loadingStatus: {},
      myFavorite: handleFavorite.getFavorite() || [],
      isLoading: false
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    getProduct () {
      this.isLoading = true
      const id = this.$route.params.productId
      const api = `/api/${process.env.VUE_APP_APIPATH}/product/${id}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.isLoading = false
            this.$httpMessageState(response, '取得產品資料')
            return
          }
          this.product = response.data.product
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
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
            this.$httpMessageState(response, '加入購物車')
            return
          }
          this.emitter.emit('update-cart', id)
          this.loadingStatus.loadingCart = ''
          this.qty = 1
          this.$httpMessageState(response, '加入購物車')
        })
        .catch(error => {
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
      this.getProduct()
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getProduct()
    this.emitter.on('update-favorite', this.updateFavorite)
  },
  unmounted () {
    this.emitter.off('update-favorite', this.updateFavorite)
  }
}
</script>
