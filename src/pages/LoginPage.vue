<template>
  <q-page>
    <q-form class="row justify-center" @submit.prevent="handleLogin" >
      <p class="col-12 text-h5 text-center">Login</p>
      <!-- input field for username -->
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Username"
          v-model="form.username"
        />
        <!-- button to submit login form -->
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

    // import useAuthUser composable
    const { login } = useAuthUser()

    // define form object with username field
    const form = ref({
      username: ''
    })

    // async function to handle form submission
    const handleLogin = async () => {
      try {
        // call login function with form data
        const loggedIn = await login(form.value)
        // if user is logged in, log form data and navigate to homepage
        if (loggedIn === true) {
          console.log(form.value.username)
          router.push('/')
        }
      } catch (error) {
        // alert user if there's an error
        alert(error.message)
      }
    }
    // return variables for use in template
    return {
      form,
      handleLogin
    }
  },

  // define data variables
  data () {
    return {
      username: '',
      isLoggedIn: false
    }
  }
})
</script>
