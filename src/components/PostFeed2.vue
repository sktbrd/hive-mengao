<template>
  <!-- Q-page component with padding -->
  <q-page padding>
    <!-- Component to display the post modal, with props passed from the parent component -->
    <PostModal ref="postModal" :post="selectedPost" v-model="showPostModal" @update:modelValue="showPostModal = $event" />
    <!-- Display the posts using the v-for directive to iterate through the posts array -->
    <div class="q-gutter-md q-matrix grid-container">
      <div class="daily-drop-card">
        <q-card>
          <!-- Add content for the daily drop card here -->
        </q-card>
      </div>
      <div class="q-col-xs-12 q-col-md-6 q-mb-md big-card">
        <q-card>
          <!-- Add content for the bigger squared card here -->
        </q-card>
      </div>
      <div class="q-col-xs-12 q-col-md-6 q-mb-md regular-cards">
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
              <q-btn flat icon="done" @click.stop="likePost(post, hiveuser)" class="q-ml-sm right" label="Vote"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostModal from 'src/components/PostModal.vue'
import getDhive from 'boot/dhive'
import isLoggedIn from 'src/pages/LoginPage.vue'
import hiveuser from 'src/layouts/MainLayout.vue'
import { useQuasar } from 'quasar'

export default {
  name: 'PostFeed2',
  components: {
    PostModal
  },
  props: {
    hiveuser: Object
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
        tag: 'skatehive',
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
    likePost (post) {
      // Get dhive object and user from useAuthUser
      const { dhive } = getDhive()
      console.log(hiveuser.name)
      const $q = useQuasar()

      if (!hiveuser) {
        alert('Please log in first')
        return
      }

      const voter = $q.sessionStorage.getItem('user').name// The username of the account making the vote (the voter)
      console.log(voter)
      // Request the posting private key using Hive Keychain
      if (!window.hive_keychain) {
        alert('Please install Hive Keychain first')
        return
      }

      window.hive_keychain.requestSignBuffer(voter, '', 'Posting', async (response) => {
        if (response.error) {
          console.error('Error:', response.message)
          return
        }

        try {
          // Create the private key object
          const privateKey = dhive.PrivateKey.fromString(response.result)

          // Post information
          const author = post.author // The author of the post that the voter is voting on
          const permlink = post.permlink // The unique identifier of the post

          // Vote weight
          const weight = 10000 // 100% upvote, adjust as needed

          // Create the vote object
          const vote = {
            voter,
            author,
            permlink,
            weight
          }

          // Broadcast the vote
          const result = await dhive.broadcast.vote(vote, privateKey)
          console.log('Vote success:', result)
          console.log('Liked post:', post)
          console.log(post.author)
        } catch (error) {
          console.error('Error:', error)
        }
      })
    },
    catch (error) {
      console.error('Vote error:', error)
    }
  }
}

</script>

<style>
/* Add new CSS for the daily drop card, big card, and regular cards */
.grid-container {
display: grid;
grid-template-columns: 40% 1fr;
grid-gap: 20px;
}

.daily-drop-card {
grid-column: 1 / 2;
grid-row: 1 / 4;
}

.big-card {
grid-column: 2 / 3;
grid-row: 1 / 2;
height: 300px;
}

.regular-cards {
grid-column: 3 / 4;
grid-row: 1 / 4;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 16px;
}

</style>
