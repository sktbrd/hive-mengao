<template>
  <div>
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="username">
    <button @click="login">Log in with Hive Keychain</button>
    <div v-if="isLoggedIn">Logged in as {{ username }}</div>
  </div>
</template>

<script>
import getDhive from 'boot/dhive'

export default {
  data () {
    return {
      username: '',
      isLoggedIn: false
    }
  },
  methods: {
    async login () {
      if (!window.hive_keychain) {
        alert('You have to install Hive KeyChain in the Webstore or in AppStore')
        return
      }

      if (!this.username) {
        alert('Please enter your username')
        return
      }

      try {
        const { dhive } = getDhive()
        const dhiveClient = new dhive.Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
        const memo = this.username + Date.now()
        await window.hive_keychain.requestSignBuffer(this.username, memo, 'Posting', (response) => {
          if (response.success === true) {
            const publicKey = response.publicKey
            dhiveClient.keys.getKeyReferences([publicKey]).then((val) => {
              const accountName = val.accounts[0][0]
              if (accountName === this.username) {
                const sig = dhive.Signature.fromString(response.result)
                const key = dhive.PublicKey.fromString(publicKey)
                if (key.verify(dhive.cryptoUtils.sha256(memo), sig) === true) {
                  this.isLoggedIn = true
                } else {
                  console.log('error')
                }
              } else {
                console.log('Public Key and Username dont match')
              }
            })
          }
        })
      } catch (error) {
        console.log('Error:', error)
      }
    }
  }
}
</script>
