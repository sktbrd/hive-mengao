<template>
  <!-- Q-page component with padding -->
  <q-page padding>
    <!-- Component to display the post modal, with props passed from the parent component -->
    <PostModal ref="postModal" :post="selectedPost" v-model="showPostModal" @update:modelValue="showPostModal = $event" />
    <!-- Display the posts using the v-for directive to iterate through the posts array -->
    <div class="q-gutter-md q-matrix">
      <div v-for="(post, index) in posts" :key="index" class="q-col-xs-12 q-col-md-4 q-mb-md">
        <!-- Q-card component with an on-click event to show the post modal, and displaying the post information -->
        <q-card @click="showPost(post)" class="cursor-pointer">
          <div style="height: 150px; overflow: hidden;">
            <img :src="post.thumbnail" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <q-card-section>
            <q-avatar class="avatar-overlay">
              <img :src="getAuthorAvatar(post.author)" class="avatar-img" />
            </q-avatar>
            <q-item-label lines="1">{{ post.author }}</q-item-label>
            <q-item-label lines="5" header>{{ post.title }}</q-item-label>
            <q-btn flat icon="done" @click.stop="likePost(post)" class="q-ml-sm right" label="Vote"/>
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
  name: 'PostFeed',
  components: {
    PostModal
  },
  data () {
    // Data properties to store the posts, search query, user, selected post, and post modal state
    return {
      posts: [],
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
      const dhiveClient = new dhive.Client([
        'https://api.hive.blog',
        'https://api.hivekings.com',
        'https://anyx.io',
        'https://api.openhive.network'
      ])
      const query = {
        tag: 'skatehive',
        limit: 30
      }
      const posts = await dhiveClient.database.getDiscussions('created', query)
      this.posts = posts.map((post) => {
        const json = JSON.parse(post.json_metadata)
        const thumbnail = json.image && json.image.length > 0 ? json.image[0] : ''
        return {
          ...post,
          thumbnail
        }
      })
    },
    getAuthorAvatar (author) {
      return 'https://images.ecency.com/webp/u/' + author + '/avatar/small'
    },
    // Method to show the post modal and set the selected post
    showPost (post) {
      this.selectedPost = post
      this.showPostModal = true
      console.log(post.author)
      console.log(post.url)
      console.log(post)
    },
    likePost (post) {
      // Handle the like action here
      console.log('Liked post:', post)
    }
  }
}
</script>

<style scoped>
.avatar-overlay {
  position: relative;
  margin-top: -50px; /* Adjust this value to achieve the desired overlap */
  z-index: 1;
  box-shadow: 0 0 10px 3px rgba(4, 3, 2, 0.5); /* Add a golden glow */
}

.q-card {
  position: relative;
  z-index: 0;
  border-radius: 10%;
}
</style>
