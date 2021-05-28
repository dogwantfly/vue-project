<template>
  <div class="home text-center">
    <HelloWorld msg="這是前台首頁"/>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Index',
  components: {
    HelloWorld
  }
}
</script>
