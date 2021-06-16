<template>
  <div>
    這裏是部落格
  </div>
</template>
<script>
// @ is an alias to /src
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
