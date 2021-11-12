<template>
  <div class="modal fade" id="delProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">
            刪除
            <span v-if="tempProduct">產品</span>
            <span v-else-if="tempCoupon">優惠券</span>
            <span v-else>文章</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定要刪除 <span class="fw-bold" v-if="tempProduct">{{ tempProduct.title }}</span>
          <span class="fw-bold" v-if="tempCoupon">{{ tempCoupon.title }}</span>
          <span class="fw-bold" v-if="tempArticle">{{ tempArticle.title }}</span>
          嗎？</p>
          <div class="alert alert-danger py-2" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            刪除後即無法恢復
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteItem">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: ['temp-product', 'temp-coupon', 'temp-article'],
  emits: ['delete'],
  template: '#delProductModal',
  data () {
    return {
      modal: null,
      api: '',
      data: {}
    }
  },
  inject: ['$httpMessageState'],
  mixins: [modalMixin],
  methods: {
    openModal () {
      this.modal.show()
    },
    delete () {
      this.isLoading = true
      this.$http.delete(this.api, this.data)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '刪除')
            this.isLoading = false
            return
          }
          this.modal.hide()
          this.$emit('delete')
          this.$httpMessageState(response, '刪除')
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    deleteItem () {
      if (this.tempProduct) {
        this.api = `/api/${process.env.VUE_APP_APIPATH}/admin/product/${this.tempProduct.id}`
        this.data = { data: this.tempProduct }
      } else if (this.tempCoupon) {
        this.api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${this.tempCoupon.id}`
        this.data = { data: this.tempCoupon }
      } else {
        this.api = `/api/${process.env.VUE_APP_APIPATH}/admin/article/${this.tempArticle.id}`
        this.data = { data: this.tempArticle }
      }
      this.delete()
    }
  }
}
</script>
