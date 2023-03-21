<template>
    <div v-html="post">
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import getDhive from 'boot/dhive'
import { marked } from 'marked'

export default defineComponent({
  name: 'IndexPage',

  data () {
    return {
      post: ''
    }
  },

  mounted () {
    this.getPost()
  },

  methods: {
    async getPost () {
      const { dhive } = getDhive()
      const dhiveClient = new dhive.Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
      const location = useRoute().fullPath.split('/')
      const permlink = location.pop()
      const author = location.pop().replace('@', '')
      const result = await dhiveClient.database.call('get_content', [author, permlink])
      console.log(result)
      this.post = marked.parse(result.body)
      console.log(result.body)
      // this.post = result.body
    }
  }

})
</script>
