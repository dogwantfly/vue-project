<template>
  <Loading :active="isLoading" :z-index="100"/>
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增</span>
            <span v-else>編輯</span>產品
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form @submit="updateProduct" v-slot="{ errors }" ref="form">
            <div class="row">
              <div class="col-sm-3 product-modal-pictures">
                <label class="form-label h6">
                  新增主圖
                  <span class="text-warning ms-3">必填</span>
                </label>
                <div class="form-group mb-3 bg-light p-3 rounded-3">
                  <label for="imageUrl" class="form-label">輸入主圖片網址</label>
                  <Field
                    type="text"
                    class="form-control mb-3"
                    id="imageUrl"
                    placeholder="https://picsum.photos/300/200" v-model="product.imageUrl"
                    :class="{ 'is-invalid': errors['圖片'], 'is-valid': product.imageUrl }"
                    name="圖片"
                    rules="required"
                    required
                  />
                  <ErrorMessage
                    name="圖片"
                    class="invalid-feedback"
                  />
                  <label for="customFile" class="form-label">或 上傳圖片
                    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingUploadImg === 'e'">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </label>
                  <input type="file" id="customFile" class="form-control mb-3" @change="uploadImg($event)">
                  <img :src="this.product.imageUrl" :alt="product.title" class="img-fluid mb-3">
                </div>
                <div class="form-group mb-3">
                  <label class="form-label h6">新增多圖</label>
                  <template v-for="(image, key) in product.imagesUrl" :key="key">
                    <div class="mb-3 pb-3 border-bottom">
                      <label :for="`imagesUrl${key}`" class="form-label small">輸入圖片網址</label>
                      <div class="input-group mb-3">
                        <input type="text" v-model="product.imagesUrl[key]" :id="`imagesUrl${key}`" class="form-control">
                        <button class="btn btn-outline-danger" type="button" id="button-addon2" @click="removeImage(key)">移除</button>
                      </div>
                      <label :for="`customFile${key}`" class="form-label small">或 上傳圖片
                        <div class="spinner-border spinner-border-sm" role="status" v-if="loadingUploadImg === `${key}`">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </label>
                      <input type="file" :id="`customFile${key}`" class="form-control mb-3" @change="uploadImg($event)">
                      <p v-if="!product.imagesUrl[key]" class="text-muted">請輸入圖片網址或上傳圖片！</p>
                      <img :src="this.product.imagesUrl[key]" :alt="product.title + key" class="img-fluid">
                    </div>
                  </template>
                </div>
                <div v-if="Array.isArray(product.imagesUrl)">
                  <button type="button" class="w-100 mb-3 btn btn-outline-primary" v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]" @click="createImage">
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-9">
                <p class="h6 text-warning d-inline-block">此區為必填項目</p>
                <div class="bg-light mb-3 rounded-3 p-3">
                  <label for="title" class="form-label">標題</label>
                  <Field
                    type="text"
                    class="form-control mb-3"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="product.title"
                    :class="{ 'is-invalid': errors['標題'], 'is-valid': product.title }"
                    name="標題"
                    rules="required"
                    required
                  />
                  <ErrorMessage
                    name="標題"
                    class="invalid-feedback mb-3"
                  />
                  <div class="row mb-3">
                    <div class="col-sm-6">
                      <label for="category" class="form-label">分類</label>
                      <Field
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請輸入分類"
                        v-model="product.category"
                        :class="{ 'is-invalid': errors['分類'], 'is-valid': product.category }"
                        name="分類"
                        rules="required"
                      />
                      <ErrorMessage
                        name="分類"
                        class="invalid-feedback"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="unit" class="form-label">單位</label>
                      <Field
                        type="text"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入單位"
                        v-model="product.unit"
                        :class="{ 'is-invalid': errors['單位'], 'is-valid': product.unit }"
                        rules="required"
                        name="單位"
                      />
                      <ErrorMessage
                        name="單位"
                        class="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <Field
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入原價"
                        v-model.number="product.origin_price"
                        name="原價"
                        :class="{ 'is-invalid': errors['原價'], 'is-valid': product.origin_price }"
                        rules="required"
                      />
                      <ErrorMessage
                        name="原價"
                        class="invalid-feedback"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="price" class="form-label">售價</label>
                      <Field
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="請輸入售價"
                        v-model.number="product.price"
                        name="售價"
                        :class="{ 'is-invalid': errors['售價'], 'is-valid': product.price }"
                        rules="required"
                      />
                      <ErrorMessage
                        name="售價"
                        class="invalid-feedback"
                      />
                    </div>
                  </div>
                </div>
                <div class="bg-light mb-3 rounded-3 p-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea class="form-control mb-3" id="content" rows="3" placeholder="說明內容" v-model="product.content"></textarea>
                  <label for="description" class="form-label">產品描述</label>
                  <textarea class="form-control mb-3" id="description" rows="3" placeholder="產品描述" v-model="product.description"></textarea>
                  <input type="checkbox" id="is_enabled" :checked="product.is_enabled" class="me-2" v-model="product.is_enabled">
                  <label for="is_enabled" class="form-label">是否啟用</label>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="Object.keys(errors).length !== 0">確認</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: ['temp-product', 'isNew'],
  template: '#productModal',
  data () {
    return {
      modal: null,
      isLoading: false,
      product: {
        category: '',
        id: '',
        imageUrl: '',
        imagesUrl: [],
        is_enabled: 0,
        num: '',
        origin_price: '',
        price: '',
        title: '',
        unit: ''
      },
      loadingUploadImg: false
    }
  },
  emits: ['update'],
  inject: ['emitter', '$httpMessageState'],
  mixins: [modalMixin],
  methods: {
    openModal () {
      if (this.isNew) {
        this.product = {
          category: '',
          id: '',
          imageUrl: '',
          imagesUrl: [],
          is_enabled: 0,
          num: '',
          origin_price: '',
          price: '',
          title: '',
          unit: ''
        }
        this.$refs.form.resetForm()
      } else {
        document.querySelectorAll('.is-valid').forEach((item) => {
          item.classList.remove('is-valid')
        })
      }
      this.modal.show()
    },
    updateProduct () {
      this.isLoading = true
      const id = this.tempProduct.id
      let api
      let httpMethod = 'post'
      let httpMethodStr = '新增'
      if (this.tempProduct.origin_price < 0 || this.tempProduct.price < 0 || this.num < 0) {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: `${httpMethodStr}失敗`,
          content: '價錢 / 數量不得為負數'
        })
        return
      }
      if (id) {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/product/${id}`
        httpMethod = 'put'
        httpMethodStr = '更新'
      } else {
        this.tempProduct.id = new Date().getTime()
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/product`
      }
      this.$http[httpMethod](api, { data: this.product })
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, `${httpMethodStr}產品`)
            this.isLoading = false
            return
          }
          this.modal.hide()
          this.$emit('update')
          this.$httpMessageState(response, `${httpMethodStr}產品`)
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    uploadImg (e) {
      const id = e.target.id
      const key = id.split('')[id.length - 1]
      this.loadingUploadImg = key
      const uploadedFile = e.target.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/upload`
      this.$http.post(api, formData)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '上傳圖片')
            this.loadingUploadImg = false
            return
          }
          if (isNaN(key)) {
            this.product.imageUrl = response.data.imageUrl
          } else {
            this.product.imagesUrl[key] = response.data.imageUrl
          }
          this.loadingUploadImg = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.loadingUploadImg = false
        })
    },
    createImage () {
      this.product.imagesUrl.push('')
    },
    removeImage (key) {
      this.product.imagesUrl.splice(key, 1)
    }
  },
  watch: {
    tempProduct (item) {
      this.product = item
    }
  }
}
</script>
