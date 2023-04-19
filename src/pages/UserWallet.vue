<template>
  <q-page>
    <div v-if="user">
      <p>Hello {{ user.name }}</p><br>
      <p>You have {{ user.balance }} and {{ user.hbd_balance }} in your Hive wallet</p>
      <button v-if="user" @click="login">Disconnect Hive</button>
    </div>
    <div v-if="connectedWallet">
      <p>ETH balance: {{ ethbalance }}</p>
      <button v-if="user" @click="login">Disconnect ETH</button>
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
    console.log(user)
    const connectedWallet = localStorage.getItem('connectedWallet')
    const ethbalance = localStorage.getItem('ethbalance')
    console.log(user.hbd_balance)
    console.log(user.name)
    return {
      user,
      connectedWallet,
      ethbalance
    }
  }
})
</script>
