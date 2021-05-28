<template>
  <div class="container">
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
          <th scope="col">數量</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" v-bind:key="item.id">
          <td scope="row">{{ item.category }}</td>
          <td>{{item.title}}</td>
          <td>{{item.origin_price}}</td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
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
    <pagination :pagination="pagination" @change-page="getProduct"></pagination>
  </div>
  <!-- productModal -->
  <product-modal :temp-product="tempProduct" :products="products" :is-new="isNew" ref="productModal" @update="getProduct"></product-modal>
  <!-- delProductModal   -->
  <del-product-modal :temp-product="tempProduct" :products="products" ref="delProductModal" @delete="getProduct"></del-product-modal>
</template>
<script>
import axios from 'axios'
import pagination from '@/components/Pagination.vue'
import productModal from '@/components/ProductModal.vue'
import delProductModal from '@/components/DelProductModal.vue'

export default ({
  components: {
    pagination,
    productModal,
    delProductModal
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false
    }
  },
  methods: {
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.$data.tempProduct = this.$options.data().tempProduct
          this.isNew = true
          this.$refs.productModal.openModal()
          break
        case 'edit':
          this.tempProduct = { ...item }
          this.isNew = false
          this.$refs.productModal.openModal()
          break
        case 'delete':
          this.tempProduct = { ...item }
          this.$refs.delProductModal.openModal()
          break
      }
    },
    // 取得商品列表
    getProduct (page = 1) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${page}`
      axios.get(api)
        .then(response => {
          if (!response.data.success) return
          this.products = response.data.products
          this.pagination = response.data.pagination
        })
        .catch(error => {
          console.log(error)
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
    axios.defaults.headers.common.Authorization = token
    axios.defaults.baseURL = process.env.VUE_APP_API
    // 取商品資料
    this.getProduct()
  }
})
</script>
