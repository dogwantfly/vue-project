<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="container pt-5">
    <div class="row pt-5">
      <div class="col-lg-6">
        <Swiper :style="{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}" :loop="false" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" class="mySwiper2">
          <SwiperSlide>
            <img :src="product.imageUrl" :alt="product.title" class="img-fluid">
          </SwiperSlide>
          <SwiperSlide v-for="(image , key) in product.imagesUrl" :key="image">
            <img :src="image" :alt="`${product.title} ${key}`" class="img-fluid">
          </SwiperSlide>
        </Swiper>
        <Swiper @swiper="setThumbsSwiper" :loop="false" :spaceBetween="10" :slidesPerView="4"  :watchSlidesVisibility="true" :watchSlidesProgress="true" class="mySwiper">
          <SwiperSlide>
            <img :src="product.imageUrl" :alt="product.title" class="img-fluid">
          </SwiperSlide>
          <SwiperSlide v-for="(image , key) in product.imagesUrl" :key="image">
            <img :src="image" :alt="`${product.title} ${key}`"  class="img-fluid">
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="col-lg-6">
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
      <div class="col" v-if="randomProducts.length">
        <h3>買了此商品的人也買了...</h3>
        <ul class="row">
          <li class="card col-lg-3 border-0 mb-4" v-for="item in randomProducts" :key="item.id">
            <img :src="item.imageUrl" :alt="item.title" class="cart-img card-img-top">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title mb-0">
                  <a href="#" @click.prevent="getProductInfo(item.id)" class="text-dark d-block stretched-link" >
                    {{ item.title }}
                  </a>
                </h4>
                <button type="button" @click.stop="toggleFavorite(item)" class="btn btn-favorite">
                  <i class="bi" :class="myFavorite.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                </button>
              </div>
              <p class="fw-bold card-text">優惠價： {{ $filters.currency(item.price) }} 元</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'
import SwiperCore, { Navigation, Thumbs } from 'swiper/core'

SwiperCore.use([Navigation, Thumbs])

function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

export default {
  data () {
    return {
      product: '',
      qty: 1,
      loadingStatus: {},
      myFavorite: handleFavorite.getFavorite() || [],
      isLoading: false,
      thumbsSwiper: null,
      randomProducts: [],
      productsViewed: []
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getProduct (productId) {
      this.isLoading = true
      const id = productId || this.$route.params.productId
      const api = `/api/${process.env.VUE_APP_APIPATH}/product/${id}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.isLoading = false
            this.$httpMessageState(response, '取得產品資料')
            return
          }
          this.product = response.data.product
          this.getAllProducts()
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getAllProducts () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/products/all`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得全部產品資料')
            this.isLoading = false
            return
          }
          this.products = response.data.products
          this.getRandomProducts()
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getRandomProducts () {
      const { category, id } = this.product
      const filterProducts = this.products.filter(product => product.category === category && product.id !== id)
      const arrSet = new Set([])
      const maxSize = filterProducts.length < 4 ? filterProducts.length : 4
      for (let i = 0; arrSet.size < maxSize; i += 1) {
        const num = getRandomInt(filterProducts.length)
        arrSet.add(filterProducts[num])
      }
      this.randomProducts = []
      arrSet.forEach(product => {
        this.randomProducts.push(product)
      })
    },
    getProductInfo (productId) {
      this.$router.push(`/product/${productId}`)
      this.getProduct(productId)
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
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getProduct()
    this.emitter.on('update-favorite', this.updateFavorite)
    // console.log(this.$route)
    // const date = new Date()
    // date.setDate(date.getDate() + 7)
    // document.cookie = `productViewed=${this.productsViewed}; expires=${date}`
  },
  unmounted () {
    this.emitter.off('update-favorite', this.updateFavorite)
  }
}
</script>

<style lang="scss" scoped>
  .mySwiper {
    height: 20%;
    background-color: rgb(226, 225, 225);
  }
  .mySwiper2 {
    height: 300px;
    margin-bottom: 20px;
    background-color: rgb(184, 184, 184);
  }
  .cart-img{
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .table.products{
    margin-top: 80px;
  }
  .btn-favorite {
    font-size: 18px;
    color: #dc3545;
    z-index: 10;
  }
  .btn-favorite:hover {
    color: #9e2632;
  }
</style>
