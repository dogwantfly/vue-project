<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-bg">
    <div class="container">
      <router-link to="/index" class="navbar-brand nav-link-color">前台</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <router-link to="/index" class="nav-link">Home</router-link>
          </li> -->
          <li class="nav-item">
            <router-link to="/products" class="nav-link nav-link-color">前台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link nav-link-color">前台購物車</router-link>
          </li>
        </ul>
      </div>
      <router-link to="/login" class="nav-link nav-link-color">後台登入</router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>
<style scoped lang="scss">

  .home {
    padding-top: 80px;
  }
  .navbar-bg {
    background-color: #293845;
  }
  .nav-link-color {
    color: #F6F1E6;
    &:hover {
      background-color: #f6f1e63d;
      font-weight: bold;
      border-radius: 50px;
    }
  }
  .navbar-bg .nav-link.active {
    background-color: #f6f1e63d;
    font-weight: bold;
    border-radius: 50px;
  }
</style>
