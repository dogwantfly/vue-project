<template>
    <div class="login row justify-content-center align-items-center h-100">
        <div class="col-8 col-md-6 col-lg-4">
            <h1 class="text-center">
                請先登入
            </h1>
            <form action="">
                <!-- email -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="user.username" required>
                </div>
                <!-- password -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="請輸入密碼" v-model="user.password" required>
                </div>
                <div class="d-grid">
                    <button type="button" class="btn btn-primary mb-3" @click="login">登入</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default ({
  data () {
    return {
      user: {}
    }
  },
  methods: {
    login () {
      axios.defaults.baseURL = 'https://dev-vue-course-api.hexschool.io'
      const api = '/admin/signin'
      axios.post(api, this.user)
        .then(response => {
          // console.log(response)
          // 登入失敗
          if (!response.data.success) {
            alert(response.data.error.message)
            return
          }
          const { token, expired } = response.data
          // console.log(`token: ${token}`, `expired: ${expired}`)
          // 將 token expired 存入 cookie
          document.cookie = `token=${token};expired=${new Date(expired)}`
          // 轉址
          this.$router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
</script>
<style scoped>
.login {
  padding-top: 80px;
}
</style>
