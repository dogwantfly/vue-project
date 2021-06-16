<template>
  <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true" ref="modal">
       <div class="modal-dialog modal-xl">
         <div class="modal-content">
           <div class="modal-header bg-dark text-white">
             <h5 class="modal-title" id="exampleModalLabel">
               訂單細節
              </h5>
             <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <div class="row">
               <div class="col-sm-4">
                 <h3>用戶資料</h3>
                 <table class="table">
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th scope="row">姓名</th>
                      <td> {{tempOrder.user.name}} </td>
                    </tr>
                    <tr>
                      <th scope="row">電話</th>
                      <td>{{tempOrder.user.tel}}</td>
                    </tr>
                    <tr>
                      <th scope="row">地址</th>
                      <td>{{tempOrder.user.address}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{{tempOrder.user.email}}</td>
                    </tr>
                  </tbody>
                </table>
               </div>
               <div class="col-sm-8">
                 <h3>訂單細節</h3>
                 <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">訂單日期</th>
                      <td> {{ new Date(tempOrder.create_at * 1000).toLocaleString() }} </td>
                    </tr>
                    <tr>
                      <th scope="row">訂單編號</th>
                      <td>{{tempOrder.id}}</td>
                    </tr>
                    <tr>
                      <th scope="row">總金額</th>
                      <td>$ {{tempOrder.total}}</td>
                    </tr>
                  </tbody>
                </table>
                 <h3>訂單品項</h3>
                 <table class="table">
                  <tbody v-if="tempOrder.products">
                    <tr v-for="product in tempOrder.products" :key="product.id">
                      <th scope="row">{{ product.product.title }} *  {{ product.qty }}</th>
                      <td> {{ product.total }} </td>
                    </tr>
                  </tbody>
                </table>
                <h3>付款狀態</h3>
                 <input type="checkbox" name="" id="is_paid" :checked="tempOrder.is_paid" class="me-2" v-model="tempOrder.is_paid">
                 <label for="is_paid" class="form-label">{{ tempOrder.is_paid ? '已付款' : '未付款'}}</label>
               </div>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
               <button type="button" class="btn btn-primary" v-on:click="updateOrder">確認</button>
             </div>
           </div>
         </div>
       </div>
     </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp-order'],
  template: '#orderModal',
  data () {
    return {
      modal: null
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    // 更新訂單
    updateOrder () {
      const id = this.tempOrder.id
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/order/${id}`
      this.$http.put(api, { data: this.tempOrder })
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
