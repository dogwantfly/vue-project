<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="product container py-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/products">樂器</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <a href="#" @click.prevent="updateCategory(product.category)">{{ product.category }}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row pt-5">
      <div class="col-lg-7 d-md-flex mb-5">
        <Swiper
          :style="{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}"
          :loop="false"
          :thumbs="{ swiper: thumbsSwiper }"
          :direction="'vertical'"
          class="mySwiper2 text-center"
        >
          <SwiperSlide>
            <img :src="product.imageUrl" :alt="product.title" class="img-fluid">
          </SwiperSlide>
          <SwiperSlide v-for="(image , key) in product.imagesUrl" :key="image">
            <img :src="image" :alt="`${product.title} ${key}`" class="img-fluid">
          </SwiperSlide>
        </Swiper>
        <Swiper
          @swiper="setThumbsSwiper"
          :loop="false"
          :slidesPerView="4"
          :spaceBetween="10"
          :watchSlidesVisibility="true"
          :watchSlidesProgress="true"
          :direction="'horizontal'"
          class="mySwiper"
          :breakpoints="{
            '768': {
              direction: 'vertical',
            }
          }"
        >
          <SwiperSlide>
            <img :src="product.imageUrl" :alt="product.title" class="img-fluid">
          </SwiperSlide>
          <SwiperSlide v-for="(image , key) in product.imagesUrl" :key="image">
            <img :src="image" :alt="`${product.title} ${key}`"  class="img-fluid">
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="col-lg-5">
        <div class="d-flex align-items-center mb-3">
          <h1 class="me-2 fs-3">
            {{ product.title }}
          </h1>
          <p class="badge bg-primary rounded-pill fs-6 mb-0 me-3">{{ product.category }}</p>
          <button type="button" @click="toggleFavorite(product)" class="btn text-danger">
            <i class="bi"
            :class="myFavorite.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
          </button>
        </div>
        <div class="h5" v-if="!product.price">{{ $filters.currency(product.origin_price) }} 元</div>
        <del class="h6 text-muted"> NT${{ $filters.currency(product.origin_price) }} </del>
        <div class="h5 mb-3">NT${{ $filters.currency(product.price) }}</div>
        <div class="input-group mb-5">
          <input type="number" class="form-control" v-model.number="qty" min="1">
          <button type="button" class="btn btn-primary" @click="addCart(product.id, qty)">
            <div class="spinner-border spinner-border-sm"
            role="status"
            v-if="loadingStatus.loadingCart === product.id">
              <span class="visually-hidden">Loading...</span>
            </div>
            加入購物車
          </button>
        </div>
        <ul>
          <li class="mb-3">
            <h4 class="fs-5">運送方式</h4>
            <p class="text-muted">一般宅配，貨到付款</p>
          </li>
          <li class="mb-3">
            <h4 class="fs-5">運送須知</h4>
            <p class="text-muted">若有不方便寄送之日期（如出國）請於訂單中備註或是任何管道告知，如配送失敗產生二次運費需由買家負擔</p>
          </li>
          <li class="mb-3">
            <h4 class="fs-5">退換貨須知</h4>
            <p class="text-muted">
              依《消費者保護法》的規定，於全站購物皆享有商品到貨【七日猶豫期】（含例假日）之權益。若收到的商品有任何問題，可於猶豫期內申請退貨。
            </p>
          </li>
        </ul>
      </div>
      <div class="product-detail col-12 bg-light text-center py-5 mb-5">
        <ul class="nav nav-pills justify-content-center mb-5" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true">商品內容</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false">商品描述</button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home"
          role="tabpanel" aria-labelledby="pills-home-tab">
            <p class="text-pre-line w-max-content mx-auto">
              {{ product.content }}
            </p>
          </div>
          <div class="tab-pane fade" id="pills-profile"
            role="tabpanel" aria-labelledby="pills-profile-tab">
            <p v-if="product.description">
              <template v-for="desc in product.description.split('\n')" :key="desc">
                {{ desc }} <br/>
              </template>
            </p>
          </div>
        </div>
      </div>
      <div class="product-also-buy col-12 mb-5" v-if="randomProducts.length">
        <h3 class="title mb-4">買了此商品的人也買了...</h3>
        <ul class="row">
          <li class="card col-md-4 col-lg-3 col-xl-2 border-0"
            v-for="item in randomProducts" :key="item.id">
            <div class="overflow-hidden position-relative">
              <button
                type="button"
                @click.stop="toggleFavorite(item)"
                class="btn btn-favorite position-absolute">
                <i class="bi"
                  :class="myFavorite.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
              </button>
              <div class="ratio ratio-3x4">
                <img :src="item.imageUrl" :alt="item.title" class="cart-img card-img-top">
              </div>
              <div class="btn-group position-absolute">
                <button
                  type="button"
                  class="btn btn-primary btn-cart"
                  @click.stop="addCart(item.id, 1)"
                  :disabled="loadingStatus.loadingCart === item.id">
                  <div
                    class="spinner-border spinner-border-sm"
                    role="status"
                    v-if="loadingStatus.loadingCart === item.id">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加到購物車
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title fs-5 mb-0">
                  <a
                    href="#"
                    @click.prevent="getProductInfo(item.id)"
                    class="text-dark d-block stretched-link" >
                    {{ item.title }}
                  </a>
                </h4>
              </div>
              <p class="fw-bold card-text text-muted">NT$ {{ $filters.currency(item.price) }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-12 d-none d-xl-block" v-if="productsViewed.length">
        <h3 class="mb-4">最近瀏覽商品</h3>
        <ul class="row">
          <li class="card col-lg-2 border-0" v-for="item in productsViewed" :key="item.id">
            <img
              :src="item.imageUrl"
              :alt="item.title"
              class="product-img object-fit-cover card-img-top">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title h6 mb-0">
                  <a
                    href="#"
                    @click.prevent="getProductInfo(item.id)"
                    class="text-dark d-block stretched-link">
                    {{ item.title }}
                  </a>
                </h4>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import handleFavorite from '@/methods/handleFavorite';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/thumbs/thumbs.min.css';
import SwiperCore, { Navigation, Thumbs } from 'swiper/core';

SwiperCore.use([Navigation, Thumbs]);

export default {
  data() {
    return {
      product: '',
      qty: 1,
      loadingStatus: {},
      myFavorite: handleFavorite.getFavorite() || [],
      isLoading: false,
      thumbsSwiper: null,
      randomProducts: [],
      productsViewed: [],
    };
  },
  inject: ['$httpMessageState', 'emitter'],
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getProduct(productId) {
      this.isLoading = true;
      const id = productId || this.$route.params.productId;
      const api = `/api/${process.env.VUE_APP_APIPATH}/product/${id}`;
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.isLoading = false;
            this.$httpMessageState(response, '取得產品資料');
            return;
          }
          this.product = response.data.product;
          this.getAllProducts();
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
          this.isLoading = false;
        });
    },
    getAllProducts() {
      const api = `/api/${process.env.VUE_APP_APIPATH}/products/all`;
      this.$http.get(api)
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得全部產品資料');
            this.isLoading = false;
            return;
          }
          this.products = response.data.products;
          this.getRandomProducts();
          this.getProductsViewed();
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
          this.isLoading = false;
        });
    },
    getRandomProducts() {
      const { category, id } = this.product;
      const filterProducts = this.products
        .filter((product) => product.category === category && product.id !== id);
      const arrSet = new Set([]);
      const maxSize = filterProducts.length < 4 ? filterProducts.length : 4;
      for (let i = 0; arrSet.size < maxSize; i += 1) {
        const num = this.$filters.randomInt(filterProducts.length);
        arrSet.add(filterProducts[num]);
      }
      this.randomProducts = [];
      arrSet.forEach((product) => {
        this.randomProducts.push(product);
      });
    },
    saveProductViewed(productId) {
      const maxLength = 6;
      const productsIdViewed = JSON.parse(localStorage.getItem('productsViewed')) || [];
      if (productsIdViewed.includes(productId)) {
        productsIdViewed.splice(productsIdViewed.indexOf(productId), 1);
      }
      productsIdViewed.unshift(productId);
      if (productsIdViewed.length > maxLength) {
        productsIdViewed.pop();
      }
      localStorage.setItem('productsViewed', JSON.stringify(productsIdViewed));
    },
    getProductsViewed() {
      const productsIdViewed = JSON.parse(localStorage.getItem('productsViewed')) || [];
      if (!productsIdViewed.length) return;
      this.productsViewed = [];
      productsIdViewed.forEach((productId) => {
        const filterProduct = this.products.filter((product) => product.id === productId)[0];
        this.productsViewed.push(filterProduct);
      });
    },
    getProductInfo(productId) {
      this.$router.push(`/product/${productId}`);
      this.getProduct(productId);
      this.saveProductViewed(productId);
    },
    addCart(id, qty = 1) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/cart`;
      const data = {
        product_id: id,
        qty,
      };
      this.loadingStatus.loadingCart = id;
      this.$http.post(api, { data })
        .then((response) => {
          if (!response.data.success) {
            this.$httpMessageState(response, '加入購物車');
            return;
          }
          this.emitter.emit('update-cart', id);
          this.loadingStatus.loadingCart = '';
          this.qty = 1;
          this.$httpMessageState(response, '加入購物車');
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤');
        });
    },
    toggleFavorite(item) {
      if (this.myFavorite.includes(item.id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1);
        this.$httpMessageState({
          data: {
            success: true,
            message: `已將 ${item.title} 移除收藏`,
          },
        }, '移除收藏');
      } else {
        this.myFavorite.push(item.id);
        this.$httpMessageState({
          data: {
            success: true,
            message: `已將 ${item.title} 加入收藏`,
          },
        }, '加入收藏');
      }
      handleFavorite.storeFavorite(this.myFavorite);
      this.emitter.emit('update-favorite');
    },
    updateFavorite() {
      this.myFavorite = handleFavorite.getFavorite();
      this.getProduct();
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    updateCategory(category) {
      this.$router.push({
        name: 'Products',
        params: {
          selectedCategory: category,
        },
      });
    },
  },
  mounted() {
    this.$http.defaults.baseURL = process.env.VUE_APP_API;
    this.getProduct();
    this.emitter.on('update-favorite', this.updateFavorite);
    this.saveProductViewed(this.$route.params.productId);
  },
  unmounted() {
    this.emitter.off('update-favorite', this.updateFavorite);
  },
};
</script>
