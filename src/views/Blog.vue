<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="article container mt-5 py-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/blogs">部落格</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <img :src="article.image" :alt="article.title" class="img-fluid w-100 mb-5">
    <h1 class="border-bottom pb-3">
      {{ article.title }}
    </h1>
    <div class="d-md-flex justify-content-between mb-5 text-muted fs-5">
      <div class="mb-3">
        <small class="d-block">作者： {{ article.author }}</small>
        <small class="d-block">發布日期：<time>{{ $filters.date(article.create_at) }}</time></small>
      </div>
      <div class="d-flex align-items-center">
        <small class="me-3">
          分享此文章
        </small>
        <ul class="d-flex gap-3 mb-0">
          <li>
            <a href="#" class="bi bi-share-fill text-muted" @click.prevent></a>
          </li>
          <li>
            <a href="#" class="bi bi-facebook text-muted" @click.prevent></a>
          </li>
          <li>
            <a href="#" class="bi bi-instagram text-muted" @click.prevent></a>
          </li>
          <li>
            <a href="#" class="bi bi-twitter text-muted" @click.prevent></a>
          </li>
        </ul>
      </div>
    </div>
    <article class="article-content" v-html="article.content"></article>
    <template v-for="tag in article.tag" :key="tag">
      <a href="#" class="badge d-inline-block me-2 mb-5" @click.prevent>
        #{{ tag }}
      </a>
    </template>
    <div class="d-md-flex text-center justify-content-md-between p-5 border" v-if="articleIndex !== undefined">
      <template v-if="articleIndex - 1 >= 0">
         <a href="#" class="btn btn-link articles-link btn-zindex ps-0 text-start" @click.prevent="changeArticlePage(articleIndex - 1)">
          <i class="bi bi-chevron-left"></i>
          上一篇：
          {{ articles[articleIndex - 1].title }}
        </a>
      </template>
      <template v-if="articleIndex + 1 < articles.length">
        <a href="#" class="btn btn-link articles-link btn-zindex ps-0 text-start" @click.prevent="changeArticlePage(articleIndex + 1)">
          下一篇：
          {{ articles[articleIndex + 1].title }}
          <i class="bi bi-chevron-right"></i>
        </a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: '',
      isLoading: false,
      articles: '',
      articleIndex: 0
    }
  },
  inject: ['$httpMessageState', 'emitter'],
  methods: {
    getArticle () {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/article/${this.$route.params.blogId}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得文章')
            this.isLoading = false
            return
          }
          this.article = response.data.article
          this.getArticles()
          setTimeout(() => {
            const image = document.querySelector('.article-content img')
            const links = document.querySelectorAll('.article-content a')
            if (image) {
              image.classList.add('img-fluid')
            }
            if (links.length) {
              links.forEach(link => {
                link.classList.add('text-success', 'fw-bold')
              })
            }
            this.isLoading = false
          })
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    getArticles (page = 1) {
      this.isLoading = true
      const api = `/api/${process.env.VUE_APP_APIPATH}/articles?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) {
            this.$httpMessageState(response, '取得文章')
            this.isLoading = false
            return
          }
          this.articles = response.data.articles
          this.articleIndex = this.articles.filter(article => article.id === this.article.id)[0].num - 1
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    },
    changeArticlePage (index) {
      this.$router.push({ path: `/blog/${this.articles[index].id}` })
      setTimeout(() => {
        this.getArticle()
      })
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getArticle()
    console.log(this.$router)
  }
}
</script>
