<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <ToastMessages/>
  <Navbar/>
  <router-view/>
  <Footer/>
  <div class="pe-3 pb-3 position-fixed end-0 bottom-0" v-if="isShowed">
    <button type="button" class="btn btn-secondary rounded-circle" @click="scrollToTop">
      <i class="bi bi-arrow-bar-up fs-4"></i>
    </button>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.min.js'
import $httpMessageState from '@/methods/pushMessageState'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'
import Navbar from '@/components/front/Navbar.vue'
import Footer from '@/components/front/Footer.vue'

export default {
  data () {
    return {
      isLoading: false,
      isShowed: false
    }
  },
  provide () {
    return {
      $httpMessageState,
      emitter
    }
  },
  components: {
    ToastMessages,
    Navbar,
    Footer
  },
  methods: {
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    handleScroll () {
      const rootElement = document.documentElement
      const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
      if ((rootElement.scrollTop / scrollTotal) > 0.10) {
        this.isShowed = true
      } else {
        this.isShowed = false
      }
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
