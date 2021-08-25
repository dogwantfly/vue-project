<template>
  <Loading :active="isLoading" :z-index="100"/>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary mt-3" v-on:click="openModal('new')">
    新增資料
  </button>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in products" v-bind:key="item.id">
        <td scope="row">{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ $filters.currency(item.origin_price) }}</td>
        <td>{{ $filters.currency(item.price) }}</td>
        <td v-bind:class="{ 'text-success': item.is_enabled}">{{item.is_enabled ? "啟用" : "未啟用" }}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-warning" v-on:click="openModal('edit',item)">編輯</button>
            <button type="button" class="btn btn-danger" v-on:click="openModal('delete',item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 分頁 -->
  <Pagination :pagination="pagination" @change-page="getProducts"/>

  <!-- productModal -->
  <ProductModal :temp-product="tempProduct" :is-new="isNew" ref="productModal" @update="getProducts"/>
  <!-- DelItemModal   -->
  <DelItemModal :temp-product="tempProduct" :products="products" ref="delItemModal" @delete="getProducts"/>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ProductModal from '@/components/ProductModal.vue'
import DelItemModal from '@/components/DelItemModal.vue'

export default ({
  components: {
    Pagination,
    ProductModal,
    DelItemModal
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      isLoading: false,
      current_page: 1
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            category: '',
            id: '',
            imageUrl: '',
            imagesUrl: [],
            is_enabled: 0,
            num: '',
            origin_price: '',
            price: '',
            title: '',
            unit: ''
          }
          this.isNew = true
          setTimeout(() => {
            this.$refs.productModal.openModal()
          })
          break
        case 'edit':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          this.isNew = false
          if (!this.tempProduct.imagesUrl) {
            this.tempProduct.imagesUrl = []
          }
          setTimeout(() => {
            this.$refs.productModal.openModal()
          })
          break
        case 'delete':
          this.tempProduct = { ...item }
          this.$refs.delItemModal.openModal()
          break
      }
    },
    // 取得商品列表
    getProducts (page = this.current_page) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得產品資料')
            this.isLoading = false
            return
          }
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  },
  mounted () {
    // 從 cookie 取登入時存的 token
    const token = document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      .split('=')[1]

    if (token === '') {
      window.location = 'index.html'
    }
    // 設定 request headers
    this.$http.defaults.headers.common.Authorization = token
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    // 取商品資料
    this.getProducts()
  }
})
</script>
