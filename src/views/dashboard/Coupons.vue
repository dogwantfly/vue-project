<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <header class="mb-5">
    <h1>優惠券管理</h1>
  </header>
  <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
    <button type="button" class="btn btn-primary mt-3" @click="openModal('new')">
      新增優惠券
    </button>
    <div class="input-group w-auto align-items-center border rounded-3">
      <div class="input-text px-3">
        <i class="bi bi-search"></i>
      </div>
      <input type="search" placeholder="搜尋優惠券名稱" class="form-control border-0" v-model.trim="couponSearchBar">
    </div>
    <div class="input-group w-auto align-items-center">
      <label for="sort" class="me-2">排序</label>
      <select class="form-select" aria-label="select" v-model="sortBy" id="sort">
        <option selected value="">新增日期由新到舊（預設）</option>
        <option value="percentFromHighest">折扣率由高至低</option>
        <option value="percentFromLowest">折扣率由低至高</option>
        <option value="expireFromNewest">到期日由新至舊</option>
        <option value="expireFromOldest">到期日由舊至新</option>
      </select>
    </div>
  </div>
  <div class="alert alert-danger border-0" v-if="couponSearchBar && searchResults">
    {{ searchResults }}
  </div>
  <table class="table coupon table-borderless table-hover">
    <thead class="bg-light rounded-3">
      <tr>
        <th scope="col">名稱</th>
        <th scope="col">優惠碼</th>
        <th scope="col">折扣百分比 (%)</th>
        <th scope="col">到期日</th>
        <th scope="col" class="text-end">是否啟用</th>
        <th scope="col" class="text-end">編輯 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in coupons" :key="item.id">
        <td scope="row">{{ item.title }}</td>
        <td>
          <span class="bg-light">{{ item.code }}</span>
        </td>
        <td>{{ item.percent }}</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td :class="item.is_enabled ? 'text-success' : 'text-muted'" class="text-end">{{ item.is_enabled ? "啟用" : "未啟用" }}</td>
        <td class="text-end">
          <div class="btn-group" role="group" aria-label="edit and delete button">
            <button type="button" class="btn btn-outline-secondary border-0 bi bi-pencil-fill" @click="openModal('edit',item)"></button>
            <button type="button" class="btn btn-outline-danger border-0 bi bi-trash-fill" @click="openModal('delete',item)"></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pagination="pagination" @change-page="getCoupons"/>
  <CouponModal :coupon="tempCoupon" ref="couponModal" @update="getCoupons" :is-new="isNew"/>
  <DelItemModal :temp-coupon="tempCoupon" ref="delItemModal" @delete="getCoupons"/>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import CouponModal from '@/components/backend/CouponModal.vue'
import DelItemModal from '@/components/backend/DelItemModal.vue'

export default ({
  components: {
    Pagination,
    CouponModal,
    DelItemModal
  },
  data () {
    return {
      coupons: [],
      tempCoupon: '',
      pagination: {},
      loadingStatus: {},
      current_page: 1,
      isNew: false,
      isLoading: false,
      couponSearchBar: '',
      searchResults: '',
      sortBy: ''
    }
  },
  inject: ['$httpMessageState'],
  methods: {
    getCoupons (page = this.current_page) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupons?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得優惠券資料')
            this.isLoading = false
            return
          }
          this.coupons = response.data.coupons
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          this.couponSearchBar = ''
          this.sortBy = ''
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    openModal (action, item) {
      switch (action) {
        case 'new':
          this.isNew = true
          this.tempCoupon = {
            due_date: Math.floor(Date.now() / 1000),
            is_enabled: 0,
            code: '',
            id: '',
            num: '',
            percent: '',
            title: ''
          }
          setTimeout(() => {
            this.$refs.couponModal.openModal()
          })
          break
        case 'edit':
          this.isNew = false
          this.tempCoupon = JSON.parse(JSON.stringify(item))
          setTimeout(() => {
            this.$refs.couponModal.openModal()
          })
          break
        case 'delete':
          this.tempCoupon = { ...item }
          this.$refs.delItemModal.openModal()
          break
      }
    },
    searchCoupons () {
      const matchCoupons = this.coupons.filter(coupon => coupon.title.toLowerCase().includes(this.couponSearchBar.toLowerCase()))
      if (matchCoupons.length) {
        this.searchResults = ''
        this.coupons = matchCoupons
      } else {
        this.searchResults = '無符合搜尋結果，請再試試其他關鍵字～'
      }
    },
    sortCoupons (sortBy) {
      switch (sortBy) {
        case 'percentFromHighest':
          this.coupons.sort(function (a, b) {
            return b.percent - a.percent
          })
          break
        case 'percentFromLowest':
          this.coupons.sort(function (a, b) {
            return a.percent - b.percent
          })
          break
        case 'expireFromNewest':
          this.coupons.sort(function (a, b) {
            return b.due_date - a.due_date
          })
          break
        case 'expireFromOldest':
          this.coupons.sort(function (a, b) {
            return a.due_date - b.due_date
          })
          break
        default:
          break
      }
    }
  },
  watch: {
    sortBy (newSort, oldSort) {
      if (newSort === oldSort) {
        if (newSort !== '') {
          this.sortCoupons()
        } else {
          this.getCoupons()
        }
      } else if (newSort === '') {
        this.getCoupons()
      } else {
        this.sortCoupons(newSort)
      }
    },
    couponSearchBar (newValue) {
      if (newValue !== '') {
        this.searchCoupons()
      } else {
        this.getCoupons()
      }
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getCoupons()
  }
})
</script>
