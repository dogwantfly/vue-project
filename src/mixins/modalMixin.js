import Modal from 'bootstrap/js/dist/modal';

export default {
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      focus: false,
    });
  },
};
