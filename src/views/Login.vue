<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <ToastMessages/>
  <div class="login min-vh-100">
    <router-link to="/" class="navbar-brand">後台首頁</router-link>
    <div class="container">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-md-6 col-lg-5">
          <div class="form p-5">
            <h1 class="fs-4 mb-4">
              管理員登入
            </h1>
            <Form @submit="login" v-slot="{ errors }">
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
                />
                <ErrorMessage
                  name="email"
                  class="invalid-feedback"
                />
              </div>
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
                  :class="{
                    'is-invalid': errors['密碼'],
                    'is-valid': user.password && user.password!== ''
                  }"
                />
                <ErrorMessage
                  name="密碼"
                  class="invalid-feedback"
                />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary mb-3">登入</button>
                <hr>
                <router-link to="/" class="btn btn-outline-secondary mb-3">回到首頁</router-link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default ({
  data() {
    return {
      user: {},
      isLoading: false,
      isLogin: false,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    checkLogin() {
      this.isLoading = true;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      const api = '/api/user/check';
      this.$http.post(api)
        .then((response) => {
          if (!response.data.success) {
            emitter.emit('push-message', {
              style: 'danger',
              title: '未登入',
              content: response.data.message,
            });
            this.isLoading = false;
            this.$router.push('/login');
            return;
          }
          this.isLogin = true;
          emitter.emit('push-message', {
            style: 'success',
            title: '已登入',
            content: '',
          });
          this.$router.push('/dashboard');
          this.isLoading = false;
        })
        .catch((error) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: '連線錯誤',
            content: error,
          });
          this.isLoading = false;
        });
    },
    login() {
      this.isLoading = true;
      const api = '/admin/signin';
      this.$http.post(api, this.user)
        .then((response) => {
          if (!response.data.success) {
            emitter.emit('push-message', {
              style: 'danger',
              title: '登入失敗',
              content: response.data.message,
            });
            this.isLoading = false;
            return;
          }
          const { token, expired } = response.data;
          document.cookie = `token=${token};expires=${new Date(expired)};Secure`;
          emitter.emit('push-message', {
            style: 'success',
            title: '登入成功',
            content: response.data.message,
          });
          this.$router.push('/dashboard');
          this.isLoading = false;
        })
        .catch((error) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: '連線錯誤',
            content: error.message,
          });
          this.isLoading = false;
        });
    },
  },
  created() {
    this.$http.defaults.baseURL = process.env.VUE_APP_API;
    this.checkLogin();
  },
});
</script>
