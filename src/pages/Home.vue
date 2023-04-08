<template>
  <head>
  <link rel="stylesheet" href="src/css/app.css">
</head>

  <q-page padding>
    <div v-if="user">
      <h3> Hello {{ username }}, welcome to the revolution</h3>
    </div>
    <PostModal ref="postModal" :post="selectedPost" :modelValue="showPostModal" />
    <div class="q-gutter-md q-matrix">
      <div v-for="(post, index) in posts" :key="index" class="q-col-xs-12 q-col-md-4 q-mb-md">
        <q-card @click="showPost(post)" class="cursor-pointer">
          <div style="height: 150px; overflow: hidden;">
            <img :src="'https://images.ecency.com/u/hive-173115/avatar/large'" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <q-card-section>
            <q-item-label lines="1">{{ post.author }}</q-item-label>
            <q-item-label lines="1" header>{{ post.title }}</q-item-label>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <PostModal ref="postModal" :post="selectedPost" v-model="showPostModal" />
  </q-page>
</template>

<script>
import PostModal from 'src/components/PostModal.vue'
import getDhive from 'boot/dhive'

export default {
  name: 'HomePage',
  components: {
    PostModal
  },
  data () {
    return {
      posts: [],
      search: '',
      user: null,
      selectedPost: null,
      showPostModal: false
    }
  },
  mounted () {
    this.getPosts()
  },
  computed: {
    username () {
      return this.user ? this.user.name : ''
    }
  },
  methods: {
    async getPosts () {
      const { dhive } = getDhive()
      const dhiveClient = new dhive.Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
      const query = {
        tag: 'skatehive',
        limit: 100
      }
      const posts = await dhiveClient.database.getDiscussions('created', query)
      this.posts = posts
    },
    showPost (post) {
      this.selectedPost = post
      this.showPostModal = true
      console.log(post.author)
      console.log(post.url)
    }
  }
}
</script>
