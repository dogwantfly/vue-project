<template>
  <Loading :active="isLoading" :z-index="1080" :loader="'dots'" :color="'#384D48'"/>
  <div class="container">
    <h1>
      {{ article.title }}
    </h1>
    <img :src="article.image" :alt="article.title" class="img-fluid w-100">
    <div class="d-flex justify-content-between">
      <small>作者： {{ article.author }}</small>
      <small>發布日期：<time>{{ $filters.date(article.create_at) }}</time></small>
    </div>
    <article class="article" v-html="article.content"></article>
    <template v-for="tag in article.tag" :key="tag">
      <a href="#" class="badge d-inline-block me-2">
        #{{ tag }}
      </a>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: '',
      isLoading: false
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
          setTimeout(() => {
            const image = document.querySelector('.article img')
            const links = document.querySelectorAll('.article a')
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
    }
  },
  mounted () {
    console.log(this.$route.params.blogId)
    this.$http.defaults.baseURL = process.env.VUE_APP_API
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
  .article img{
    width: 100%;
  }
  .badge {
    background-color: rgb(51, 51, 51);
    color: #fff;
    &:hover {
      background-color: rgb(214, 214, 214);
      color: rgb(43, 43, 43);
    }
  }
</style>
