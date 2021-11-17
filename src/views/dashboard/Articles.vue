<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <header class="mb-5">
    <h1>文章管理</h1>
  </header>
  <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
    <button type="button" class="btn btn-primary mt-3" @click="openModal('new')">
      新增文章
    </button>
    <div class="input-group w-25 align-items-center border rounded-3">
      <div class="input-text px-3">
        <i class="bi bi-search"></i>
      </div>
      <input type="search" placeholder="搜尋文章名稱" class="form-control border-0" v-model.trim="articleSearchBar">
    </div>
    <div class="input-group w-auto align-items-center">
      <label for="sort" class="me-2">排序</label>
      <select class="form-select" aria-label="select" v-model="sortBy" id="sort">
        <option selected value="">新增日期由新到舊（預設）</option>
        <option value="postDateFromNewest">發佈日由新至舊</option>
        <option value="postDateFromOldest">發佈日由舊至新</option>
      </select>
    </div>
  </div>
  <div class="alert alert-danger border-0" v-if="articleSearchBar && searchResults">
    {{ searchResults }}
  </div>
  <ul class="nav nav-pills mb-3">
    <li class="nav-item">
      <a class="nav-link rounded-pill" :class="{'active': filterBy === ''}" href="#" @click.prevent="getArticles">
        所有文章
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded-pill" :class="{'active': filterBy === 'public'}" href="#" @click.prevent="filterData('public')">
        已發佈
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded-pill" href="#" :class="{'active': filterBy === 'private'}" @click.prevent="filterData('private')">
        未發佈
      </a>
    </li>
  </ul>
  <table class="table table-borderless table-hover">
    <thead class="bg-light rounded-3">
      <tr>
        <th scope="col">名稱</th>
        <th scope="col">作者</th>
        <th scope="col">發佈日期</th>
        <th scope="col" class="text-end">是否發佈</th>
        <th scope="col" class="text-end">編輯 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in articles" :key="item.id">
        <td scope="row">{{ item.title }}</td>
        <td scope="row">{{ item.author }}</td>
        <td>{{ $filters.date(item.create_at) }}</td>
        <td :class="item.isPublic  ? 'text-success' : 'text-muted'" class="text-end">{{ item.isPublic ? "已發佈" : "未發佈" }}</td>
        <td class="text-end">
          <div class="btn-group" role="group" aria-label="edit and delete button">
            <button type="button" class="btn btn-outline-secondary border-0 bi bi-pencil-fill" @click="getArticle(item.id)"></button>
            <button type="button" class="btn btn-outline-danger border-0 bi bi-trash-fill" @click="openModal('delete',item)"></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="text-center text-muted" v-if="filterBy !== '' && !articles.length">
    <span v-if="filterBy === 'private'">無未發佈文章</span>
    <span v-else-if="filterBy === 'public'">無已發佈文章</span>
  </p>
  <Pagination :pagination="pagination" @change-page="getArticles"/>
  <ArticleModal ref="articleModal" :is-new="isNew" :article="tempArticle" @update="getArticles"/>
  <DelItemModal :temp-article="tempArticle" ref="delItemModal" @delete="getArticles"/>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ArticleModal from '@/components/backend/ArticleModal.vue'
import DelItemModal from '@/components/backend/DelItemModal.vue'

export default ({
  components: {
    Pagination,
    ArticleModal,
    DelItemModal
  },
  inject: ['$httpMessageState'],
  data () {
    return {
      articles: '',
      tempArticle: '',
      pagination: {},
      loadingStatus: {},
      current_page: 1,
      isNew: false,
      isLoading: false,
      articleSearchBar: '',
      searchResults: '',
      sortBy: '',
      filterBy: '',
      originArticles: [],
      filtedArticles: '',
      sortedArticles: ''
    }
  },
  methods: {
    getArticles (page = this.current_page) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/articles?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得文章')
            this.isLoading = false
            return
          }
          this.articles = response.data.articles
          this.originArticles = response.data.articles
          this.pagination = response.data.pagination
          this.current_page = response.data.pagination.current_page
          this.matchArticles = ''
          this.filterBy = ''
          this.filtedArticles = ''
          if (this.articleSearchBar !== '') {
            this.searchArticles()
          }
          if (this.sortedArticles !== '') {
            this.sortArticles(this.sortBy)
          }
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getArticle (id) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得文章')
            this.isLoading = false
            return
          }
          this.openModal('edit', response.data.article)
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    openModal (action, item) {
      switch (action) {
        case 'new':
          this.isNew = true
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
          this.$refs.articleModal.$refs.form.resetForm()
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
    },
    searchArticles () {
      const matchArticles = this.articles.filter(article => article.title.toLowerCase().includes(this.articleSearchBar.toLowerCase()))
      if (matchArticles.length) {
        this.searchResults = ''
        this.articles = matchArticles
        if (this.sortedArticles) {
          this.sortArticles(this.sortBy)
        } else {
          this.sortBy = ''
          this.sortedArticles = ''
        }
        this.filterBy = ''
        this.filtedArticles = ''
        this.pagination = ''
      } else {
        this.searchResults = '無符合搜尋結果，請再試試其他關鍵字～'
      }
    },
    sortArticles (sortBy) {
      let articles = []
      this.pagination = ''
      if (this.filtedArticles) {
        articles = this.filtedArticles
      } else if (this.matchArticles) {
        articles = this.matchArticles
      } else {
        articles = this.originArticles
      }
      switch (sortBy) {
        case 'postDateFromNewest':
          articles.sort(function (a, b) {
            return b.create_at - a.create_at
          })
          break
        case 'postDateFromOldest':
          articles.sort(function (a, b) {
            return a.create_at - b.create_at
          })
          break
        default:
          break
      }
      this.sortedArticles = articles
      this.articles = this.sortedArticles
    },
    filterData (filterBy) {
      if (this.filterBy === filterBy) return
      this.pagination = ''
      this.filterBy = filterBy
      let articles = []
      if (this.matchArticles) {
        articles = this.matchArticles
      } else {
        articles = this.originArticles
      }
      switch (filterBy) {
        case 'public':
          this.filtedArticles = articles.filter(article => article.isPublic)
          break
        case 'private':
          this.filtedArticles = articles.filter(article => !article.isPublic)
          break
        default:
          break
      }
      if (this.sortedArticles) {
        this.sortArticles(this.sortBy)
      } else {
        this.articles = this.filtedArticles
      }
    }
  },
  watch: {
    sortBy (newSort, oldSort) {
      if (newSort === oldSort) {
        if (newSort !== '') {
          this.sortArticles()
        } else {
          this.getArticles()
        }
      } else if (newSort === '') {
        this.sortedArticles = ''
        this.getArticles()
      } else {
        this.sortArticles(newSort)
      }
    },
    articleSearchBar (newValue) {
      if (newValue !== '') {
        this.searchArticles()
      } else {
        this.getArticles()
      }
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getArticles()
  }
})
</script>
