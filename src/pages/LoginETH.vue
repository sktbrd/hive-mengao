<template>
  <div>
      <div>
        <center>
            <h2>Connect with ETH</h2>
            <button @click="connectWallet">Connect Wallet</button>
        </center>
          <div v-if="connectedWallet" class="greeting">
          <hr>
          <p>Hello user <b>{{ connectedWallet }}</b> </p>
          <p>Your ETH balance is <b>{{ ethbalance }}</b>. </p>
        </div>
        <div v-else class="greeting">
            <q-btn @click="isConnectedHandle" >Disconnect Wallet</q-btn>
        </div>
        </div>
      </div>
</template>

<script>

import Web3 from 'web3'

export default {
  name: 'LoginETH',
  data () {
    return {
      connectedWallet: localStorage.getItem('connectedWallet'),
      ethbalance: localStorage.getItem('ethbalance')
    }
  },
  methods: {
    async connectWallet () {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum)
          const accounts = await web3.eth.getAccounts()
          const connectedWallet = accounts[0]
          console.log('Connected to wallet with address:', connectedWallet)

          // Store the connected wallet address in local storage
          localStorage.setItem('connectedWallet', connectedWallet)

          // Get the ETH balance of the connected wallet
          const ethbalance = await web3.eth.getBalance(connectedWallet)
          const ethbalanceFormatted = web3.utils.fromWei(ethbalance, 'ether')
          localStorage.setItem('ethbalance', ethbalanceFormatted)
          // Log the ETH balance to the console
          console.log('ETH balance:', ethbalanceFormatted)

          // Emit an event to update the title and caption of the link list
          this.$emit('update-title-and-caption', {
            title: 'My Wallet',
            caption: connectedWallet
          })

          // Update the data properties
          this.connectedWallet = connectedWallet
          this.ethbalance = ethbalanceFormatted
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error('No web3 provider detected')
      }
    },
    isConnectedHandle () {
      this.connectedWallet = !this.connectWallet
    }
  }
}
</script>
