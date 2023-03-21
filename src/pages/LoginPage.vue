<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Username"
          v-model="form.username"
        />
        <q-btn
          label="Login with Hive Keychain"
          class="full-width"
          outline
          rounded
          type="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const router = useRouter()

    const { login } = useAuthUser()

    const form = ref({
      username: ''
    })

    const handleLogin = async () => {
      try {
        const loggedIn = await login(form.value)
        if (loggedIn === true) {
          router.push('/wallet')
        }
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  },

  data () {
    return {
      username: '',
      isLoggedIn: false
    }
  }
})
</script>
