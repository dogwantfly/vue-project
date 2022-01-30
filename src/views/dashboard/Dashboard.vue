<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <ToastMessages/>
  <div class="dashboard d-flex" :class="isExpand ? 'expand' : ''">
    <Navbar/>
    <main class="w-100 main">
      <div class="bg-white mb-3">
        <button type="button" class="btn d-inline-block sticky-top rounded-end bg-light shadow-sm py-2 px-4" @click="isExpand = !isExpand">
          <i class="bi bi-arrow-bar-left"></i>
        </button>
      </div>
      <div class="container">
        <router-view v-if="isLogin"/>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/backend/Navbar.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import $httpMessageState from '@/methods/pushMessageState'
import emitter from '@/methods/emitter'

export default ({
  data () {
    return {
      isLogin: false,
      isLoading: false,
      isExpand: true
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
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
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
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token) {
      this.checkLogin()
    } else {
      this.$router.push('/login')
    }
  }
})
</script>
