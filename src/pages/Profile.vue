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
        <q-tab name="logout" label="logout" icon="logout" @click="logout" />
      </q-tabs>
    </div>
    <h1> {{ hiveuserName }}</h1>
    <PostFeed :tag="'coletivoxv'"></PostFeed>
    <div>
      <q-btn flat icon="back" class="settings-btn" @click="$router.push('/settings')">Settings</q-btn>
    </div>
  </q-page>
</template>
<script>
import PostModal from 'src/components/PostModal.vue'
import PostFeed from 'src/components/PostFeed.vue'
import { useQuasar } from 'quasar'

export default {
  name: 'Profile-page',
  components: {
    PostModal,
    PostFeed
  },
  props: {
    username: {
      type: String,
      required: true
    }
  },
  setup () {
    const $q = useQuasar()
    const hiveuser = $q.sessionStorage.getItem('user')
    const hiveuserName = hiveuser.name
    console.log(hiveuserName)
    return {
      hiveuser,
      hiveuserName
    }
  },
  data () {
    return {
      posts: [],
      selectedPost: null,
      showPostModal: false
    }
  },
  methods: {
    showPost (post) {
      this.selectedPost = post
      this.showPostModal = true
    },
    getAuthorAvatar () {
    },
    logout () {
    // do the necessary actions to log out the user, for example:
    // clear the session storage, remove authentication tokens, etc.
    // then navigate to the login page
      this.$router.push('/login')
      sessionStorage.set('user', null)
      console.log('logout')
    }
  },
  computed: {
    tag () {
      return this.hiveuserName
    }
  }
}
</script>
