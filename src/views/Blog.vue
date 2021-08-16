<template>
  <div>
    文章內文
  </div>
  <article class="article" v-html="article.content"></article>
</template>

<script>
export default {
  data () {
    return {
      article: ''
    }
  },
  methods: {
    getArticle () {
      const api = `/api/${process.env.VUE_APP_APIPATH}/article/${this.$route.params.blogId}`
      this.$http.get(api)
        .then(response => {
          if (!response.data.success) return
          this.article = response.data.article
          setTimeout(() => {
            const image = document.querySelector('.article img')
            if (image) {
              image.classList.add('img-fluid')
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    console.log(this.$route.params.blogId)
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getArticle()
  }
}
</script>

<style scoped>
  .article img{
    width: 100%;
  }
</style>
