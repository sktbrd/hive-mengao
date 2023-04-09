import { ref } from 'vue'
import getDhive from 'boot/dhive'
import { SessionStorage } from 'quasar'

const user = ref(null)

export default function useAuthUser () {
  const { dhive } = getDhive()

  const login = async ({ username }) => {
    if (!window.hive_keychain) {
      alert('Please install Hive Keychain first')
      return
    }

    if (!username) {
      alert('Please enter your username')
      return
    }
    return new Promise((resolve, reject) => {
      try {
        const dhiveClient = new dhive.Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
        const memo = username + Date.now()
        window.hive_keychain.requestSignBuffer(username, memo, 'Posting', (response) => {
          if (response.success === true) {
            const publicKey = response.publicKey
            dhiveClient.keys.getKeyReferences([publicKey]).then((val) => {
              const accountName = val.accounts[0][0]
              if (accountName === username) {
                const sig = dhive.Signature.fromString(response.result)
                const key = dhive.PublicKey.fromString(publicKey)
                if (key.verify(dhive.cryptoUtils.sha256(memo), sig) === true) {
                  dhiveClient.database.getAccounts([accountName]).then(
                    (val2) => {
                      SessionStorage.set('user', val2[0])
                      resolve(true)
                    }
                  )
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
    })
  }

  const logout = async () => {
    sessionStorage.set('user', null)
    console.log('logout')
  }

  const isLoggedIn = () => {
    console.log(user)
    return !!user.value
  }
  return {
    user,
    login,
    logout,
    isLoggedIn
  }
}
