<template>
  <nav class="navbar flex-column align-items-stretch bg-light flex-nowrap">
    <div>
      <router-link to="/" class="navbar-brand w-100 mb-5">前台首頁</router-link>
      <ul class="navbar-nav overflow-auto">
        <li class="nav-item">
          <router-link to="/dashboard/charts" class="nav-link d-flex align-items-center py-0 mb-3">
            <div class="ps-4 icon">
              <i class="bi bi-clipboard-data rounded-circle p-3 d-block"></i>
            </div>
            後台首頁
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/dashboard/products"
            class="nav-link d-flex align-items-center py-0 mb-3">
            <div class="ps-4 icon">
              <i class="bi bi-handbag-fill rounded-circle p-3 d-block"></i>
            </div>
            產品
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
            優惠券
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/articles" class="nav-link d-flex align-items-center py-0">
            <div class="ps-4 icon">
              <i class="bi bi-card-text rounded-circle p-3 d-block"></i>
            </div>
            文章
          </router-link>
        </li>
      </ul>
    </div>
    <button type="button" @click="logOut" class="btn btn-transparent text-start ps-4 py-3">
      <i class="bi bi-box-arrow-left me-2 ps-3"></i>
      登出
    </button>
  </nav>
</template>

<script>
export default ({
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    logOut() {
      const api = '/logout';
      this.$http.post(api)
        .then((response) => {
          if (!response.data.success) {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '登出失敗',
              content: '登出失敗，請再試一次',
            });
            return;
          }
          document.cookie = `token= ;expires=${new Date()}`;
          this.isLogin = false;
          this.$httpMessageState(response, '已登出');
          setTimeout(() => {
            this.$router.push('/');
          }, 3000);
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
        });
    },
  },
  created() {
    this.$http.defaults.baseURL = process.env.VUE_APP_API;
  },
});
</script>
