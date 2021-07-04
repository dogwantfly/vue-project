<template>
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true" ref="modal">
       <div class="modal-dialog modal-xl">
         <div class="modal-content">
           <div class="modal-header bg-dark text-white">
             <h5 class="modal-title" id="exampleModalLabel">
               <span v-if="isNew">新增</span>
               <span v-else>編輯</span>文章
              </h5>
             <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <!-- 套用文章 -->
              <div class="mb-3">
                <label for="article_title" class="form-label">名稱</label>
                <input type="text" class="form-control" id="article_title" placeholder="請輸入文章名稱" v-model="tempArticle.title">
              </div>
              <!-- <div class="mb-3">
                <label for="coupon_code" class="form-label">代碼</label>
                <input type="text" class="form-control" id="coupon_code" placeholder="請輸入優惠券代碼，例：123coupon" v-model="tempCoupon.code">
              </div> -->
              <!-- <div class="mb-3">
                <label for="coupon_percent" class="form-label">折扣</label>
                <input type="text" class="form-control" id="coupon_percent" placeholder="請輸入優惠券折扣，例：80 表示為原價的 80%（8 折）" v-model.number="tempCoupon.percent">
              </div> -->
              <!-- <div class="mb-3">
                <label for="coupon_due_date" class="form-label">到期日</label>
                <input type="date" class="form-control" id="coupon_due_date" placeholder="請輸入優惠券到期日" v-model="due_date" :min="today">
              </div> -->
              <!-- <div class="mb-3">
                <input type="checkbox" name="" id="is_enabled" :checked="tempCoupon.is_enabled" class="me-2" :true-value="1" :false-value="0" v-model.number="tempCoupon.is_enabled">
                <label for="is_enabled" class="form-label">{{tempCoupon.is_enabled ? '啟用' : '未啟用' }}</label>
              </div> -->
             <!-- <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
               <button type="button" class="btn btn-primary" v-on:click="updateCoupon">確認</button>
             </div> -->
             <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
           </div>
         </div>
       </div>
     </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  props: ['article', 'isNew'],
  template: '#articleModal',
  data () {
    return {
      modal: null,
      tempArticle: {},
      editorData: '<p>Content of the editor.</p>',
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    // 建立、更新文章
    updateArticle () {
      const id = this.tempArticle.id
      let api = `/api/${process.env.VUE_APP_APIPATH}/admin/article`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempArticle })
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
  watch: {
    coupon () {
      this.tempArticle = { ...this.article }
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
