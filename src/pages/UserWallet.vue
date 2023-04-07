<template>
  <q-page>
    <div v-if="user">
      <p>Hello {{ user.name }}</p><br>
      <p>You have {{ user.balance }} and {{ user.hbd_balance }} in your Hive wallet</p>
    </div>
    <div v-if="connectedWallet">
      <p>ETH balance: {{ ethbalance }}</p>
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
    const connectedWallet = localStorage.getItem('connectedWallet')
    const ethbalance = localStorage.getItem('ethbalance')
    console.log(user.hbd_balance)
    return {
      user,
      connectedWallet,
      ethbalance
    }
  }
})
</script>
