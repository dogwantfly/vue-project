<template>
<!-- https://dribbble.com/shots/15137093--Notifications-New-Countly-UI -->
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
      <span
        :class="`bg-${message.style}`"
        class="p-2 rounded me-2 d-inline-block"
      ></span>
      <strong class="me-auto">{{ message.title }}</strong>
      <!-- <small class="text-muted">just now</small> -->
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ message.content }}
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
