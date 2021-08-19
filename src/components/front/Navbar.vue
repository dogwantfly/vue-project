<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-bg" :key="$route.path">
    <div class="container">
      <router-link to="/" class="navbar-brand nav-link-color">前台</router-link>
      <div class="d-flex order-lg-last">
        <ul class="navbar-nav fs-3 flex-row">
          <li class="nav-item me-2 position-relative">
            <span class="badge rounded-pill bg-danger position-absolute" v-if="carts.carts">
              {{ carts.carts.length ? carts.carts.length : ''}}
            </span>
            <router-link to="/cart" class="nav-link nav-link-color">
              <i class="bi bi-cart-fill"></i>
            </router-link>
          </li>
          <li class="nav-item position-relative">
            <span class="badge rounded-pill bg-danger position-absolute" v-if="myFavorite.length">
              {{ myFavorite.length ? myFavorite.length : ''}}
            </span>
            <a href="#" class="nav-link nav-link-color" id="dropdownMenuFavorite" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-heart"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuFavorite" ref="dropdown">
              <li class="card border-0 px-2" v-for="product in products" :key="product.id">
                <router-link class="row g-0 align-items-center" :to="`/product/${product.id}`">
                  <div class="col-md-3">
                    <img :src="product.imageUrl" :alt="product.title" style="width:70px; height: 70px">
                  </div>
                  <div class="col-md-9 d-flex align-items-center">
                    <div class="card-body">
                      <h5 class="card-title">{{ product.title }}</h5>
                      <del class="card-text"><small class="text-muted">原價： {{ $filters.currency(product.origin_price) }} 元</small></del>
                      <p class="card-text">優惠價： {{ $filters.currency(product.price) }} 元</p>
                    </div>
                    <button type="button" class="btn remove-btn" @click.stop.prevent="removeFavorite(product)">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </router-link>
              </li>
              <li v-if="!products.length">
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
            <router-link to="/products" class="nav-link nav-link-color">前台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blogs" class="nav-link nav-link-color">Blog</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" class="nav-link nav-link-color">查看訂單狀態</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link nav-link-color">關於我們</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login" class="nav-link nav-link-color">後台登入</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link nav-link-color">後台首頁</router-link>
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

<style scoped lang="scss">
  .navbar-bg {
    background-color: #eedb7e90;
  }
  .nav-link-color {
    color: #383837;
    &:hover {
      background-color: #f6f1e63d;
      font-weight: bold;
      border-radius: 50px;
    }
  }
  .navbar-bg .nav-link.active {
    background-color: #f6f1e63d;
    font-weight: bold;
    border-radius: 50px;
  }
  .nav-item .rounded-pill {
    top: 5px;
    right: -2px;
    font-size: 12px;
  }
  .dropdown-menu {
    min-width: 320px;
    .card {
      &:hover {
        background-color: #f8f9fa;
      }
    }
    .remove-btn {
      color: #dc3545;
      &:hover {
        color: #871f2a;
      }
    }
  }
</style>
