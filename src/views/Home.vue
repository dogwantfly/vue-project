<template>
  <Loading :active="isLoading" :z-index="100" :loader="'dots'" :color="'#384D48'"/>
  <ToastMessages/>
  <Navbar/>
  <router-view/>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.min.js'
import $httpMessageState from '@/methods/pushMessageState'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'
import Navbar from '@/components/front/Navbar.vue'

export default {
  data () {
    return {
      isLoading: false
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
    Navbar
  }
}
</script>
