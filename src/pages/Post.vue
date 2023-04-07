<template>
  <q-page padding>
    <div v-if="user">
      <h3> Hello {{ user.name }}, welcome to the revolution</h3>
    </div>
    <div class="q-gutter-md q-matrix">
      <router-link v-for="(row, index) in rows" :key="index" :to="{ name: 'post', params: { post: row } }" class="q-col-xs-12 q-col-md-4 q-mb-md">
        <q-card>
          <div style="height: 150px; overflow: hidden;">
            <img :src="'https://images.ecency.com/u/hive-173115/avatar/large'" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <q-card-section>
            <q-item-label lines="1">{{ row.author }}</q-item-label>
            <q-item-label lines="1" header>{{ row.title }}</q-item-label>
          </q-card-section>
        </q-card>
      </router-link>
    </div>
  </q-page>
</template>

<script>
import getDhive from 'boot/dhive'
import router from '@/router'

export default {
  name: 'AppAdmin',
  data () {
    return {
      rows: [],
      search: '',
      user: null
    }
  },
  mounted () {
    this.getPosts()
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
      this.rows = posts
      console.log(posts)
      console.log(query)
      // const json = JSON.parse(posts.json_metadata)
      // console.log(json)
    },
    searchItems () {
      console.log('install search')
    }
  },
  router
}
</script>

<style scoped>
.q-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 16px;
}

@media only screen and (min-width: 768px) {
  .q-matrix {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
}
</style>
