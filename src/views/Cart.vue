<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <div class="carts container py-5">
    <div class="row" v-if="carts.carts">
      <div class="col-md-10 mx-auto" v-if="carts.carts.length">
        <ol class="row progress-bar list-unstyled justify-content-between text-center">
          <li class="col-4 active">確認購物車品項</li>
          <li class="col-4">填寫資料</li>
          <li class="col-4">確認訂單並付款</li>
        </ol>
      </div>
    </div>
    <div class="accordion accordion-flush" id="accordionFlushExample" v-if="couponsGot.length">
      <div class="accordion-item">
        <h2 class="accordion-header bg-light" id="flush-headingCoupon">
          <button class="accordion-button collapsed bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseCoupon" aria-expanded="false" aria-controls="flush-collapseCoupon">
            可使用的優惠券
            <span class="ms-1 badge bg-primary">{{ couponsGot.length }}</span>
          </button>
        </h2>
        <div id="flush-collapseCoupon" class="accordion-collapse collapse bg-light border-top" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <ul class="row list-unstyled">
              <li class="col-md-6 col-xl-3" v-for="coupon in couponsGot" :key="coupon">
                <div class="coupon-code fs-4 d-md-flex rounded-3 shadow-sm px-md-2 mb-3 mx-auto">
                  <div class="coupon-name mb-0">
                    <div class="bg-primary text-light fs-6 p-1">
                      商品<br class="d-none d-md-inline-block">
                      <span v-if="coupon === 'firstPrize50'"> 5 折</span>
                      <span v-else-if="coupon === 'secondPrize60'"> 6 折</span>
                      <span v-else-if="coupon === 'thirdPrize70'"> 7 折</span>
                      <span v-else-if="coupon === 'fourthPrize80'"> 8 折</span>
                    </div>
                  </div>
                  <code class="text-center text-primary px-2 mb-0" :ref="coupon">{{ coupon }}</code>
                  <button type="button" class="btn btn-link" title="點擊複製" @click="copyCouponCode(coupon)">
                    <i class="bi bi-clipboard"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="cart justify-content-center py-5">
      <template v-if="carts.carts">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="fs-4 text-primary mb-0">
            <i class="bi bi-cart-fill"></i>
            購物車
          </h1>
          <button type="button" class="btn btn-outline-danger" @click="removeCarts" :disabled="loadingStatus.loadingRemoveCart === 'deleteAll'" v-if="carts.carts.length">
            <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingRemoveCart === 'deleteAll'">
              <span class="visually-hidden">Loading...</span>
            </div>
            <small>
              <i class="bi bi-trash2"></i>
              刪除全部商品
            </small>
          </button>
        </div>
        <small class="text-muted" v-if="carts.carts.length">總計 {{ carts.carts.length }} 項商品</small>
        <div class="bg-light shadow-sm p-3 p-md-5 mt-3 mb-5">
          <div class="table-responsive rounded-1" v-if="carts.carts.length">
            <table class="table table-borderless table-hover">
              <thead class="rounded-3">
                <tr>
                  <th scope="col" width="5%"></th>
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
                        <p class="mb-1">{{ item.product.title }}</p>
                        <small class="text-primary bg-info rounded-pill badge py-1 px-2" v-if="item.coupon">
                          <i class="bi bi-tag-fill"></i>
                          {{ item.coupon.code }}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm justify-content-end">
                      <input type="number" class="form-control border-0 count" v-model.number="item.qty" min="1" @change="updateCart(item.id, item.product_id, item.qty)" :disabled="loadingStatus.updateCart === item.id">
                      <p class="input-group-text border-0 d-none d-md-block mb-0">
                        {{ item.product.unit }}
                      </p>
                    </div>
                  </td>
                  <td class="text-end">
                    <template v-if="item.final_total !== item.total">
                      <del class="text-muted small">{{ $filters.currency(item.total) }}</del>
                      <br>
                    </template>
                    <span :class="{ 'text-primary fw-bold': item.final_total !== item.total }">
                      ${{ $filters.currency(item.final_total) }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-end border-0">運費</td>
                  <td class="text-end border-0">$0</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end">合計</td>
                  <td class="text-end text-nowrap fs-5">NT$ {{ $filters.currency(carts.total) }}</td>
                </tr>
                <tr v-if="carts.final_total !== carts.total" class="text-primary fw-bold">
                  <td colspan="3" class="text-end">折扣後合計</td>
                  <td class="text-end text-nowrap fs-5">NT$ {{ $filters.currency(carts.final_total) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="text-center" v-else>
            <i class="bi bi-cart4 display-1 fw-bold text-primary"></i>
            <p class="bg-light text-primary fs-4 p-3">購物車目前無商品，歡迎選購</p>
            <router-link to="/products" class="btn btn-primary btn-lg mb-5">前往逛逛！</router-link>
          </div>
        </div>
        <div v-if="carts.carts.length" class="d-block d-md-flex justify-content-between align-items-center text-end mb-5">
          <div class="coupon input-group input-group-sm me-5 mb-3 mb-md-0">
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
          <router-link to="/cartinfo" class="btn btn-primary flex-shrink-0">
            前往結帳
            <i class="bi bi-caret-right-fill"></i>
          </router-link>
        </div>
        <h3 class="title text-primary fs-4 mb-2">
          <i class="bi bi-megaphone-fill"></i>
          重要提醒
        </h3>
        <div class="border rounded-3">
          <ul class="card-body mb-0">
            <li>
              付款方式限 <span class="fw-bold">信用卡</span> 付款。
            </li>
            <li>
              大部分商品體積較大，因此不適用超商取貨，只提供 <span class="fw-bold">宅配到府</span>。
            </li>
            <li>
              無庫存商品調貨時間請參考「商品平均調貨時間」。
            </li>
            <li>
              目前無提供海外服務。
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
  <div class="container mb-5" v-if="randomProducts.length">
    <div class="product-also-buy border-info rounded-3 px-3">
      <h3 class="title text-primary fs-4 mb-4">
        <i class="bi bi-star-fill"></i>
        你可能會喜歡...
      </h3>
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
              <h4 class="card-title fs-5 mb-0">
                <a href="#" @click.prevent="getProductInfo(item.id)" class="text-dark d-block stretched-link">
                  {{ item.title }}
                </a>
              </h4>
            </div>
            <p class="fw-bold card-text text-muted">NT$ {{ $filters.currency(item.price) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite'

export default ({
  data () {
    return {
      products: {},
      carts: {},
      pagination: '',
      tempProduct: {},
      loadingStatus: {},
      coupon_code: '',
      isLoading: false,
      randomProducts: [],
      myFavorite: handleFavorite.getFavorite() || [],
      couponsGot: JSON.parse(localStorage.getItem('couponsGot')) || []
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
          this.emitter.emit('update-cart', id)
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
    getProductInfo (productId) {
      this.$router.push(`/product/${productId}`)
      this.getProduct(productId)
      this.saveProductViewed(productId)
    },
    saveProductViewed (productId) {
      const maxLength = 6
      const productsIdViewed = JSON.parse(localStorage.getItem('productsViewed')) || []
      if (productsIdViewed.includes(productId)) {
        productsIdViewed.splice(productsIdViewed.indexOf(productId), 1)
      }
      productsIdViewed.unshift(productId)
      if (productsIdViewed.length > maxLength) {
        productsIdViewed.pop()
      }
      localStorage.setItem('productsViewed', JSON.stringify(productsIdViewed))
    },
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
            this.$httpMessageState(response, '更新購物車')
            this.isLoading = false
            return
          }
          this.getCart()
          this.loadingStatus.updateCart = ''
          this.$httpMessageState(response, '更新購物車')
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
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
    copyCouponCode (couponCode) {
      const str = this.$refs[couponCode]
      window.getSelection().selectAllChildren(str)
      document.execCommand('Copy')
      this.$httpMessageState({
        data: {
          success: true,
          message: `已複製優惠碼： ${couponCode}`
        }
      }, '複製優惠券')
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
            this.$httpMessageState(response, '套用優惠券')
            if (response.data.message === '優惠券無法使用或已過期') {
              let couponsGot = JSON.parse(localStorage.getItem('couponsGot'))
              couponsGot = couponsGot.filter(coupon => coupon !== this.coupon_code)
              localStorage.setItem('couponsGot', JSON.stringify(couponsGot))
              this.couponsGot = JSON.parse(localStorage.getItem('couponsGot'))
            }
            this.coupon_code = ''
            return
          }
          this.getCart()
          this.loadingStatus.loadingCoupon = ''
          this.$httpMessageState(response, '套用優惠券')
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
        const num = this.$filters.randomInt(this.products.length)
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
