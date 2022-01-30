<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" :key="$route.path">
    <div class="container position-relative">
      <router-link to="/" class="navbar-brand nav-link-color">CHORD</router-link>
      <div class="d-flex order-lg-last">
        <ul class="navbar-nav fs-3 flex-row">
          <li class="nav-item me-3 me-lg-2 position-relative">
            <span class="badge rounded-pill bg-danger position-absolute" v-if="carts.carts">
              {{ carts.carts.length ? carts.carts.length : '' }}
            </span>
            <router-link to="/cart" class="nav-link nav-link-color">
              <i class="bi bi-cart-fill"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link nav-link-color position-relative" id="dropdownMenuFavorite" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="badge rounded-pill bg-danger position-absolute" v-if="myFavorite.length">
              {{ myFavorite.length ? myFavorite.length : '' }}
              </span>
              <i class="bi bi-heart"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuFavorite" ref="dropdown">
              <li class="card border-0 px-2" v-for="product in products" :key="product.id">
                <router-link class="d-flex w-100 flex-nowrap align-items-center justify-content-between" :to="`/product/${product.id}`">
                  <img :src="product.imageUrl" :alt="product.title" class="img-fluid collection-img object-fit-cover">
                  <div class="card-body">
                    <h5 class="card-title h6">{{ product.title }}</h5>
                    <p class="card-text d-inline-block me-2 fw-bold">${{ $filters.currency(product.price) }}</p>
                    <del class="card-text text-muted small">${{ $filters.currency(product.origin_price) }} </del>
                    <button type="button" class="btn badge bg-info remove-btn position-absolute end-0 bottom-0 mb-2 me-2" @click.stop.prevent="removeFavorite(product)">
                      <i class="bi bi-x"></i>
                      移除
                    </button>
                  </div>
                </router-link>
              </li>
              <li v-if="!products.length" class="text-center p-3">
                <p>目前無收藏商品</p>
                <router-link to="/products" class="btn btn-primary">前往瀏覽商品</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <button class="navbar-dark navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/products" class="nav-link nav-link-color">樂器</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blogs" class="nav-link nav-link-color">部落格</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link nav-link-color">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" class="nav-link nav-link-color">訂單狀態</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite'

export default {
  data () {
    return {
      carts: {},
      myFavorite: handleFavorite.getFavorite() || [],
      products: '',
      isLoading: false
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    getCart () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得購物車列表')
            return
          }
          this.carts = response.data.data
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getFavorite () {
      this.myFavorite = handleFavorite.getFavorite()
      this.getAllProducts()
    },
    getAllProducts () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/products/all`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得全部產品資料')
            return
          }
          this.products = response.data.products.filter(product => this.myFavorite.includes(product.id))
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    removeFavorite (item) {
      this.isLoading = true
      this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1)
      this.$httpMessageState({
        data: {
          success: true,
          message: `已將 ${item.title} 移除收藏`
        }
      }, '移除收藏')
      handleFavorite.storeFavorite(this.myFavorite)
      this.emitter.emit('update-favorite')
      this.isLoading = false
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.emitter.on('update-cart', this.getCart)
    this.emitter.on('update-favorite', this.getFavorite)
    this.getCart()
    this.getAllProducts()
  },
  unmounted () {
    this.emitter.off('update-cart', this.getCart)
    this.emitter.off('update-favorite', this.getFavorite)
  }
}
</script>
