<template>
  <div class="row justify-content-center cart">
    <div class="col-8">
    <!-- 購物車列表 -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">價錢</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in carts.carts" v-bind:key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger" v-on:click="removeCartItem(item.id)">
                <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingRemoveCart === item.id">
                  <span class="visually-hidden">Loading...</span>
                </div>
                移除購物車
              </button>
            </td>
            <td>
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" :value="item.qty" min="1" data-action="changeQty" @change="addCart(item.product_id, item.qty, $event)">
                <div class="input-group-text">/ {{ item.product.unit }}</div>
              </div>
            </td>
            <td>
              <small v-if="carts.final_total !== carts.total" class="text-success">折扣價：</small>
                {{ item.product.price * item.qty }}
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
            <td class="text-end">{{ carts.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="col-8">
      <!-- 套用優惠券 -->
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCoupon" :disabled="!coupon_code">
            <div class="spinner-border spinner-border-sm" role="status" v-if="loadingStatus.loadingCoupon === coupon_code && coupon_code !== ''">
              <span class="visually-hidden">Loading...</span>
            </div>
            套用優惠碼
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row row-cols-2 justify-content-center">
    <!-- 表單 -->
    <Form @submit="addOrder" v-slot="{ errors }">
      <div class="mb-3">
        <label for="email" class="form-label">
          Email
          <span class="text-danger">*</span>
        </label>
        <Field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email" v-model="user.email" rules="email|required" :class="{ 'is-invalid': errors['email'] , 'is-valid': !errors['email'] && user.email!== ''}"></Field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">
          姓名
          <span class="text-danger">*</span>
        </label>
        <Field id="name" name="姓名" type="text" class="form-control"
                placeholder="請輸入姓名" rules="required" :class="{ 'is-invalid': errors['姓名'] , 'is-valid': user.name!== '' && !errors['姓名']}" v-model="user.name"></Field>
        <error-message class="invalid-feedback" name="姓名"></error-message>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">
          電話
          <span class="text-danger">*</span>
        </label>
        <Field id="tel" name="電話" type="tel" v-model="user.tel" class="form-control" placeholder="請輸入電話" rules="required|numeric|min:8" :class="{ 'is-invalid': errors['電話'] , 'is-valid': !errors['電話'] && user.tel!== ''}"></Field>
        <error-message class="invalid-feedback" name="電話"></error-message>
      </div>
      <div class="mb-3">
        <label for="region" class="form-label">
          地區
          <span class="text-danger">*</span>
        </label>
        <Field id="region" name="地區" class="form-control" rules="required" :class="{ 'is-invalid': errors['地區'] , 'is-valid': user.region!== '' && !errors['地區']}" v-model="user.region" as="select">
          <option value="">請選擇地區</option>
          <option value="台北市">台北市</option>
          <option value="高雄市">高雄市</option>
        </Field>
        <error-message class="invalid-feedback" name="地區"></error-message>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">
          地址
          <span class="text-danger">*</span>
        </label>
        <Field id="address" name="地址" type="text" class="form-control"
                placeholder="請輸入地址" rules="required" :class="{ 'is-invalid': errors['地址'] , 'is-valid': user.address!== '' && !errors['地址']}" v-model="user.address"></Field>
        <error-message class="invalid-feedback" name="地址"></error-message>
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
      <button class="btn btn-primary" type="submit">Submit</button>
    </Form>
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
      change_cart_qty: 0,
      pagination: '',
      tempProduct: {},
      loadingStatus: {},
      coupon_code: ''
    }
  },
  methods: {
    // 加入購物車
    addCart (id, qty = 1, e) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`
      let data = {
        product_id: id,
        qty
      }
      if (e.target.dataset.action === 'changeQty') {
        const newQty = e.target.value - qty
        data = {
          product_id: id,
          qty: newQty
        }
      }
      if (e.target.nodeName === 'BUTTON') {
        this.loadingStatus.loadingCart = id
      }
      // this.$refs.productModal.hideModal()
      this.$http.post(api, { data })
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            return
          }
          this.getCart()
          this.loadingStatus.loadingCart = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 取得購物車
    getCart () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.carts = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 移除購物車
    removeCartItem (id) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart/${id}`
      this.loadingStatus.loadingRemoveCart = id
      this.$http.delete(api)
        .then(response => {
          if (!response.data.success) return
          this.getCart()
          this.loadingStatus.loadingRemoveCart = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 套用優惠券
    addCoupon () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/coupon`
      const data = {
        code: this.coupon_code
      }
      this.loadingStatus.loadingCoupon = this.coupon_code
      this.$http.post(api, { data })
        .then(response => {
          if (!response.data.success) {
            this.loadingStatus.loadingCoupon = ''
            alert(response.data.message)
            return
          }
          this.getCart()
          this.loadingStatus.loadingCoupon = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 建立訂單
    addOrder (values, { resetForm }) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/order`
      const data = {
        user: this.user,
        message: this.message
      }
      if (!this.carts.carts.length) {
        alert('購物車無內容')
        return
      }
      this.$http.post(api, { data })
        .then(response => {
          alert(response.data.message)
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
          }
        })
        .catch(error => {
          console.log(error)
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
