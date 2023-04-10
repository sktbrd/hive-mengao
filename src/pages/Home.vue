<template>
    <PostFeed></PostFeed>
</template>

<script>

import PostFeed from 'src/components/PostFeed.vue'

export default {
  name: 'HomePage',
  components: {
    PostFeed
  },
  data () {
    // Data properties to store the posts, search query, user, selected post, and post modal state
    return {
      posts: [],
      search: '',
      user: null,
      selectedPost: null,
      showPostModal: false
    }
  }
}
</script>
