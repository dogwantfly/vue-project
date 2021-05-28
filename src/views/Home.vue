<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">前台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">前台購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">後台</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="home text-center">
    <HelloWorld msg="這是前台頁面"/>
  </div>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
  .home {
    padding-top: 80px;
  }
  .navbar-light .navbar-nav .nav-link.active {
    color: #255957;
    font-weight: bold;
  }
</style>
