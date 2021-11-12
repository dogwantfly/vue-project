<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="banner">
    <div class="container h-100 d-flex align-items-center justify-content-center">
      <h1>
        找到想要的樂器或配件 ——
      </h1>
    </div>
  </div>
  <div class="container pb-5">
    <div class="row pt-5">
      <div class="col-lg-3">
        <ul class="list-group sticky-top sticky-position">
          <li>
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="selectedCategory = ''" :class="{ active : selectedCategory === '' }">全部</a>
          </li>
          <li v-for="item in categories" :key="item">
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="selectedCategory = item" :class="{ active : selectedCategory === item }">
            {{ item }}
            </a>
          </li>
        </ul>
      </div>
      <div class="col-lg-9">
        <ul class="row">
          <li class="card col-md-6 col-lg-3 border-0 mb-4" v-for="item in filterProducts" :key="item.id">
            <div class="overflow-hidden position-relative">
              <button type="button" @click.stop="toggleFavorite(item)" class="btn btn-favorite position-absolute">
                <i class="bi" :class="myFavorite.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
              </button>
              <div class="ratio ratio-3x4">
                <img :src="item.imageUrl" :alt="item.title" class="cart-img card-img-top">
              </div>
              <div class="btn-group position-absolute">
                <button type="button" class="btn btn-primary btn-cart" @click.stop="addCart(item.id, 1)" :disabled="loadingStatus.loadingCart === item.id">
                  <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCart === item.id">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加到購物車
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h2 class="card-title mb-3 fs-5">
                  <router-link :to="`/product/${item.id}`" class="text-dark d-block stretched-link" >
                    {{ item.title }}
                  </router-link>
                </h2>
              </div>
              <del class="text-muted">NT$ {{ $filters.currency(item.origin_price) }} </del>
              <p class="fw-bold card-text">NT$ {{ $filters.currency(item.price) }} </p>
            </div>
          </li>
        </ul>
        <Pagination :pagination="pagination" @change-page="getAllProducts"/>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import handleFavorite from '@/methods/handleFavorite'

export default ({
  data () {
    return {
      products: [],
      pagination: '',
      tempProduct: {},
      loadingStatus: {},
      myFavorite: handleFavorite.getFavorite() || [],
      isLoading: false,
      categories: [],
      selectedCategory: ''
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  components: {
    Pagination
  },
  methods: {
    getAllProducts (page = 1) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/products/all`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得全部產品資料')
            this.isLoading = false
            return
          }
          this.products = response.data.products
          this.getCategories()
          const { selectedCategory } = this.$route.params
          if (selectedCategory) {
            this.selectedCategory = selectedCategory
          }
          if (this.selectedCategory !== '') {
            this.pagination = {}
          } else {
            this.setPagination(page)
          }
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getCategories () {
      const categories = new Set()
      this.products.forEach(product => {
        categories.add(product.category)
      })
      this.categories = [...categories]
    },
    setPagination (page = 1) {
      const perPage = 12
      this.pagination = {
        total_pages: Math.ceil(this.products.length / perPage),
        current_page: page,
        has_pre: page !== 1,
        has_next: false,
        category: null
      }
      if (this.pagination.current_page >= this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages
        this.pagination.has_next = false
      } else {
        this.pagination.has_next = true
      }
      const minPage = (this.pagination.current_page * perPage) - perPage
      const maxPage = (this.pagination.current_page * perPage)
      this.products = this.products.slice(minPage, maxPage)
    },
    getProductInfo (productId) {
      this.$router.push(`/product/${productId}`)
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
      this.getAllProducts()
    }
  },
  watch: {
    selectedCategory (newValue, preValue) {
      if (newValue === '' || preValue === '') {
        this.getAllProducts()
      }
    }
  },
  computed: {
    filterProducts () {
      return this.products.filter(product => product.category.match(this.selectedCategory))
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getAllProducts()
    this.emitter.on('update-favorite', this.updateFavorite)
  },
  unmounted () {
    this.emitter.off('update-favorite', this.updateFavorite)
  }
})
</script>
