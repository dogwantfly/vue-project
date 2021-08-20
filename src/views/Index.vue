<template>
  <div class="home text-center">
    <div class="banner bg-overlay">
    </div>
  </div>
  <div class="container">
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
        活動優惠倒數 {{ time }} 秒，快來領取折扣碼
        <code>test</code>
      </p>
    </div>
  </div>
</template>

<script>
export default ({
  data () {
    return {
      userEmail: '',
      timer: null,
      time: Date.now() + 24 * 60 * 60 * 20
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
      this.time--
      if (this.time === 0) {
        clearInterval(this.timer)
      }
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
    background: url('https://storage.googleapis.com/vue-course-api.appspot.com/hsinyuuu/1628700994415.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OHIKs%2F4ilnVuRvsNh7QCbrF%2B%2Bjqvrcey3DgKyGywreHd22qUA4PzDEIuwJ2MotDhthNV99%2F%2FDhrH0cK7HsTXBssMqICcwvnEYKWSPn7MWpUdSbs3krnA0PAl0aRBaQVT98bU6cQDP9ziLBnVViF2tcqUioqsAWJn67%2FELiNb0ZQ1KOksV9WHkzsDurYyS3HuYTNmujQCrDtDM0Wf2vPVy8z5SXDGujiov34%2BGpC8Ul60orvZLGGhIsOe1u0jq2aW%2FHPiMCgp748r8FdlmyywTnVmEgmiyPgGh5qdQ9JmlMXIyzaMKe4tqCeaQ%2Bdh6CiNGWM%2FxtWjwrqCHdpY95X1ww%3D%3D') no-repeat center/cover;
    background-color: rgba(119, 119, 119, 0.549);
  }
  .bg-overlay:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 100px;
    left: 0;
    right: 0;
    background-color: #c9ccce;
    opacity: .55;
  }
  .banner img {
    height: 60vh;
  }
  .btn-submit {
    height: calc(100% - 20px);
  }
</style>
