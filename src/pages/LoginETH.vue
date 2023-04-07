<template>
  <div class="container">
    <div class="content">
      <h1>Connect Wallet</h1>
      <div class="button-container">
        <button @click="connectWallet">Connect Wallet</button>
        <div v-if="connectedWallet" class="greeting">
          <p>Hello user {{ connectedWallet }}. </p>
          <p>Your ETH balance is {{ ethbalance }}. </p>
        </div>
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
    }
  }
}
</script>
