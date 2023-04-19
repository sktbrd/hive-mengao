<template>
  <q-page>
    <div class="container q-pa-md">
      <div class="row q-gutter-md">
        <div class="col-md-6 col-sm-12">
          <q-card>
            <q-card-section class="q-pa-md">
              <div class="row">
                <div class="col-auto">
                  <q-avatar
                    size="64px"
                    icon="mdi-view-dashboard"
                    color="indigo"
                    text-color="white"
                  >
                    <img src="https://cryptologos.cc/logos/hive-blockchain-hive-logo.png" alt="Hive Avatar" />
                  </q-avatar>
                </div>
                <div class="col">
                  <div class="text-h6">Hive Wallet</div>
                  <hr class="q-ma-sm">
                  <div class="text-subtitle1">Balance: {{ user.balance }}</div>
                  <div class="text-subtitle1">HBD Balance: {{ user.hbd_balance }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-6 col-sm-12">
          <q-card>
            <q-card-section class="q-pa-md">
              <div class="row">
                <div class="col-auto">
                  <q-avatar
                    size="64px"
                    icon="mdi-currency-eth"
                    color="grey-8"
                    text-color="white"
                  >
                    <img src="https://cdn.freebiesupply.com/logos/large/2x/ethereum-1-logo-png-transparent.png" alt="Ethereum Avatar" />
                  </q-avatar>
                </div>
                <div class="col">
                  <div class="text-h6">Ethereum Wallet</div>
                  <hr class="q-ma-sm">
                  <div class="text-subtitle1">ETH Balance: {{ ethbalance }}</div>
                  <div class="text-subtitle1">{{ usdBalanceEth }} USD</div>
                  <q-btn
                    class="q-mt-sm btn-disconnect"
                    color="negative"
                    v-if="user"
                    @click="login"
                  >
                    Disconnect ETH
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-gutter-md">
        <div class="col-md-12">
          <div class="nft-section">
            <h2 class="text-h5">NFTs (Ethereum)</h2>
            <!-- Add your NFT component(s) here -->
          </div>
        </div>
      </div>

      <div class="row q-gutter-md q-mt-md">
        <div class="col-md-6 offset-md-3">
          <q-card>
            <q-card-section class="q-pa-md">
              <div class="text-h6">Total Balance</div>
              <hr class="q-ma-sm">
              <div class="text-subtitle1">{{ totalUsdBalance }} USD</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

export default defineComponent({
  name: 'WalletPage',

  setup () {
    const $q = useQuasar()
    const user = $q.sessionStorage.getItem('user')
    const connectedWallet = localStorage.getItem('connectedWallet')
    const ethbalance = localStorage.getItem('ethbalance')

    const usdToEth = ref(null)
    const usdToHive = ref(null)

    const getExchangeRates = async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=hive%2Cethereum&vs_currencies=usd')
      usdToHive.value = response.data.hive.usd
      usdToEth.value = response.data.ethereum.usd
    }

    // Fetch exchange rates on component mount
    getExchangeRates()

    const usdBalanceEth = computed(() => {
      if (usdToEth.value !== null) {
        return (ethbalance.value * usdToEth.value).toFixed(2)
      } else {
        return null
      }
    })

    const usdBalanceHive = computed(() => {
      if (usdToHive.value !== null) {
        return (user.balance * usdToHive.value).toFixed(2)
      } else {
        return null
      }
    })

    const totalUsdBalance = computed(() => {
      if (usdToEth.value !== null && usdToHive.value !== null) {
        const ethBalance = parseFloat(usdBalanceEth.value)
        const hiveBalance = parseFloat(usdBalanceHive.value)
        return (ethBalance + hiveBalance).toFixed(2)
      } else {
        return null
      }
    })

    // Watch for changes in connectedWallet and ethbalance and refetch exchange rates if either change
    watch([connectedWallet, ethbalance], () => {
      getExchangeRates()
    })

    return {
      user,
      connectedWallet,
      ethbalance,
      usdToEth,
      usdToHive,
      usdBalanceEth,
      usdBalanceHive,
      totalUsdBalance
    }
  }
})

</script>

<style>
.btn-disconnect {
  width: 100%;
}
.q-avatar__content, .q-avatar img:not(.q-icon):not(.q-img__image) {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
