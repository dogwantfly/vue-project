<template>
  <div class="modal fade" id="delOrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">刪除訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定要刪除編號：
            <span class="fw-bold" v-if="tempOrder.id"> {{ tempOrder.id }} </span>
            <span class="fw-bold" v-else> 全部 </span>
            訂單嗎？</p>
          <div class="alert alert-danger py-2" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            刪除後即無法恢復
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteOrder">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: ['temp-order'],
  template: '#delOrderModal',
  data () {
    return {
      modal: null,
      isLoading: false
    }
  },
  mixins: [modalMixin],
  methods: {
    openModal () {
      this.modal.show()
    },
    // 刪除資料
    deleteOrder () {
      this.isLoading = true
      const id = this.tempOrder.id
      let api
      if (id) {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/order/${id}`
      } else {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/orders/all`
      }
      this.$http.delete(api, { data: this.tempOrder })
        .then(response => {
          if (!response.data.success) {
            this.isLoading = false
            return
          }
          this.modal.hide()
          this.$emit('delete')
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
    }
  }
}
</script>
