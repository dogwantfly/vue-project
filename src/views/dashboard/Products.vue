<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <header class="mb-5">
    <h1>
      產品管理
    </h1>
  </header>
  <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
    <button type="button" class="btn btn-primary" @click="openModal('new')">
      新增產品
    </button>
    <div class="input-group w-auto align-items-center border rounded-3">
      <div class="input-text px-3">
        <i class="bi bi-search"></i>
      </div>
      <input type="search" v-model.trim="productSearchBar" placeholder="搜尋商品名稱" class="form-control border-0">
    </div>
    <div class="input-group w-auto align-items-center" v-if="products">
      <label for="sort" class="me-2">排序</label>
      <select class="form-select" aria-label="select" v-model="sortBy" id="sort">
        <option selected value="">日期由新到舊（預設）</option>
        <option value="priceFromHighest" :disabled="products.length ? false : true">售價由高至低</option>
        <option value="priceFromLowest" :disabled="products.length ? false : true">售價由低至高</option>
      </select>
    </div>
  </div>
  <div class="alert alert-danger border-0" v-if="productSearchBar && searchResults">
    {{ searchResults }}
  </div>
  <ul class="nav nav-pills mb-3">
    <li class="nav-item">
      <a class="nav-link rounded-pill" :class="{'active': filterBy === ''}" href="#" @click.prevent="getProducts(1, 'allProducts')">
        所有產品
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded-pill" :class="{'active': filterBy === 'active'}" href="#" @click.prevent="filterData('active')">
        已啟用
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded-pill" href="#" :class="{'active': filterBy === 'inactive'}" @click.prevent="filterData('inactive')">
        未啟用
      </a>
    </li>
  </ul>
  <table class="table table-borderless table-hover">
    <thead class="bg-light rounded-3">
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col" class="text-end">是否啟用</th>
        <th scope="col" class="text-end">編輯 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in products" :key="item.id">
        <td scope="row">{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-muted">{{ $filters.currency(item.origin_price) }}</td>
        <td>{{ $filters.currency(item.price) }}</td>
        <td :class="item.is_enabled ? 'text-success': 'text-muted'" class="text-end">{{ item.is_enabled ? "啟用" : "未啟用" }}</td>
        <td class="text-end">
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-outline-secondary border-0 bi bi-pencil-fill" @click="openModal('edit',item)"></button>
            <button type="button" class="btn btn-outline-danger border-0 bi bi-trash-fill" @click="openModal('delete',item)"></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="text-center text-muted" v-if="filterBy !== '' && !products.length">
    <span v-if="filterBy === 'inactive'">無未啟用產品</span>
    <span v-else-if="filterBy === 'active'">無已啟用產品</span>
  </p>
  <Pagination :pagination="pagination" @change-page="getProducts"/>
  <ProductModal :temp-product="tempProduct" :is-new="isNew" ref="productModal" @update="getProducts"/>
  <DelItemModal :temp-product="tempProduct" :products="products" ref="delItemModal" @delete="getProducts"/>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ProductModal from '@/components/backend/ProductModal.vue'
import DelItemModal from '@/components/backend/DelItemModal.vue'

export default ({
  components: {
    Pagination,
    ProductModal,
    DelItemModal
  },
  data () {
    return {
      products: '',
      tempProduct: {},
      pagination: '',
      isNew: false,
      isLoading: false,
      current_page: 1,
      sortBy: '',
      productSearchBar: '',
      searchResults: '',
      filterBy: '',
      filtedProducts: '',
      sortedProducts: '',
      allProducts: '',
      matchProducts: ''
    }
  },
  inject: ['$httpMessageState'],
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
    getProducts (page = this.current_page, filter) {
      if (this.pagination !== '' && filter === 'allProducts') return
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
          this.filterBy = ''
          this.filtedProducts = ''
          this.matchProducts = ''
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          this.getAllProducts()
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getAllProducts () {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/products/all`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得產品資料')
            this.isLoading = false
            return
          }
          this.allProducts = Object.values(response.data.products)
          if (this.productSearchBar !== '') {
            this.searchProducts()
          }
          if (this.sortedProducts !== '') {
            this.sortProducts(this.sortBy)
          }
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    sortProducts (sortBy) {
      let products = []
      this.pagination = ''
      if (this.filtedProducts) {
        products = this.filtedProducts
      } else if (this.matchProducts) {
        products = this.matchProducts
      } else {
        products = this.allProducts
      }
      switch (sortBy) {
        case 'priceFromLowest':
          products.sort((a, b) => a.price - b.price)
          break
        case 'priceFromHighest':
          products.sort((a, b) => b.price - a.price)
          break
        default:
          break
      }
      this.sortedProducts = products
      this.products = this.sortedProducts
    },
    searchProducts () {
      this.matchProducts = this.allProducts.filter(product => product.title.toLowerCase().includes(this.productSearchBar.toLowerCase()))
      if (this.matchProducts.length) {
        this.searchResults = ''
        this.products = this.matchProducts
        if (this.sortedProducts !== '') {
          this.sortProducts(this.sortBy)
        } else {
          this.sortBy = ''
          this.sortedProducts = ''
        }
        this.filterBy = ''
        this.filtedProducts = ''
        this.pagination = ''
      } else {
        this.searchResults = '無符合搜尋結果，請再試試其他關鍵字～'
      }
    },
    filterData (filterBy) {
      if (this.filterBy && this.filterBy === filterBy) return
      this.pagination = ''
      this.filterBy = filterBy
      let products = []
      if (this.matchProducts) {
        products = this.matchProducts
      } else {
        products = this.allProducts
      }
      switch (filterBy) {
        case 'active':
          this.filtedProducts = products.filter(product => product.is_enabled)
          break
        case 'inactive':
          this.filtedProducts = products.filter(product => !product.is_enabled)
          break
        default:
          break
      }
      if (this.sortedProducts) {
        this.sortProducts(this.sortBy)
      } else {
        this.products = this.filtedProducts
      }
    }
  },
  watch: {
    sortBy (newSort, oldSort) {
      this.pagination = ''
      if (newSort === oldSort) {
        if (newSort === 'priceFromLowest' || newSort === 'priceFromHighest') {
          this.sortProducts(this.sortBy)
        }
      } else if (newSort === '') {
        this.sortedProducts = ''
        this.getProducts()
      } else {
        this.sortProducts(this.sortBy)
      }
    },
    productSearchBar (newValue) {
      if (newValue !== '') {
        this.getAllProducts()
      } else {
        this.getProducts()
      }
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getProducts()
  }
})
</script>
