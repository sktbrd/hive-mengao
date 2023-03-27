<template>
  <q-page padding>
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
      rows: []

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
    }
  }
}
</script>
