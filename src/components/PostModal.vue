<template>
  <q-dialog v-model="showPost" position="top">
    <q-card class="q-pa-md" style="max-width: 800px;">
      <q-card-section>
        <q-item-label>
          {{ post.author }}
        </q-item-label>
        <div
              v-if="post.body"
              class="text-body2 q-mt-sm"
              v-html="marked(post.body)"
              style="word-wrap: break-word;"
            />

      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'Post-modal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showPost: this.modelValue
    }
  },
  watch: {
    modelValue (value) {
      this.showPost = value
    }
  },
  computed: {
    marked () {
      return marked
    },
    hashtagArray () {
      return this.hashtags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '')
    }
  }
}

</script>
