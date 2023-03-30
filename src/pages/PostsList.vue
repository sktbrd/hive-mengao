<template>
  <q-page padding>
    <div v-if="user">
      <h3> Hello {{ user.name }}, welcome to the revolution</h3>
    </div>
    <div class="row">
      <q-table
        dense
        title="Posts"
        :rows="rows"
        :columns="columns"
        row-key="id"
        class="col"
        separator="cell"
      >
      </q-table>
    </div>
    <div class="container">
      <q-page-container
      title= "Posts"
      ></q-page-container>
    </div>
  </q-page>
</template>

<script>
import getDhive from 'boot/dhive'

export default {
  name: 'AppAdmin',
  data () {
    return {
      columns: [
        {
          name: 'author',
          label: 'Author',
          align: 'left',
          field: 'author',
          sortable: true
        },
        {
          name: 'title',
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true
        }
      ],
      rows: [],
      search: ''

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
      console.log('instalar busca')
    }
  }
}

</script>
