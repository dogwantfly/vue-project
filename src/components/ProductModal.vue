<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
       <div class="modal-dialog modal-xl">
         <div class="modal-content">
           <div class="modal-header bg-dark text-white">
             <h5 class="modal-title" id="exampleModalLabel">
               <span v-if="isNew">新增</span>
               <span v-else>編輯</span>產品
              </h5>
             <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <div class="row">
               <div class="col-sm-4">
                 <label for="imgUrl" class="form-label">圖片網址</label>
                 <input type="text" class="form-control mb-3" id="imgUrl" placeholder="https://picsum.photos/300/200" v-model="tempProduct.imgUrl">
                 <img :src="this.tempProduct.imgUrl" :alt="tempProduct.title" class="img-fluid">
               </div>
               <div class="col-sm-8">
                 <label for="title" class="form-label">標題</label>
                 <input type="text" class="form-control mb-3" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                 <div class="row mb-3">
                   <div class="col-sm-6">
                     <label for="category" class="form-label">分類</label>
                     <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                   </div>
                   <div class="col-sm-6">
                     <label for="unit" class="form-label">單位</label>
                     <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                   </div>
                 </div>
                 <div class="row mb-3">
                   <div class="col-sm-6">
                     <label for="origin_price" class="form-label">原價</label>
                     <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                   </div>
                   <div class="col-sm-6">
                     <label for="price" class="form-label">售價</label>
                     <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model.number="tempProduct.price">
                   </div>
                 </div>
                 <div class="row">
                   <div class="col-sm-6">
                     <label for="num" class="form-label">數量</label>
                     <input type="number" class="form-control" id="num" placeholder="請輸入數量" v-model="tempProduct.num">
                   </div>
                 </div>
                 <hr>
                 <label for="description" class="form-label">產品描述</label>
                 <textarea class="form-control mb-3" id="description" rows="3" placeholder="產品描述" v-model="tempProduct.description"></textarea>
                 <label for="content" class="form-label">說明內容</label>
                 <textarea class="form-control mb-3" id="content" rows="3" placeholder="說明內容" v-model="tempProduct.content"></textarea>
                 <input type="checkbox" name="" id="is_enabled" :checked="tempProduct.is_enabled" class="me-2" v-model="tempProduct.is_enabled">
                 <label for="is_enabled" class="form-label">是否啟用</label>
               </div>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
               <button type="button" class="btn btn-primary" v-on:click="updateProduct">確認</button>
             </div>
           </div>
         </div>
       </div>
     </div>
</template>
<script>
import axios from 'axios'
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-product', 'isNew'],
  template: '#productModal',
  data () {
    return {
      modal: null
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    // 更新資料
    updateProduct () {
      const id = this.tempProduct.id
      let api
      let httpMethod = 'post'
      if (this.tempProduct.origin_price < 0 || this.tempProduct.price < 0 || this.num < 0) {
        alert('價錢 / 數量不得為負數')
        return
      }
      if (id) {
        // 編輯商品
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/product/${id}`
        httpMethod = 'put'
      } else {
        // 建立新商品
        this.tempProduct.id = new Date().getTime()
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/product`
      }
      axios[httpMethod](api, { data: this.tempProduct })
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
  mounted () {
    // 建立 instance
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false
    })
  }
}
</script>
