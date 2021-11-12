<template>
  <div class="toast align-items-center" :class="`border-${message.style}`" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center" :class="`text-${message.style}`">
        <i class="bi fs-3 me-3" :class="message.style === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'"></i>
        {{ message.content || message.title }}
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast'

export default ({
  data () {
    return {
      toast: ''
    }
  },
  props: ['message'],
  mounted () {
    const ToastEl = this.$refs.toast
    this.toast = new Toast(ToastEl, {
      delay: 6000
    })
    this.toast.show()
  }
})
</script>
