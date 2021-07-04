<template>
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true" ref="modal">
       <div class="modal-dialog modal-md">
         <div class="modal-content">
           <div class="modal-header bg-dark text-white">
             <h5 class="modal-title" id="exampleModalLabel">
               <span v-if="isNew">新增</span>
               <span v-else>編輯</span>優惠券
              </h5>
             <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <!-- 套用優惠券 -->
              <div class="mb-3">
                <label for="coupon_title" class="form-label">名稱</label>
                <input type="text" class="form-control" id="coupon_title" placeholder="請輸入優惠券名稱" v-model="tempCoupon.title">
              </div>
              <div class="mb-3">
                <label for="coupon_code" class="form-label">代碼</label>
                <input type="text" class="form-control" id="coupon_code" placeholder="請輸入優惠券代碼，例：123coupon" v-model="tempCoupon.code">
              </div>
              <div class="mb-3">
                <label for="coupon_percent" class="form-label">折扣</label>
                <input type="text" class="form-control" id="coupon_percent" placeholder="請輸入優惠券折扣，例：80 表示為原價的 80%（8 折）" v-model.number="tempCoupon.percent">
              </div>
              <div class="mb-3">
                <label for="coupon_due_date" class="form-label">到期日</label>
                <input type="date" class="form-control" id="coupon_due_date" placeholder="請輸入優惠券到期日" v-model="due_date" :min="today">
              </div>
              <div class="mb-3">
                <input type="checkbox" name="" id="is_enabled" :checked="tempCoupon.is_enabled" class="me-2" :true-value="1" :false-value="0" v-model.number="tempCoupon.is_enabled">
                <label for="is_enabled" class="form-label">{{tempCoupon.is_enabled ? '啟用' : '未啟用' }}</label>
              </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
               <button type="button" class="btn btn-primary" v-on:click="updateCoupon">確認</button>
             </div>
           </div>
         </div>
       </div>
     </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['coupon', 'isNew'],
  template: '#couponModal',
  data () {
    return {
      modal: null,
      tempCoupon: {},
      due_date: '',
      today: ''
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    // 建立、更新優惠券
    updateCoupon () {
      const id = this.tempCoupon.id
      let api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupon`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempCoupon })
        .then(response => {
          if (!response.data.success) {
            alert(response.data.message)
            return
          }
          this.modal.hide()
          this.$emit('update')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = { ...this.coupon }
      // 將時間格式改為 YYYY-MM-DD
      // const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
      //   .toISOString().split('T')[0]
      const dateAndTime = new Date((this.tempCoupon.due_date + 8 * 3600) * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mounted () {
    // 建立 instance
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false
    })
    // https://www.ucamc.com/articles/343-javascript-%E8%BD%89%E6%8F%9B%E6%99%82%E5%8D%80-toisostring-%E7%9B%B8%E5%B7%AE%E5%95%8F%E9%A1%8C
    const todayTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    this.today = todayTime
  }
}
</script>
