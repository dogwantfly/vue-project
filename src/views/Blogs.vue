<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="banner">
    <div class="container h-100 d-flex align-items-center justify-content-center">
      <h1>
        關於樂器我們可以了解
      </h1>
    </div>
  </div>
  <div class="articles">
    <div class="container py-5">
      <ul class="row">
        <li class="col-lg-12 mb-3 border-0 mb-5 card" v-if="articles.length">
          <div class="row g-0">
            <div class="col-md-7">
              <img :src="articles[0].image" :alt="articles[0].title" class="img-fluid">
            </div>
            <div class="col-md-5 d-flex align-items-center">
              <div class="card-body">
                <h2 class="card-title mb-5">{{ articles[0].title }}</h2>
                <p class="card-text">{{ articles[0].description }}</p>
                <p class="card-text"><small class="text-muted">{{ new Date((articles[0].create_at + 8 * 3600) * 1000)
            .toISOString().split('T')[0] }}</small></p>
                <router-link :to="`/blog/${articles[0].id}`" class="btn btn-link stretched-link btn-zindex ps-0">
                  查看內文
                  <i class="bi bi-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </li>
        <li class="col-md-6 col-lg-4 card mb-3 border-0" v-for="article in articles.slice(1)" :key="article.id">
          <div class="ratio ratio-4x3">
            <img :src="article.image" :alt="article.title" class="img-fluid card-img">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text text-truncate">{{ article.description }}</p>
            <p class="card-text"><small class="text-muted">{{ new Date((article.create_at + 8 * 3600) * 1000)
        .toISOString().split('T')[0] }}</small></p>
            <router-link :to="`/blog/${article.id}`" class="btn btn-link stretched-link btn-zindex ps-0">
              查看內文
              <i class="bi bi-chevron-right"></i>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: '',
      isLoading: false
    }
  },
  inject: ['$httpMessageState'],
  methods: {
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
          this.isLoading = false
        })
        .catch(error => {
          this.$httpMessageState(error, '連線錯誤')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getArticles()
  }
}
</script>
