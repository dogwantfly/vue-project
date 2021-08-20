<template>
  <div class="container">
    <div>
      這裏是部落格
    </div>
    <ul>
      <li class="card mb-3" v-for="article in articles" :key="article.id">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="article.image" :alt="article.title" class="img-fluid">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">{{ }}</p>
              <p class="card-text"><small class="text-muted">{{ new Date((article.create_at + 8 * 3600) * 1000)
          .toISOString().split('T')[0] }}</small></p>
              <router-link :to="`/blog/${article.id}`" class="btn btn-primary stretched-link">查看內文</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: ''
    }
  },
  methods: {
    // 取得文章列表
    getArticles (page = 1) {
      const api = `/api/${process.env.VUE_APP_APIPATH}/articles?page=${page}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.articles = response.data.articles
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getArticles()
  }
}
</script>
