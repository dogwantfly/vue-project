<template>
  <Loading :active="isLoading"/>
  <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">
            訂單細節
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="p-3 bg-light rounded-3">
                <h3 class="h5">用戶資料</h3>
                <table class="table">
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th scope="row">姓名</th>
                      <td> {{ tempOrder.user.name }} </td>
                    </tr>
                    <tr>
                      <th scope="row">電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th scope="row">地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="p-3 bg-light rounded-3 mb-4">
                <h3 class="h5">訂單資訊</h3>
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">訂單日期</th>
                      <td> {{ $filters.date(tempOrder.create_at) }} </td>
                    </tr>
                    <tr>
                      <th scope="row">訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">總金額</th>
                      <td>$ {{ tempOrder.total }}</td>
                    </tr>
                    <tr v-if="tempOrder.is_paid">
                      <th scope="row">付款時間</th>
                      <td> {{ new Date(tempOrder.paid_date * 1000).toLocaleString() }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="p-3 bg-light rounded-3 mb-4">
                <h3 class="h5">訂單品項</h3>
                <table class="table">
                  <tbody v-if="tempOrder.products">
                    <tr v-for="product in tempOrder.products" :key="product.id">
                      <th scope="row">{{ product.product.title }}</th>
                      <td> x  {{ product.qty }} </td>
                      <td> ${{ $filters.currency(product.total) }} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 class="h5">付款狀態</h3>
              <input type="checkbox" name="" id="is_paid" :checked="tempOrder.is_paid" class="me-2" v-model="tempOrder.is_paid">
              <label for="is_paid" class="form-label" :class="tempOrder.is_paid ? 'text-success' : 'text-muted'">{{ tempOrder.is_paid ? '已付款' : '未付款' }}</label>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: ['temp-order'],
  emits: ['update'],
  inject: ['$httpMessageState'],
  template: '#orderModal',
  data () {
    return {
      modal: null,
      isLoading: false
    }
  },
  mixins: [modalMixin],
  methods: {
    openModal () {
      this.modal.show()
    },
    updateOrder () {
      this.isLoading = true
      const id = this.tempOrder.id
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/order/${id}`
      this.$http.put(api, { data: this.tempOrder })
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '修改訂單')
            this.isLoading = false
            return
          }
          this.modal.hide()
          this.$emit('update')
          this.$httpMessageState(response, '修改訂單')
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  }
}
</script>
