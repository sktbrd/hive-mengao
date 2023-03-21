<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ user.name }}</p><br>
      <p>you have {{ user.balance }} Hive in your wallet</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const $q = useQuasar()
    const user = $q.sessionStorage.getItem('user')
    return {
      user
    }
  }
})
</script>
