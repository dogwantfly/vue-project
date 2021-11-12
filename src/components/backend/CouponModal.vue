<template>
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增</span>
            <span v-else>編輯</span>優惠券
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form @submit="updateCoupon" v-slot="{ errors }" ref="form">
            <p class="h6 text-warning d-inline-block">此區為必填項目</p>
            <div class="bg-light mb-3 rounded-3 p-3">
              <div class="mb-3">
                <label for="coupon_title" class="form-label">名稱</label>
                <Field
                  type="text"
                  class="form-control"
                  id="coupon_title"
                  placeholder="請輸入優惠券名稱"
                  v-model="tempCoupon.title"
                  :class="{ 'is-invalid': errors['名稱'], 'is-valid': tempCoupon.title }"
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
                <label for="coupon_code" class="form-label">代碼</label>
                <Field
                  type="text"
                  class="form-control"
                  id="coupon_code"
                  placeholder="請輸入優惠券代碼，例：123coupon"
                  v-model="tempCoupon.code"
                  :class="{ 'is-invalid': errors['代碼'], 'is-valid': tempCoupon.code }"
                  name="代碼"
                  rules="required"
                  required
                />
                <ErrorMessage
                  name="代碼"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3">
                <label for="coupon_percent" class="form-label">折扣</label>
                <Field
                  type="number"
                  class="form-control"
                  id="coupon_percent"
                  placeholder="請輸入優惠券折扣，例：80 表示為原價的 80%（8 折）"
                  v-model.number="tempCoupon.percent"
                  :class="{ 'is-invalid': errors['折扣'], 'is-valid': tempCoupon.percent }"
                  name="折扣"
                  rules="required"
                  required
                />
                <ErrorMessage
                  name="折扣"
                  class="invalid-feedback"
                />
              </div>
              <div class="mb-3">
                <label for="coupon_due_date" class="form-label">到期日</label>
                <input
                  type="date"
                  class="form-control"
                  id="coupon_due_date"
                  placeholder="請輸入優惠券到期日"
                  v-model="due_date"
                  :min="today"
                  required>
              </div>
            </div>
            <div class="mb-3">
              <input type="checkbox" id="is_enabled" :checked="tempCoupon.is_enabled"  class="me-2" :true-value="1" :false-value="0" v-model.number="tempCoupon.is_enabled">
              <label for="is_enabled" class="form-label" :class="tempCoupon.is_enabled ? 'text-success' : 'text-muted'">{{ tempCoupon.is_enabled ? '啟用' : '未啟用'}}</label>
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
  props: ['coupon', 'isNew'],
  emits: ['update'],
  template: '#couponModal',
  data () {
    return {
      modal: null,
      tempCoupon: {},
      due_date: '',
      today: '',
      isLoading: false
    }
  },
  inject: ['emitter'],
  mixins: [modalMixin],
  methods: {
    openModal () {
      if (this.isNew) {
        this.tempCoupon = {
          code: '',
          due_date: Math.floor(new Date(this.due_date) / 1000),
          id: '',
          is_enabled: 0,
          num: '',
          percent: '',
          title: ''
        }
        this.$refs.form.resetForm()
        const dateAndTime = new Date((this.tempCoupon.due_date + 8 * 3600) * 1000)
          .toISOString().split('T');
        [this.due_date] = dateAndTime
      } else {
        document.querySelectorAll('.is-valid').forEach((item) => {
          item.classList.remove('is-valid')
        })
      }
      this.modal.show()
    },
    updateCoupon () {
      this.isLoading = true
      const id = this.tempCoupon.id
      let api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupon`
      let httpMethod = 'post'
      let httpMethodStr = '新增'
      if (!this.isNew) {
        api = `/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${id}`
        httpMethod = 'put'
        httpMethodStr = '更新'
      }
      this.$http[httpMethod](api, { data: this.tempCoupon })
        .then(response => {
          if (!response.data.success) {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: `${httpMethodStr}失敗`,
              content: `${httpMethodStr}優惠券 ${this.tempCoupon.title} 失敗`
            })
            this.isLoading = false
            return
          }
          this.modal.hide()
          this.$emit('update')
          this.emitter.emit('push-message', {
            style: 'success',
            title: `${httpMethodStr}成功`,
            content: `${httpMethodStr}優惠券 ${this.tempCoupon.title} 成功`
          })
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = { ...this.coupon }
      const dateAndTime = new Date((this.tempCoupon.due_date + 8 * 3600) * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mounted () {
    const todayTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    this.today = todayTime
  }
}
</script>
