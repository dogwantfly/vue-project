<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <router-link to="/dashboard" class="navbar-brand">後台首頁</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupons" class="nav-link">優惠券列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/articles" class="nav-link">文章列表</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link nav-link-color">前台</router-link>
          </li>
          <li class="nav-item">
            <button type="button" @click="logout" class="btn nav-link nav-link-color">登出</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/methods/emitter.js'
export default ({
  methods: {
    logout () {
      this.isLoading = true
      const api = '/logout'
      this.$http.post(api)
        .then(response => {
          if (!response.data.success) {
            emitter.emit('push-message', {
              style: 'danger',
              title: '登出失敗',
              content: response.data.message
            })
            this.isLoading = false
            return
          }
          document.cookie = `token= ;expires=${new Date()}`
          this.isLogin = false
          emitter.emit('push-message', {
            style: 'success',
            title: '登出成功',
            content: response.data.message
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 3000)
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
  }
})
</script>

<style lang="scss">
  .nav-link-color {
    color: rgba(0, 0, 0, 0.55);
  }
</style>
