<template>
  <!-- Q-dialog component to display the post modal -->
  <q-dialog v-model="showPost" position="top">
    <!-- Q-card component to display the content of the modal -->
    <q-card class="q-pa-md" style="max-width: 800px;">
      <!-- Q-card-section component to contain the post content -->
      <q-card-section>
        <!-- Q-item-label component to display the post author -->
        <q-item-label>
          {{ post.author }}
        </q-item-label>
        <!-- div element to display the post body -->
        <div
              v-if="post.body"
              class="text-body2 q-mt-sm"
              v-html="marked(post.body)"
              style="word-wrap: break-word;"
            />
      </q-card-section>
      <!-- Q-card-actions component to contain the modal actions -->
      <q-card-actions align="right">
        <!-- Q-btn component to close the modal -->
        <q-btn label="Close" color="primary" @click="handleClose" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'Post-modal',
  props: {
    // Boolean prop to control the display of the modal
    modelValue: {
      type: Boolean,
      required: true
    },
    // Object prop containing the post data to display
    post: {
      type: Object,
      required: false
    }
  },
  data () {
    // Data property to store the current state of the modal
    return {
      showPost: this.modelValue
    }
  },
  watch: {
    // Watcher to update the modal state when the prop changes
    modelValue (value) {
      this.showPost = value
    }
  },
  computed: {
    // Computed property to return the marked function from the marked library
    marked () {
      return marked
    },
    // Computed property to parse and return the hashtags from the post body
    hashtagArray () {
      return this.hashtags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '')
    }
  },
  methods: {
    handleClose () {
      console.log('Close button clicked')
    }
  }
}

</script>
