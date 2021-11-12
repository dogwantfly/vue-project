<template>
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="ariticleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增</span>
            <span v-else>編輯</span>文章
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form @submit="updateArticle" v-slot="{ errors }" ref="form">
            <div class="row">
              <div class="col-6">
                <p class="h6 text-warning d-inline-block">此區為必填項目</p>
                <div class="bg-light mb-3 rounded-3 p-3">
                  <div class="mb-3">
                    <label for="article_title" class="form-label">名稱</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="article_title"
                      placeholder="請輸入文章名稱"
                      v-model="tempArticle.title"
                      :class="{ 'is-invalid': errors['名稱'], 'is-valid': tempArticle.title }"
                      name="名稱"
                      rules="required"
                      required
                    />
                    <ErrorMessage
                      name="名稱"
                      class="invalid-feedback"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="article_author" class="form-label">作者</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="article_author"
                      placeholder="請輸入作者"
                      v-model="tempArticle.author"
                      :class="{ 'is-invalid': errors['作者'], 'is-valid': tempArticle.author }"
                      name="作者"
                      rules="required"
                      required
                    />
                    <ErrorMessage
                      name="作者"
                      class="invalid-feedback"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="article_create_at" class="form-label">發佈日期</label>
                    <input type="date" class="form-control" id="article_create_at" v-model="create_at" :min="today">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="article_description" class="form-label">文章簡述</label>
                  <textarea type="text" class="form-control" id="article_description" placeholder="請輸入文章簡要描述" v-model="tempArticle.description" style="height: 150px;"></textarea>
                </div>
                <div class="mb-3">
                  <label for="article_tags" class="form-label">標籤</label>
                  <div class="row g-3">
                    <div class="col-auto" v-for="(item, key) in tempArticle.tag" :key="`tag${key}`">
                      <div class="input-group border rounded-3">
                        <input type="text" class="form-control border-0" id="article_tags" placeholder="請輸入標籤" v-model="tempArticle.tag[key]">
                        <button type="button" class="btn btn-outline-danger border-0 bi bi-trash" @click="deleteTag(key)"></button>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button type="button" class="btn btn-outline-primary" @click="addTag">新增標籤</button>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <p>是否要發佈</p>
                  <input type="checkbox" id="article_isPublic" :checked="tempArticle.isPublic" class="me-2" :true-value="true" :false-value="false" v-model="tempArticle.isPublic">
                  <label for="article_isPublic" class="form-label" :class="tempArticle.isPublic ? 'text-success' : 'text-muted'">{{ tempArticle.isPublic ? '發佈' : '未發佈' }}</label>
                </div>
              </div>
              <div class="col-6">
                <label for="article_image" class="form-label">主要圖片</label>
                <input type="text" class="form-control mb-3" id="article_image" placeholder="請輸入圖片連結，例：http://xxx" v-model="tempArticle.image">
                <label for="customFile" class="form-label">或 上傳圖片
                  <div class="spinner-border spinner-border-sm" role="status" v-if="loadingUploadImg">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </label>
                <input type="file" id="customFile" class="form-control mb-3" ref="fileInput" @change="uploadImg">
                <img :src="tempArticle.image" :alt="tempArticle.title" class="img-fluid mb-3">
              </div>
            </div>
            <p v-if="!tempArticle.content" class="text-warning">請輸入文章內容（必填）</p>
            <CKEditor
              :editor="editor"
              :config="editorConfig"
              v-model="tempArticle.content"
            />
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="Object.keys(errors).length !== 0 || !tempArticle.content">確認</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import modalMixin from '@/mixins/modalMixin'
import MyUploadAdapter from '@/methods/myUploadAdapter'

export default {
  props: ['article', 'isNew'],
  emits: ['update'],
  template: '#articleModal',
  inject: ['emitter', '$httpMessageState'],
  data () {
    return {
      modal: null,
      tempArticle: {},
      create_at: '',
      today: '',
      loadingUploadImg: false,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', '|', 'uploadImage', 'link', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo'],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
          ]
        },
        link: {
          addTargetToExternalLinks: true
        },
        extraPlugins: [this.uploader]
      }
    }
  },
  components: {
    CKEditor: CKEditor.component
  },
  mixins: [modalMixin],
  methods: {
    openModal () {
      if (this.isNew) {
        this.tempArticle = {
          author: '',
          title: '',
          id: '',
          image: '',
          description: '',
          content: '',
          create_at: Math.floor(Date.now() / 1000),
          isPublic: false,
          tag: ['']
        }
        this.create_at = ''
        this.$refs.form.resetForm()
        const dateAndTime = new Date((this.tempArticle.create_at + 8 * 3600) * 1000).toISOString().split('T');
        [this.create_at] = dateAndTime
      } else {
        document.querySelectorAll('.is-valid').forEach((item) => {
          item.classList.remove('is-valid')
        })
      }
      this.modal.show()
    },
    updateArticle () {
      this.isLoading = true
      const id = this.tempArticle.id
      let api = `/api/${process.env.VUE_APP_APIPATH}/admin/article`
      let httpMethod = 'post'
      let httpMethodStr = '新增'
      if (!this.isNew) {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`
        httpMethod = 'put'
        httpMethodStr = '更新'
      }
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then(response => {
          if (!response.data.success) {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: `${httpMethodStr}失敗`,
              content: `${httpMethodStr}文章 ${this.tempArticle.title} 失敗`
            })
            this.isLoading = false
            return
          }
          this.modal.hide()
          this.$emit('update')
          this.emitter.emit('push-message', {
            style: 'success',
            title: `${httpMethodStr}成功`,
            content: `${httpMethodStr}文章 ${this.tempArticle.title} 成功`
          })
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    addTag () {
      if (!this.tempArticle.tag) {
        this.tempArticle.tag = []
      }
      this.tempArticle.tag.push('')
    },
    deleteTag (key) {
      this.tempArticle.tag.splice(key, 1)
    },
    uploader (editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
      }
    },
    uploadImg () {
      this.loadingUploadImg = true
      const uploadedFile = this.$refs.fileInput.files[0]
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
          this.tempArticle.image = response.data.imageUrl
          this.loadingUploadImg = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.loadingUploadImg = false
        })
    }
  },
  watch: {
    article () {
      this.tempArticle = {
        ...this.article,
        isPublic: this.article.isPublic || false
      }
      const dateAndTime = new Date((this.tempArticle.create_at + 8 * 3600) * 1000).toISOString().split('T');
      [this.create_at] = dateAndTime
    },
    create_at () {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  mounted () {
    const todayTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    this.today = todayTime
  }
}
</script>
