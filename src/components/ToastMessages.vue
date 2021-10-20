<template>
  <div class="toast-container">
    <Toast v-for="(message, key) in messages" :key="`Toast${key}`" :message="message"/>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'

export default ({
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  components: {
    Toast
  },
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style, title, content } = message
      this.messages.push({ style, title, content })
    })
  },
  unmounted () {
    this.emitter.off('push-message', (message) => {})
  }
})
</script>
