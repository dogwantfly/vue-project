<template>
  <div class="home">
    <div class="banner">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-lg-8 h-100">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1629912413182.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=d2v8j9vQzRgkaGEaP4mK3mYwvXhlfJUQPvxY0oGijYGlOCjwlUvNvpEO4Q40Hamh6RFURg4Zh52QFhJ%2BIu4IfpAQVXyrmf6ejlzhKbyt7B5TW9DEuAKaBa%2Fv0E2EhtQS9hETSQMH0wq%2Fg9E74DxZxurwfUYrdRt9KWg3uWqUY41iodZIXVJbXqusj2NXmlWeF0cyyKUeVCTgH%2BKMKsKv034xW1xy77g%2Bp89%2FHTj1j82EgDMpTas5sSesly5Ha6yU54iUKjqmHqi1nWK35NKTn7MX8JWVDMl0O9mAXE7a6j%2BAQJ1zGCvzS19iIuN5c1ikUMj%2B58Z3AoiTrBIQMy34cw%3D%3D" alt="guitar">
        </div>
         <div class="col-lg-4 d-flex justify-content-center flex-column">
           <h1>
             這是一段標題
           </h1>
           <h2>
             這是一段標題
           </h2>
         </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container text-center">
    <div class="row">
      <div class="col-3">
         <button type="button" class="btn btn-secondary" v-if="!isDiscounting && !discountResult" @click="getDiscount">
            <span class="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true" v-if="isDiscounting && !discountResult"></span>
            <span class="visually-hidden" v-if="isDiscounting && !discountResult">Loading...</span>
           抽優惠券
          </button>
        <button type="button" class="btn btn-info" v-else @click="getDiscount" :disabled="isDiscounting">
          再抽一次
        </button>
      </div>
     <div class="col-3">
       <p class="fs-1">
          <span class="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true" v-if="isDiscounting"></span>
          <span class="visually-hidden text-primary" v-if="isDiscounting">Loading...</span>
         {{ discountResult }}
        </p>
     </div>
    </div>
    <div class="row">
      <div class="col-4">
        <Form @submit="subscribe" v-slot="{ errors }" ref="subscribeForm">
          <label for="subscribe">訂閱我們</label>
          <div class="input-group mb-3">
            <div>
              <Field
              id="subscribe"
              name="email"
              type="email"
              class="form-control"
              placeholder="name@example.com"
              rules="email|required"
              v-model="userEmail"
              :class="{ 'is-invalid': errors['email'] , 'is-valid': !errors['email'] && userEmail !== ''}"
              />
              <Error-message name="email" class="invalid-feedback"/>
            </div>
            <button class="btn btn-primary btn-submit" type="submit" :disabled="errors['email'] || !userEmail">訂閱</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
  <div class="bg-danger">
    <div class="container">
      <p>
        活動優惠倒數 {{ daysLeft }} 天 {{ hoursLeft }} 小時 {{ minutesLeft }} 分 {{ secondsLeft }} 秒，快來領取折扣碼
        <code class="bg-secondary p-2 d-inline-block text-white">CHORDNEW100</code>
      </p>
    </div>
  </div>
</template>

<script>
function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

export default ({
  data () {
    return {
      userEmail: '',
      timer: null,
      time: 0,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      discountResult: '',
      isDiscounting: false
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    subscribe () {
      this.$httpMessageState({
        data: {
          success: true,
          message: '感謝您的訂閱，我們會不定期寄送優惠折扣'
        }
      }, '訂閱')
      this.userEmail = ''
      this.$refs.subscribeForm.resetForm()
    },
    countDown () {
      const expires = 1632441600
      const currentTime = Math.floor(Date.now() / 1000)
      this.time = expires - currentTime
      this.daysLeft = parseInt(this.time / 60 / 60 / 24)
      this.hoursLeft = parseInt((this.time / 60 / 60) % 24)
      this.minutesLeft = parseInt((this.time / 60) % 60)
      this.secondsLeft = parseInt(this.time % 60)
      this.time--
      if (this.time === 0) {
        clearInterval(this.timer)
      }
    },
    getDiscount () {
      this.isDiscounting = true
      this.discountResult = ''
      setTimeout(() => {
        const discounts = ['銘謝惠顧', 'firstPrize', 'secondPrize', 'thirdPrize', 'lastPrize']
        this.discountResult = discounts[getRandomInt(discounts.length)]
        this.isDiscounting = false
      }, 2000)
    }
  },
  unmounted () {
    clearInterval(this.timer)
  },
  mounted () {
    this.timer = setInterval(this.countDown, 1000)
  }
})
</script>

<style scoped>
  .home {
    margin-top: -100px;
  }
  .banner-bg {
    background-color: rgba(176, 177, 173, 0.5);
  }
  .banner {
    height: calc(100vh - 100px);
    background: linear-gradient(140deg,rgba(119, 119, 119, 0.549) 50%,rgb(233, 214, 66) 50%) center/100%;
  }
  /* .bg-overlay:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 100px;
    left: 0;
    right: 0;
    background-color: #c9ccce;
    opacity: .55;
  } */
  .banner img {
    height: 100%;
  }
  .btn-submit {
    height: calc(100% - 20px);
  }
</style>
