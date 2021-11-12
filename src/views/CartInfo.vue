<template>
  <Loading :active="isLoading"/>
  <div class="banner">
    <div class="container h-100 d-flex align-items-center justify-content-center">
      <h1>
        填寫資料
      </h1>
    </div>
  </div>
  <div class="container pt-5">
    <div class="row mb-5">
      <div class="col-md-10 mx-auto">
        <ol class="progress-bar row list-unstyled justify-content-between text-center">
          <li class="col-4 done">確認購物車品項</li>
          <li class="col-4 active">填寫資料</li>
          <li class="col-4">確認訂單並付款</li>
        </ol>
      </div>
    </div>
    <div class="row mb-5 pb-5">
      <div class="col-md-8 mx-auto bg-light rounded-3 py-5 p-md-5">
        <Form @submit="createOrder" v-slot="{ errors }">
          <div class="mb-3">
            <label for="email" class="form-label">
              Email
              <span class="text-danger">*</span>
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="請輸入 Email"
              v-model="user.email"
              rules="email|required"
              :class="{ 'is-invalid': errors['email'] , 'is-valid': !errors['email'] && user.email!== ''}"
            />
            <ErrorMessage
              name="email"
              class="invalid-feedback"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">
              姓名
              <span class="text-danger">*</span>
            </label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              placeholder="請輸入姓名"
              rules="required"
              :class="{ 'is-invalid': errors['姓名'] , 'is-valid': user.name!== '' && !errors['姓名']}"
              v-model="user.name"
            />
            <ErrorMessage
              class="invalid-feedback"
              name="姓名"
            />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">
              電話
              <span class="text-danger">*</span>
            </label>
            <Field
              id="tel"
              name="電話"
              type="tel"
              v-model="user.tel"
              class="form-control"
              placeholder="請輸入電話"
              rules="required|numeric|min:8"
              :class="{ 'is-invalid': errors['電話'] , 'is-valid': !errors['電話'] && user.tel!== ''}"
            />
            <ErrorMessage
              class="invalid-feedback"
              name="電話"
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">
              地址
              <span class="text-danger">*</span>
            </label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              placeholder="請輸入地址"
              rules="required"
              :class="{ 'is-invalid': errors['地址'] , 'is-valid': user.address!== '' && !errors['地址']}"
              v-model="user.address"
            />
            <ErrorMessage
              class="invalid-feedback"
              name="地址"
            />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="留言" class="form-control" id="message" placeholder="請輸入留言" rows="10" v-model="message"></textarea>
            <span class="invalid-feedback"></span>
          </div>
          <template v-if="carts.carts">
            <div class="d-flex justify-content-between">
              <router-link class="btn btn-primary" to="/cart">上一步</router-link>
              <button class="btn btn-primary" type="submit" :disabled="!carts.carts.length || Object.keys(errors).length !== 0">
                確認資料並送出
                <i class="bi bi-caret-right-fill"></i>
              </button>
            </div>
          </template>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
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
      isLoading: false
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
          this.isLoading = false
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
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getCart()
  }
})
</script>
