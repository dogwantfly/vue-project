<template>
  <div class="modal fade" id="userProductModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ tempProduct.title }}
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="row row-cols-md-2">
          <img :src="tempProduct.imgUrl" alt="tempProduct.title" class="modal-img">
          <div>
            <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
            <p>商品描述：{{ tempProduct.description }}</p>
            <p>商品內容：{{ tempProduct.content }}</p>
            <div class="h5" v-if="!tempProduct.price">{{ tempProduct.origin_price }} 元</div>
            <del class="h6" v-if="tempProduct.price">原價 {{ tempProduct.origin_price }} 元</del>
            <div class="h5" v-if="tempProduct.price">現在只要 {{ tempProduct.price }} 元</div>
            <div>
              <div class="input-group">
                <input type="number" class="form-control"
                      v-model.number="qty" min="1">
                <button type="button" class="btn btn-primary"
                        @click="$emit('add-cart',tempProduct.id, qty, $event)">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-product'],
  template: '#userProductModal',
  data () {
    return {
      modal: null,
      qty: 1
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
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
