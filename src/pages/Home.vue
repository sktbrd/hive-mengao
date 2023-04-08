<template>
  <!-- Load the custom CSS stylesheet for the component -->
  <head>
    <link rel="stylesheet" href="src/css/app.css">
  </head>

  <!-- Q-page component with padding -->
  <q-page padding>
    <!-- Display a welcome message to the user if logged in -->
    <div v-if="user">
      <h3> Hello {{ username }}, welcome to the revolution</h3>
    </div>
    <!-- Component to display the post modal, with props passed from the parent component -->
    <PostModal ref="postModal" :post="selectedPost" v-model="showPostModal" />
    <!-- Display the posts using the v-for directive to iterate through the posts array -->
    <div class="q-gutter-md q-matrix">
      <div v-for="(post, index) in posts" :key="index" class="q-col-xs-12 q-col-md-4 q-mb-md">
        <!-- Q-card component with an on-click event to show the post modal, and displaying the post information -->
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
    // Data properties to store the posts, search query, user, selected post, and post modal state
    return {
      posts: [],
      search: '',
      user: null,
      selectedPost: null,
      showPostModal: false
    }
  },
  mounted () {
    // Call the getPosts() method when the component is mounted
    this.getPosts()
  },
  computed: {
    // Computed property to return the username of the logged-in user
    username () {
      return this.user ? this.user.name : ''
    }
  },
  methods: {
    // Asynchronous method to fetch posts using the dhive client
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
    // Method to show the post modal and set the selected post
    showPost (post) {
      this.selectedPost = post
      this.showPostModal = true
      console.log(post.author)
      console.log(post.url)
    }
  }
}
</script>
