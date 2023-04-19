<template>
  <!-- Q-page component with padding -->
  <q-page>
    <!-- Component to display the post modal, with props passed from the parent component -->
    <PostModal ref="postModal" :post="selectedPost" v-model="showPostModal" @update:modelValue="showPostModal = $event" />
    <!-- Display the posts using the v-for directive to iterate through the posts array -->
    <div>
      <br>
      </div>
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
            <q-btn flat icon="done" @click.stop="likePost()" class="q-ml-sm" label="Vote"/>
          </q-card-section>
        </q-card>
        <div v-if="showPost" class="post-feed"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostModal from 'src/components/PostModal.vue'
import getDhive from 'boot/dhive'
import isLoggedIn from 'src/pages/LoginPage.vue'
import hiveuser from 'src/layouts/MainLayout.vue'

export default {
  name: 'PostFeed',
  components: {
    PostModal
  },
  props: {
    hiveuser: Object,
    tag: {
      type: String,
      default: 'skatehive'
    }
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
      return isLoggedIn.value ? this.hiveuser.name : ''
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
        tag: this.tag,
        limit: 69
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
      console.log(hiveuser.name)
      console.log(post.author)
      console.log(post.url)
      console.log(post)
    },
    likePost () {
      console.log('vote')
    },
    catch (error) {
      console.error('Vote error:', error)
    }
  }
}

</script>
