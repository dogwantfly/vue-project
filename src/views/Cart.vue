<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <div class="banner">
    <div class="container h-100 d-flex align-items-center justify-content-center">
      <h1>
        購物車
      </h1>
    </div>
  </div>
  <div class="carts container py-5">
    <div class="row"  v-if="carts.carts">
      <div class="col-md-10 mx-auto" v-if="carts.carts.length">
        <ol class="progress-bar row list-unstyled justify-content-between text-center">
          <li class="col-4 active">確認購物車品項</li>
          <li class="col-4">填寫資料</li>
          <li class="col-4">確認訂單並付款</li>
        </ol>
      </div>
    </div>
    <div class="justify-content-center cart py-5">
      <div v-if="carts.carts">
        <button type="button" class="btn btn-outline-danger" @click="removeCarts" :disabled="loadingStatus.loadingRemoveCart === 'deleteAll'" v-if="carts.carts.length">
          <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingRemoveCart === 'deleteAll'">
            <span class="visually-hidden">Loading...</span>
          </div>
          <small>
            <i class="bi bi-trash2"></i>
            刪除全部商品
          </small>
        </button>
        <div class="table-responsive bg-light p-md-5 my-5 rounded-1" v-if="carts.carts.length">
          <table class="table table-borderless table-hover">
            <thead class="rounded-3">
              <tr>
                <th scope="col"></th>
                <th scope="col" width="40%">品項</th>
                <th scope="col" class="text-end">數量</th>
                <th scope="col" class="text-end">價錢</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger border-0 rounded-circle" @click="removeCartItem(item.id)" :disabled="loadingStatus.loadingRemoveCart === item.id">
                    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingRemoveCart === item.id">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
                <td>
                  <div class="d-flex">
                    <img :src="item.product.imageUrl" :alt="item.product.title" class="img-fluid img-size me-3 d-none d-sm-block">
                    <div>
                      {{ item.product.title }}
                      <br>
                      <small class="text-success" v-if="item.coupon">
                        優惠券: {{ item.coupon.code }}
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm justify-content-end">
                    <input type="number" class="form-control border-0 count" v-model.number="item.qty" min="1" @change="updateCart(item.id, item.product_id, item.qty)" :disabled="loadingStatus.updateCart === item.id">
                    <div class="input-group-text border-0 d-none d-md-block">{{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-end">
                  <template v-if="item.final_total !== item.total">
                    <del class="text-muted small">{{ $filters.currency(item.total) }}</del>
                    <br>
                  </template>
                  <span :class="{ 'text-success': item.final_total !== item.total }">
                   {{ $filters.currency(item.final_total) }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end border-0">運費</td>
                <td class="text-end border-0">0</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end">合計</td>
                <td class="text-end text-nowrap">NT$ {{ $filters.currency(carts.total) }}</td>
              </tr>
              <tr v-if="carts.final_total !== carts.total" class="text-success">
                <td colspan="3" class="text-end">折扣後合計</td>
                <td class="text-end text-nowrap">NT$ {{ $filters.currency(carts.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="text-center" v-else>
          <p class="p-3 bg-light">購物車無商品，敬請前往購物</p>
          <router-link to="/products" class="btn btn-primary mb-5">前往購物</router-link>
        </div>
      </div>
      <template v-if="carts.carts">
        <div v-if="carts.carts.length" class="d-block d-md-flex justify-content-between align-items-center">
          <div class="input-group me-5 input-group-sm mb-3 mb-md-0 coupon">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="useCoupon" :disabled="!coupon_code">
                <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCoupon === coupon_code && coupon_code !== ''">
                  <span class="visually-hidden">Loading...</span>
                </div>
                套用優惠碼
              </button>
            </div>
          </div>
          <router-link to="/cartinfo" class="btn btn-outline-secondary flex-shrink-0">
            前往結帳
            <i class="bi bi-caret-right-fill"></i>
          </router-link>
        </div>
      </template>
    </div>
  </div>
  <div class="product-also-buy container mb-5" v-if="randomProducts.length">
    <h3 class="title mb-4">你可能會喜歡...</h3>
    <ul class="row">
      <li class="card col-md-4 col-lg-3 col-xl-2 border-0" v-for="item in randomProducts" :key="item.id">
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
            <h4 class="card-title mb-0 fs-5">
              <a href="#" @click.prevent="getProductInfo(item.id)" class="text-dark d-block stretched-link" >
                {{ item.title }}
              </a>
            </h4>
          </div>
          <p class="fw-bold card-text text-muted">NT$ {{ $filters.currency(item.price) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite'

function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

export default ({
  data () {
    return {
      user: {
        email: '',
        tel: '',
        name: '',
        region: '',
        address: '',
        payment: ''
      },
      message: '',
      products: {},
      carts: {},
      pagination: '',
      tempProduct: {},
      loadingStatus: {},
      coupon_code: '',
      isLoading: false,
      randomProducts: [],
      myFavorite: handleFavorite.getFavorite() || []
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
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
          this.getCart()
          this.loadingStatus.loadingCart = ''
          this.$httpMessageState(response, '加入購物車')
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getCart () {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得購物車列表')
            this.isLoading = false
            return
          }
          this.carts = response.data.data
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    updateCart (cartId, productId, qty) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart/${cartId}`
      const data = {
        product_id: productId,
        qty
      }
      this.loadingStatus.updateCart = cartId
      this.$http.put(api, { data })
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            this.isLoading = false
            return
          }
          this.getCart()
          this.loadingStatus.updateCart = ''
          this.isLoading = false
          this.$httpMessageState(response, '更新購物車')
        })
        .catch(error => {
          this.isLoading = false
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    removeCartItem (id) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart/${id}`
      this.loadingStatus.loadingRemoveCart = id
      this.$http.delete(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '移除購物車')
            return
          }
          this.getCart()
          this.emitter.emit('update-cart', id)
          this.loadingStatus.loadingRemoveCart = ''
          this.$httpMessageState(response, '移除購物車')
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    removeCarts () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/carts`
      this.loadingStatus.loadingRemoveCart = 'deleteAll'
      this.$http.delete(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '移除購物車')
            return
          }
          this.getCart()
          this.emitter.emit('update-cart')
          this.loadingStatus.loadingRemoveCart = ''
          this.$httpMessageState(response, '移除購物車')
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    useCoupon () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/coupon`
      const data = {
        code: this.coupon_code
      }
      this.loadingStatus.loadingCoupon = this.coupon_code
      this.$http.post(api, { data })
        .then(response => {
          if (!response.data.success) {
            this.loadingStatus.loadingCoupon = ''
            this.coupon_code = ''
            this.$httpMessageState(response, '套用優惠券')
            return
          }
          this.getCart()
          this.loadingStatus.loadingCoupon = ''
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    createOrder (values, { resetForm }) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/order`
      const data = {
        user: this.user,
        message: this.message
      }
      if (!this.carts.carts.length) {
        this.$httpMessageState({
          data: {
            success: false,
            message: '購物車無內容'
          }
        }, '建立訂單')
        return
      }
      this.$http.post(api, { data })
        .then(response => {
          if (response.data.success) {
            this.user = {
              email: '',
              tel: '',
              name: '',
              region: '',
              address: '',
              payment: ''
            }
            this.message = ''
            resetForm()
            this.getCart()
            this.$httpMessageState(response, '建立訂單')
            const { orderId } = response.data
            this.emitter.emit('update-cart')
            this.$router.push(`/checkout/${orderId}`)
          } else {
            this.$httpMessageState(response, '建立訂單')
          }
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
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
      const arrSet = new Set([])
      const maxSize = this.products.length < 4 ? this.products.length : 4
      for (let i = 0; arrSet.size < maxSize; i += 1) {
        const num = getRandomInt(this.products.length)
        arrSet.add(this.products[num])
      }
      this.randomProducts = []
      arrSet.forEach(product => {
        this.randomProducts.push(product)
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
            message: `已將 ${item.title} 加入收藏`
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
    this.getCart()
    this.getAllProducts()
  }
})
</script>
