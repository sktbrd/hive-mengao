<template>
  <q-page class="flex flex-center">
    <form id="app-form">
    <h4>Title: </h4>
    <input
      placeholder="Title of your post"
      v-model="title"
      @input="event => text = event.target.value">
    <a></a>
    <h4> POST:</h4>
    <input class="post-body"
      placeholder="some cool markdown content here"
      v-model="body"
      @input="event => text = event.target.value"
      v-on:click="submitForm">
    <q-btn class="q-btn" v-on:click="submitForm">Submit</q-btn>
    </form>

    <div class="title-render" v-if="title">
      <h2> {{ title }}</h2>
    </div>
    <div class="body-render" v-if="body">
      <p> {{ body }}</p>
    </div>

  </q-page>
</template>

<script>

export default {
  data () {
    return {
      title: '',
      body: '',
      hashtags: [],
      thumbnail: ''
    }
  },

  methods: {
    submitForm (e) {
      e.preventDefault()

      console.log(this.body)
      console.log(this.title)
    }
  }
}

</script>
