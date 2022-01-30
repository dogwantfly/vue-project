<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <div class="position-relative bg-light">
    <div class="container pt-5">
      <div class="row d-lg-none mb-5">
        <div class="col-md-10 mx-auto">
          <ol class="row progress-bar list-unstyled justify-content-between text-center">
            <li class="col-4 done">確認購物車品項</li>
            <li class="col-4 active">填寫資料</li>
            <li class="col-4">確認訂單並付款</li>
          </ol>
        </div>
      </div>
      <div class="row flex-lg-row-reverse gx-5 pb-5 mb-5">
        <div class="col-lg-4 mb-4">
          <div class="bg-light sticky-lg-top">
            <h2 class="fs-4 text-primary d-none d-lg-block mb-3">
              <i class="bi bi-card-text"></i>
              訂單細節
            </h2>
            <div class="accordion-item bg-transparent border-0">
              <h2 class="accordion-header order-info-header" id="headingOne">
                <button class="accordion-button shadow-sm text-primary fw-bold fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <i class="bi bi-card-text me-2"></i>
                  訂單細節
                </button>
              </h2>
              <div id="collapseOne" class="order-info accordion-collapse collapse" aria-labelledby="headingOne" >
                <div class="accordion-body px-0 py-lg-0">
                  <ul class="carts list-group list-group-flush" v-if="carts.carts">
                    <li class="list-group-item px-0" v-for="cart in carts.carts" :key="cart.id">
                      <router-link class="d-flex w-100 flex-nowrap justify-content-between" :to="`/product/${cart.product.id}`">
                        <img :src="cart.product.imageUrl" :alt="cart.product.title" class="img-fluid img-size">
                        <div class="card-body d-flex flex-column justify-content-between py-0 pe-0">
                          <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title h6">{{ cart.product.title }}</h5>
                            <small class="text-primary bg-info rounded-pill py-1 px-2 badge" v-if="cart.coupon">
                              <i class="bi bi-tag-fill"></i>
                              {{ cart.coupon.code }}
                            </small>
                          </div>
                          <div class="d-flex justify-content-between">
                            <p class="card-text d-inline-block fw-bold mb-0">x {{ cart.qty }}</p>
                            <p class="card-text d-inline-block fw-bold mb-0">${{ $filters.currency(cart.product.price) }}</p>
                          </div>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                  <dl class="row text-primary align-items-center">
                    <dt class="col-3">運費</dt>
                    <dd class="col-9 text-end fw-bold">$0</dd>
                    <dt class="col-3 text-nowrap" v-if="carts.final_total !== carts.total">
                      <i class="bi bi-tag-fill text-primary"></i>
                      折扣後合計
                    </dt>
                    <dt class="col-3" v-else>合計</dt>
                    <dd class="col-9 text-end fs-5 fw-bold mb-0">
                      ${{ $filters.currency(carts.final_total) }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <h1 class="fs-4 text-primary mb-3">
            <i class="bi bi-pen-fill"></i>
            訂購人資訊
          </h1>
          <div class="bg-white shadow rounded-3 py-5 px-3 px-md-5">
            <div class="row d-none d-lg-block mb-5">
              <div class="col-md-10 mx-auto">
                <ol class="row progress-bar list-unstyled justify-content-between text-center">
                  <li class="col-4 done">確認購物車品項</li>
                  <li class="col-4 active">填寫資料</li>
                  <li class="col-4">確認訂單並付款</li>
                </ol>
              </div>
            </div>
            <Form @submit="createOrder" v-slot="{ errors }">
              <p class="text-danger">* 為必填欄位</p>
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
                <p class="text-danger text-end small">
                  <i class="bi bi-exclamation-circle"></i>
                  提醒：送出後即無法修改資料，敬請確認後再送出！
                </p>
                <div class="d-flex justify-content-between">
                  <router-link class="btn btn-outline-primary" to="/cart">
                    <i class="bi bi-caret-left-fill"></i>
                    上一步
                  </router-link>
                  <button class="btn btn-primary" type="submit" :disabled="!carts.carts.length || Object.keys(errors).length !== 0" :class="{ 'cursor-not-allowed' : isEmpty}">
                    確認資料並送出
                    <i class="bi bi-caret-right-fill"></i>
                  </button>
                </div>
              </template>
            </Form>
          </div>
        </div>
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
        address: ''
      },
      message: '',
      carts: {},
      isLoading: false,
      isEmpty: true
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
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
              address: ''
            }
            this.message = ''
            resetForm()
            if (this.carts.carts[0].coupon) {
              let couponsGot = JSON.parse(localStorage.getItem('couponsGot'))
              couponsGot = couponsGot.filter(coupon => coupon !== this.carts.carts[0].coupon.code)
              localStorage.setItem('couponsGot', JSON.stringify(couponsGot))
            }
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
  watch: {
    user: {
      handler (val) {
        if (val.email && val.tel && val.name && val.address) {
          this.isEmpty = false
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getCart()
  }
})
</script>
