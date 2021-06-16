<template>
  <div class="modal fade" id="delOrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">刪除訂單</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定要刪除編號：<span class="fw-bold"> {{ tempOrder.id }} </span> 訂單嗎？ （刪除後即無法恢復）</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteOrder">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-order'],
  template: '#delOrderModal',
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
    deleteOrder () {
      const id = this.tempOrder.id
      if (id) {
        const api = `/api/${process.env.VUE_APP_APIPATH}/admin/order/${id}`
        this.$http.delete(api, { data: this.tempOrder })
          .then(response => {
            if (!response.data.success) return
            this.modal.hide()
            this.$emit('delete')
          })
          .catch(error => {
            console.log(error)
          })
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
