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
          HIVE
        </q-toolbar-title>

        <div>v0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

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
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Login',
    caption: 'with Hive KeyChain',
    icon: 'login',
    link: '/login'
  },
  {
    title: 'Login',
    caption: 'with Ethereum Wallet',
    icon: 'login',
    link: '/login'
  },
  {
    title: 'Post',
    caption: 'something gnarly',
    icon: 'create',
    link: '/post'
  },

  {
    title: 'Wallet',
    caption: 'Hive Wallet',
    icon: 'wallet',
    link: '/wallet'
  },
  {
    title: 'Discord',
    caption: 'SkateHive',
    icon: 'discord',
    link: 'https://discord.gg/skatehive'
  },
  {
    title: 'AppAdmin',
    caption: '',
    icon: 'settings_applications',
    link: '/#/admin'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
