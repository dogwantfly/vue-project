<template>
  <Loading :active="isLoading"/>
  <h1>文章頁面</h1>
  <button type="button" class="btn btn-primary mt-3" v-on:click="openModal('new')">
      新增文章
  </button>
  <table class="table">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">作者</th>
          <th scope="col">發佈日期</th>
          <th scope="col">是否發佈</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in articles" v-bind:key="item.id">
          <td scope="row">{{ item.title }}</td>
          <td scope="row">{{ item.author }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td v-bind:class="{ 'text-success': item.isPublic}">{{ item.isPublic ? "已發佈" : "未發佈" }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-warning" v-on:click="getArticle(item.id)">編輯</button>
              <button type="button" class="btn btn-danger" v-on:click="openModal('delete',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  <!-- 分頁 -->
  <Pagination :pagination="pagination" @change-page="getArticles"/>
  <!-- articleModal -->
  <ArticleModal ref="articleModal" :is-new="isNew" :article="tempArticle" @update="getArticles"/>
  <!-- DelItemModal   -->
  <DelItemModal :temp-article="tempArticle" ref="delItemModal" @delete="getArticles"/>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ArticleModal from '@/components/ArticleModal.vue'
import DelItemModal from '@/components/DelItemModal.vue'
export default ({
  components: {
    Pagination,
    ArticleModal,
    DelItemModal
  },
  data () {
    return {
      articles: '',
      tempArticle: '',
      pagination: {},
      loadingStatus: {},
      current_page: 1,
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    // 取得文章列表
    getArticles (page = this.current_page) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/articles?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.isLoading = false
            return
          }
          this.articles = response.data.articles
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
    },
    getArticle (id) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.isLoading = false
            return
          }
          this.openModal('edit', response.data.article)
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
    },
    // 開啟編輯、刪除、查看更多
    openModal (action, item) {
      switch (action) {
        case 'new':
          this.isNew = true
          this.tempArticle = {
            author: '',
            id: '',
            image: '',
            description: '',
            content: '',
            create_at: Math.floor(Date.now() / 1000),
            isPublic: false,
            tag: ['']
          }
          setTimeout(() => {
            this.$refs.articleModal.openModal()
          })
          break
        case 'edit':
          this.isNew = false
          this.tempArticle = JSON.parse(JSON.stringify(item))
          setTimeout(() => {
            this.$refs.articleModal.openModal()
          })
          break
        case 'delete':
          this.tempArticle = { ...item }
          this.$refs.delItemModal.openModal()
          break
      }
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    // 取商品資料
    this.getArticles()
  }
})
</script>
