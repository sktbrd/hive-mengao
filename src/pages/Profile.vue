<template>
  <q-page>
    <!-- Component to display the post modal, with props passed from the parent component -->
    <PostModal ref="postModal" :post="selectedPost" v-model="showPostModal" @update:modelValue="showPostModal = $event" />
    <!-- Display the posts using the v-for directive to iterate through the posts array -->
    <div class="banner-wrapper">
      <img class="banner" src="https://via.placeholder.com/1200x200" alt="Banner Placeholder" />
        <q-avatar class="avatar-overlay">
          <img :src="getAuthorAvatar(post)" class="avatar-img" />
        </q-avatar>
        <q-item-label lines="1">{{ post && post.author }}</q-item-label>
      <q-tabs v-model="selectedTab" align="center" class="profile-nav">
        <q-item-label class="username">{{ username }}</q-item-label>
        <q-tab name="blog" label="Blog" icon="description" />
        <q-tab name="nfts" label="NFTs" icon="layers" />
        <q-tab name="videos" label="Videos" icon="ondemand_video" />
        <q-tab name="wallet" label="Wallet" icon="account_balance_wallet" />
      </q-tabs>
    </div>
    <div class="q-gutter-md q-matrix">
      <div v-for="(post, index) in posts" :key="index" class="q-col-xs-12 q-col-md-4 q-mb-md">
        <q-card @click="showPost(post)" class="cursor-pointer">
          <div style="height: 150px; overflow: hidden;">
            <img :src="post.thumbnail" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <q-card-section>
            <q-item-label lines="5" header>{{ post.title }}</q-item-label>
            <q-btn flat icon="done" @click.stop="likePost(post)" class="q-ml-sm right" label="Vote" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div>
      <q-btn flat icon="back" class="settings-btn" @click="$router.push('/settings')">Settings</q-btn>
    </div>
  </q-page>
</template>

<script>
import PostModal from 'src/components/PostModal.vue'
import getDhive from 'boot/dhive'

export default {
  name: 'Profile-page',
  components: {
    PostModal
  },
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      posts: [],
      selectedPost: null,
      showPostModal: false
    }
  },
  async mounted () {
    const { dhive } = getDhive()
    const dhiveClient = new dhive.Client([
      'https://api.hive.blog',
      'https://api.hivekings.com',
      'https://anyx.io',
      'https://api.openhive.network'
    ])
    const query = {
      tag: 'web-gnar',
      limit: 20
    }
    const posts = await dhiveClient.database.getDiscussions('blog', query)
    this.posts = posts.map((post) => {
      const json = JSON.parse(post.json_metadata)
      const thumbnail = json.image && json.image.length > 0 ? json.image[0] : ''
      return {
        ...post,
        thumbnail
      }
    })
  },
  methods: {
    showPost (post) {
      this.selectedPost = post
      this.showPostModal = true
    },
    getAuthorAvatar () {
    }
  },
  computed: {
  }
}
</script>
