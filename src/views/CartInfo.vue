<template>
  <Loading :active="isLoading"/>
  <div class="container pt-5">
    <div class="row row-cols-2 justify-content-center">
      <!-- 表單 -->
      <Form @submit="createOrder" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">
            Email
            <span class="text-danger">*</span>
          </label>
          <Field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email" v-model="user.email" rules="email|required" :class="{ 'is-invalid': errors['email'] , 'is-valid': !errors['email'] && user.email!== ''}"/>
          <Error-message name="email" class="invalid-feedback"/>
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
            :class="{ 'is-invalid': errors['姓名'] , 'is-valid': user.name!== '' && !errors['姓名']}" v-model="user.name"/>
          <Error-message class="invalid-feedback" name="姓名"/>
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
            :class="{ 'is-invalid': errors['電話'] , 'is-valid': !errors['電話'] && user.tel!== ''}"/>
          <Error-message class="invalid-feedback" name="電話"/>
        </div>
        <div class="mb-3">
          <label for="region" class="form-label">
            地區
            <span class="text-danger">*</span>
          </label>
          <Field
            id="region"
            name="地區"
            class="form-control"
            rules="required"
            :class="{ 'is-invalid': errors['地區'] , 'is-valid': user.region!== '' && !errors['地區']}" v-model="user.region" as="select">
            <option value="">請選擇地區</option>
            <option value="台北市">台北市</option>
            <option value="高雄市">高雄市</option>
          </Field>
          <Error-message class="invalid-feedback" name="地區"/>
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
            :class="{ 'is-invalid': errors['地址'] , 'is-valid': user.address!== '' && !errors['地址']}" v-model="user.address"/>
          <Error-message class="invalid-feedback" name="地址"/>
        </div>
        <div class="mb-3">
          <label for="payment" class="form-label">
            付款方式
            <span class="text-danger">*</span>
          </label>
          <Field id="payment" name="付款方式" class="form-control" rules="required" :class="{ 'is-invalid': errors['付款方式'] , 'is-valid': user.payment!== '' && !errors['付款方式']}" v-model="user.payment" as="select">
            <option value="" hidden>請選擇付款方式</option>
            <option value="WebATM">WebATM</option>
            <option value="ATM">ATM</option>
            <option value="Barcode">Barcode</option>
            <option value="Credit">Credit</option>
            <option value="ApplePay">ApplePay</option>
            <option value="GooglePay">GooglePay</option>
          </Field>
          <error-message class="invalid-feedback" name="付款方式"></error-message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="留言" class="form-control" id="message" placeholder="請輸入留言" rows="10" v-model="message"></textarea>
          <span class="invalid-feedback"></span>
        </div>
        <template v-if="carts.carts">
          <div class="d-flex justify-content-between">
            <router-link class="btn btn-primary" to="/cart">上一步</router-link>
            <button class="btn btn-primary" type="submit" :disabled="!carts.carts.length || Object.keys(errors).length !== 0">Submit</button>
          </div>
        </template>
      </Form>

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
    // 取得購物車
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
    // 移除購物車
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
    // 套用優惠券
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
    // 建立訂單
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
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getCart()
  }
})
</script>

<style scoped>
.cart {
  padding-top: 80px;
}
</style>
