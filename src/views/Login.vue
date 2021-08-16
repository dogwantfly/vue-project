<template>
    <Loading :active="isLoading"/>
    <ToastMessages/>
    <div class="login row justify-content-center align-items-center h-100">
        <div class="col-8 col-md-6 col-lg-4">
            <h1 class="text-center">
                請先登入
            </h1>
            <Form action="" @submit="login" v-slot="{ errors }">
                <!-- email -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <Field
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="name@example.com"
                      v-model="user.username"
                      required
                      rules="email|required"
                      name="email"
                      :class="{ 'is-invalid': errors['email'], 'is-valid': user.username }"
                    ></Field>
                    <Error-message
                      name="email"
                      class="invalid-feedback"
                    ></Error-message>
                </div>
                <!-- password -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <Field
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="請輸入密碼"
                      v-model="user.password"
                      required
                      rules="required"
                      name="密碼"
                      :class="{ 'is-invalid': errors['密碼'], 'is-valid': user.password && user.password!== '' }"
                    ></Field>
                    <Error-message
                      name="密碼"
                      class="invalid-feedback"
                    ></Error-message>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary mb-3">登入</button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import emitter from '@/methods/emitter.js'
import ToastMessages from '@/components/ToastMessages.vue'
export default ({
  data () {
    return {
      user: {},
      isLoading: false,
      isLogin: false
    }
  },
  provide () {
    return {
      emitter
    }
  },
  components: {
    ToastMessages
  },
  methods: {
    checkLogin () {
      this.isLoading = true
      // 從 cookie 取登入時存的 token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // 設定 request headers
      this.$http.defaults.headers.common.Authorization = token
      const api = '/api/user/check'
      this.$http.post(api)
        .then(response => {
          if (!response.data.success) {
            emitter.emit('push-message', {
              style: 'danger',
              title: '未登入',
              content: response.data.message
            })
            this.isLoading = false
            this.$router.push('/login')
            return
          }
          this.isLogin = true
          emitter.emit('push-message', {
            style: 'success',
            title: '已登入',
            content: ''
          })
          // 轉址
          this.$router.push('/dashboard')
          this.isLoading = false
        })
        .catch(error => {
          emitter.emit('push-message', {
            style: 'danger',
            title: '連線錯誤',
            content: error
          })
          this.isLoading = false
        })
    },
    login () {
      this.isLoading = true
      const api = '/admin/signin'
      this.$http.post(api, this.user)
        .then(response => {
          // 登入失敗
          if (!response.data.success) {
            emitter.emit('push-message', {
              style: 'danger',
              title: '登入失敗',
              content: response.data.message
            })
            this.isLoading = false
            return
          }
          const { token, expired } = response.data
          // 將 token expired 存入 cookie
          document.cookie = `token=${token};expires=${new Date(expired)};Secure`
          emitter.emit('push-message', {
            style: 'success',
            title: '登入成功',
            content: response.data.message
          })
          // 轉址
          this.$router.push('/dashboard')
          this.isLoading = false
        })
        .catch(error => {
          emitter.emit('push-message', {
            style: 'danger',
            title: '連線錯誤',
            content: error.message
          })
          this.isLoading = false
        })
    }
  },
  created () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.checkLogin()
  }
})
</script>
<style scoped>
  .login {
    padding-top: 80px;
  }
</style>
