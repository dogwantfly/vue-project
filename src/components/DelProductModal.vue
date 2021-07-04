<template>
  <div class="modal fade" id="delProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定要刪除 <span class="fw-bold" v-if="tempProduct">{{ tempProduct.title }}</span>
          <span class="fw-bold" v-if="tempCoupon">{{ tempCoupon.title }}</span> 嗎？ （刪除後即無法恢復）</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteItem">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-product', 'temp-coupon'],
  template: '#delProductModal',
  data () {
    return {
      modal: null
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    // 刪除資料
    deleteProduct () {
      const id = this.tempProduct.id
      if (id) {
        const api = `/api/${process.env.VUE_APP_APIPATH}/admin/product/${id}`
        axios.delete(api, { data: this.tempProduct })
          .then(response => {
            if (!response.data.success) return
            this.modal.hide()
            this.$emit('delete')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    deleteCoupon () {
      const id = this.tempCoupon.id
      if (id) {
        const api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${id}`
        axios.delete(api, { data: this.tempCoupon })
          .then(response => {
            if (!response.data.success) return
            this.modal.hide()
            this.$emit('delete')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    deleteItem () {
      if (this.tempProduct) {
        this.deleteProduct()
      } else {
        this.deleteCoupon()
      }
    }
  },
  mounted () {
    // 建立 instance
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false
    })
  }
}
</script>
