<template>
  <nav class="navbar flex-column align-items-stretch bg-light">
    <div>
      <router-link to="/dashboard" class="navbar-brand w-100 mb-5">後台首頁</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/dashboard/products" class="nav-link d-flex align-items-center py-0 mb-3">
            <div class="ps-4 icon">
              <i class="bi bi-handbag-fill rounded-circle p-3 d-block"></i>
            </div>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/orders" class="nav-link d-flex align-items-center py-0 mb-3">
            <div class="ps-4 icon">
              <i class="bi bi-receipt rounded-circle p-3 d-block"></i>
            </div>
            訂單
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/coupons" class="nav-link d-flex align-items-center py-0 mb-3">
            <div class="ps-4 icon">
              <i class="bi bi-gift-fill rounded-circle p-3 d-block"></i>
            </div>
            優惠券列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/articles" class="nav-link d-flex align-items-center py-0">
            <div class="ps-4 icon">
              <i class="bi bi-card-text rounded-circle p-3 d-block"></i>
            </div>
            文章列表
          </router-link>
        </li>
      </ul>
    </div>
    <button type="button" @click="logout" class="btn btn-transparent text-start ps-5 py-3">
      <i class="bi bi-box-arrow-left me-3"></i>
      登出
    </button>
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
