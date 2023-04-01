<template>
  <div class="container">
    <div class="content">
      <h1>Connect Wallet</h1>
      <div class="button-container">
        <button @click="connectWallet">Connect Wallet</button>
        <div v-if="connected" class="greeting">
          Hello user {{ connectedWallet }}
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
      connected: false,
      connectedWallet: null
    }
  },
  methods: {
    async connectWallet () {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum)
          const accounts = await web3.eth.getAccounts()
          this.connected = true
          this.connectedWallet = accounts[0]
          console.log('Connected to wallet with address:', accounts[0])
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

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.greeting {
  margin-top: 20px;
}
</style>
