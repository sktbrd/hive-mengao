<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
            <q-btn class="btn-nav" href="/">
              <q-avatar size="sm" square>
                <img src="https://images.ecency.com/u/hive-173115/avatar/lardge" alt="Skatehive logo" />
              </q-avatar>
              SKATEHIVE
            </q-btn>
          </q-toolbar-title>

          <q-space />

          <q-btn class="btn-nav" href="/login" :label="hiveLoginLabel" @click="login">
              <q-avatar size="sm" square>
                <img src="https://cryptologos.cc/logos/hive-blockchain-hive-logo.png" alt="Skatehive logo" />
              </q-avatar>
            </q-btn>
            <q-btn class="btn-nav" href="/eth" :label="ethLoginLabel" @click="login">
              <q-avatar size="sm" square>
                <img src="https://cdn.freebiesupply.com/logos/large/2x/ethereum-1-logo-png-transparent.png" alt="Skatehive logo" />
              </q-avatar>
            </q-btn>
        </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>

        <q-input
        class="search-bar"
        type="search"
        placeholder="... Search Skate Stuff"
        />

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import linksList from 'src/components/subcomponents/linksList'
import { useLoginEth } from 'src/composables/loginEth'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const hiveuser = $q.sessionStorage.getItem('user')
    const leftDrawerOpen = ref(false)
    const { connectedWallet } = useLoginEth()

    const modifiedLinksList = computed(() => {
      if (hiveuser) {
        const modifiedLink = { ...linksList[1] }
        modifiedLink.title = hiveuser.name
        modifiedLink.caption = 'Channel'
        modifiedLink.icon = 'person'
        modifiedLink.link = '/profile/' + hiveuser.name
        return [
          ...linksList.slice(0, 1),
          modifiedLink,
          ...linksList.slice(2)
        ]
      } else {
        return linksList
      }
    })
    const ethLoginLabel = computed(() => {
      const storedValue = localStorage.getItem('ethbalance')

      if (storedValue !== null) {
        return storedValue
      }

      if (connectedWallet) {
        const balance = connectedWallet.balance
        console.log(balance)
        if (typeof balance === 'number' && !isNaN(balance)) {
          const formattedBalance = parseFloat(balance).toFixed(2)
          const label = `${formattedBalance} ETH`
          console.log(label)
          localStorage.setItem('ethbalance', label)
          return label
        } else {
          console.warn('Invalid ETH balance value:', balance)
          return 'Login'
        }
      } else {
        return 'Login'
      }
    })
    return {
      essentialLinks: modifiedLinksList.value,
      leftDrawerOpen,
      hiveuser,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      ethLoginLabel
    }
  },

  computed: {
    hiveLoginLabel () {
      return this.hiveuser ? this.hiveuser.name : 'Login'
    }
  }
})
</script>
