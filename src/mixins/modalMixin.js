import Modal from 'bootstrap/js/dist/modal'

export default {
  mounted () {
    // 建立 instance
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      focus: false
    })
  }
}
