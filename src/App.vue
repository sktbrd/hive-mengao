<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import frames from 'src/assets/frames.js'

export default defineComponent({
  name: 'App',
  mounted () {
    this.animateConsole()
  },
  methods: {
    animateConsole () {
      let frameIndex = 0

      function animateFrames () {
        // console.clear()
        // console.log(frames[frameIndex])
        frameIndex = (frameIndex + 1) % frames.length
        setTimeout(animateFrames, 250)
      }

      animateFrames()
    }
  }
})

</script>
<style>
  @import 'src/css/app.css';
</style>
