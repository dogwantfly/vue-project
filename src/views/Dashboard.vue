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
            <router-link to="/" class="nav-link">前台</router-link>
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
    <router-view/>
  </div>
</template>

<style scoped>
.dashboard {
  padding-top: 80px;
}
</style>
