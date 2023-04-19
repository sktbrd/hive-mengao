<template>
  <div>
    <div>
      <center>
        <h2>Connect with ETH</h2>
        <q-btn class='btn-nav' @click="connectWallet">Connect Wallet</q-btn>
      </center>
      <div v-if="connectedWallet" class="greeting">
        <hr>
        <p>Hello user <b>{{ connectedWallet }}</b></p>
        <p>Your ETH balance is <b>{{ ethbalance }}</b>.</p>
        <q-btn @click="isConnectedHandle">Disconnect Wallet</q-btn>
      </div>
      <div v-else class="greeting">
        <p>You are not connected to an Ethereum wallet</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useLoginEth } from 'src/composables/loginEth'

export default defineComponent({
  name: 'LoginETH',

  setup () {
    const { connectedWallet, ethbalance, connectWallet, isConnectedHandle } = useLoginEth()

    return {
      connectedWallet,
      ethbalance,
      connectWallet,
      isConnectedHandle
    }
  }
})
</script>
