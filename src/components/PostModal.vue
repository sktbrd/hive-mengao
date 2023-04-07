<template>
  <q-dialog v-model="showPost" position="top">
    <q-card class="q-pa-md">
      <q-card-section>
        <q-item-label>
          This is a blank container.
        </q-item-label>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Post-modal',
  props: {
    modelValue: {
      type: Boolean,
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
  }
}
</script>
