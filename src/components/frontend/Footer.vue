<template>
  <div class="subscribe border-top">
    <div class="container border-bottom">
      <Form @submit="subscribe" v-slot="{ errors }" ref="subscribeForm">
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="subscribe" class="fs-3 fw-bold">
              訂閱我們，<br>
              將會不定期獲得活動優惠
            </label>
          </div>
          <div class="col-md-6">
            <div class="input-group mb-3">
              <div class="flex-grow-1">
                <Field
                id="subscribe"
                name="email"
                type="email"
                class="form-control"
                placeholder="name@example.com"
                rules="email|required"
                v-model="userEmail"
                :class="{
                  'is-invalid': errors['email'] , 'is-valid': !errors['email'] && userEmail !== ''
                }"
                />
                <ErrorMessage name="email" class="invalid-feedback"/>
              </div>
              <button
                class="btn btn-primary btn-submit flex-shrink-0"
                type="submit"
                :disabled="errors['email'] || !userEmail">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
  <footer class="footer">
    <div class="container justify-content-md-between d-md-flex">
      <div class="d-flex flex-column gap-4">
        <router-link to="/" class="navbar-brand">Chord</router-link>
        <ul class="d-flex gap-3">
          <li>
            <a href="#" class="bi bi-facebook fs-3"></a>
          </li>
          <li>
            <a href="#" class="bi bi-instagram fs-3"></a>
          </li>
          <li>
            <a href="#" class="bi bi-twitter fs-3"></a>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="fw-bold mb-3 text-muted d-none d-md-block">了解更多</h3>
        <ul class="navbar-nav mb-3">
          <li class="nav-item">
            <router-link to="/products" class="nav-link nav-link-color">樂器</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blogs" class="nav-link nav-link-color">部落格</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link nav-link-color">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" class="nav-link nav-link-color">查看訂單狀態</router-link>
          </li>
        </ul>
      </div>
      <div class="d-none d-md-block">
        <h3 class="fw-bold mb-3 text-muted">管理員操作</h3>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login" class="nav-link nav-link-color">後台登入</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link nav-link-color">後台首頁</router-link>
          </li>
        </ul>
      </div>
    </div>
    <p class="text-muted container">© 2022. All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    subscribe() {
      this.$httpMessageState({
        data: {
          success: true,
          message: '感謝您的訂閱，我們會不定期寄送優惠折扣',
        },
      }, '訂閱');
      this.userEmail = '';
      this.$refs.subscribeForm.resetForm();
    },
  },
};
</script>
