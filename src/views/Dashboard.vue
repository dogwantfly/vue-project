<template>
<!-- https://dribbble.com/shots/14119591-Dashboard-UX-UI-Design -->
<!-- https://dribbble.com/shots/15005862-Table-Filters -->
<Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
<ToastMessages/>
<div class="dashboard d-flex">
  <Navbar/>
  <div class="w-100 main">
    <div class="container">
      <router-view v-if="isLogin"></router-view>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import $httpMessageState from '@/methods/pushMessageState'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'

export default ({
  data () {
    return {
      isLogin: false,
      isLoading: false
    }
  },
  provide () {
    return {
      $httpMessageState,
      emitter
    }
  },
  components: {
    ToastMessages,
    Navbar
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
            $httpMessageState(response, '登入')
            this.isLoading = false
            this.$router.push('/login')
            return
          }
          this.isLogin = true
          $httpMessageState(response, '已登入')
          this.isLoading = false
        })
        .catch(error => {
          $httpMessageState(error, '連線錯誤')
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
