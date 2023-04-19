import Web3 from 'web3'
import { ref } from 'vue'

export function useLoginEth () {
  const connectedWallet = ref(localStorage.getItem('connectedWallet'))
  const ethbalance = ref(localStorage.getItem('ethbalance'))

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        const connectedWalletValue = accounts[0]
        console.log('Connected to wallet with address:', connectedWalletValue)

        // Store the connected wallet address in local storage
        localStorage.setItem('connectedWallet', connectedWalletValue)

        // Get the ETH balance of the connected wallet
        const ethbalanceValue = await web3.eth.getBalance(connectedWalletValue)
        const ethbalanceFormatted = web3.utils.fromWei(ethbalanceValue, 'ether')
        localStorage.setItem('ethbalance', ethbalanceFormatted)

        // Update the connectedWallet and ethbalance values
        connectedWallet.value = connectedWalletValue
        ethbalance.value = ethbalanceFormatted
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('No web3 provider detected')
    }
  }

  const isConnectedHandle = () => {
    // Disconnect the user's wallet
    if (window.ethereum && window.ethereum.disconnect) {
      window.ethereum.disconnect()
    }

    // Clear the connectedWallet and ethbalance values
    connectedWallet.value = null
    ethbalance.value = null
    localStorage.removeItem('connectedWallet')
    localStorage.removeItem('ethbalance')
  }

  return {
    connectedWallet,
    ethbalance,
    connectWallet,
    isConnectedHandle
  }
}
