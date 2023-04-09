<template>
  <q-page class="q-pa-md">
    <div class="row no-gutters justify-center">
      <div class="col-lg-6 col-md-8 col-sm-10">
        <q-card class="q-pa-md">
          <q-card-section>
            <q-form @submit="submitForm">
              <q-input
                filled
                v-model="title"
                label="Title"
                class="q-my-md"
              />
              <q-input
                filled
                v-model="body"
                label="Post Body (Markdown)"
                type="textarea"
                class="q-my-md"
              />
              <q-input
                filled
                v-model="thumbnail"
                label="Thumbnail URL"
                class="q-my-md"
              />
              <q-input
                filled
                v-model="hashtags"
                label="Hashtags (separated by commas)"
                class="q-my-md"
              />
              <q-btn type="submit" class="q-mt-md" label="Submit" />
              <input
              ref="fileInput"
              type="file"
              style="display: none;"
              @change="handleFileInput"
            />
            <q-btn
              color="amber"
              glossy
              type="button"
              class="q-mt-md"
              label="Upload Video"
              @click="$refs.fileInput.click()"
            />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-8 col-sm-10">
        <q-card class="q-pa-md" v-if="title || body">
          <q-card-section>
            <div v-if="title" class="text-h2">{{ title }}</div>
            <div
              v-if="body"
              class="text-body2 q-mt-sm"
              v-html="marked(body)"
              style="word-wrap: break-word;"
            />
            <div class="row no-gutters q-mt-md">
              <div
                v-for="tag in hashtagArray"
                :key="tag"
                class="q-pa-xs bg-grey-1 text-grey-8 rounded-borders"
                style="margin-right: 8px;"
              >
                #{{ tag }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { marked } from 'marked'

export default {
  data () {
    return {
      title: '',
      body: '',
      hashtags: '',
      thumbnail: ''
    }
  },
  methods: {
    submitForm () {
      // submit form
    },
    handleFileInput (event) {
      const filePath = event.target.value
      console.log('Selected file:', filePath)
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
