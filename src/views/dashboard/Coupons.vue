<template>
  <h1>優惠券頁面</h1>
  <button type="button" class="btn btn-primary mt-3" v-on:click="openModal('new')">
      新增優惠券
  </button>
  <table class="table">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">優惠碼</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" v-bind:key="item.id">
          <td scope="row">{{ item.title }}</td>
          <td>
            {{item.code}}
          </td>
          <td>{{item.percent}}</td>
          <td>{{new Date((item.due_date + 8 * 3600) * 1000)
        .toISOString().split('T')[0]}}</td>
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
  <pagination :pagination="pagination" @change-page="getCoupons"></pagination>
  <!-- couponModal -->
  <coupon-modal :coupon="tempCoupon" ref="couponModal" @update="getCoupons" :is-new="isNew"></coupon-modal>
  <!-- delProductModal   -->
  <del-product-modal :temp-coupon="tempCoupon" ref="delProductModal" @delete="getCoupons"></del-product-modal>
</template>
<style scoped>
  .table {
    table-layout: fixed;
  }
</style>
<script>
import pagination from '@/components/Pagination.vue'
import couponModal from '@/components/CouponModal.vue'
import delProductModal from '@/components/DelProductModal.vue'
export default ({
  components: {
    pagination,
    couponModal,
    delProductModal
  },
  data () {
    return {
      coupons: [],
      tempCoupon: '',
      pagination: {},
      loadingStatus: {},
      current_page: 1,
      isNew: false
    }
  },
  methods: {
    // 取得優惠券列表
    getCoupons (page = this.current_page) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupons?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.coupons = response.data.coupons
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 開啟編輯、刪除、查看更多
    openModal (action, item) {
      switch (action) {
        case 'new':
          this.isNew = true
          this.tempCoupon = {
            due_date: Math.floor(Date.now() / 1000),
            is_enabled: 0
          }
          this.$refs.couponModal.openModal()
          break
        case 'edit':
          this.isNew = false
          this.tempCoupon = { ...item }
          this.$refs.couponModal.openModal()
          break
        case 'delete':
          this.tempCoupon = { ...item }
          this.$refs.delProductModal.openModal()
          break
      }
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    // 取商品資料
    this.getCoupons()
  }
})
</script>
