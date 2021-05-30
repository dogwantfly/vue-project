<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <router-link to="/dashboard" class="navbar-brand">後台首頁</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/index" class="nav-link">前台</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link">後台產品列表</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/products" class="nav-link">後台產品列表</router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
  <div class="container dashboard">
    這是後台頁面
    <router-view v-if="isLogin"></router-view>
  </div>
</template>

<style scoped>
.dashboard {
  padding-top: 80px;
}
</style>
<script>
export default ({
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    checkLogin () {
      const api = '/api/user/check'
      this.$http.post(api)
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            this.$router.push('/login')
            return
          }
          this.isLogin = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    // 從 cookie 取登入時存的 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    console.log(token)
    // 設定 request headers
    this.$http.defaults.headers.common.Authorization = token
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.checkLogin()
    if (token === '') {
      this.$router.push('/login')
    }
  }
})
</script>
