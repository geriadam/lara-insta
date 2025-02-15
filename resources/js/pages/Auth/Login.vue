<template>
  <Guest>
    <div class="card-wrapper">
      <div class="login-wrapper">
        <div class="flex justify-center">
          <div
            class="login-form-width p-6 bg-white border border-gray-200 rounded-md shadow-sm">
            <div class="flex justify-center py-3">
              <img
                src="https://www.dafont.com/forum/attach/orig/7/3/737566.png?1"
                alt=""
                width="140"
                height="140" />
            </div>
            <form @submit.prevent="onSubmit">
              <div class="mb-4">
                <input
                  type="text"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Username or email"
                  v-model="form.email" />

                <div
                  v-if="
                    loginError && loginError.errors && loginError.errors.email
                  ">
                  <span
                    v-for="(message, keys) in loginError.errors.email"
                    :key="keys">
                    <validation-text :text="message" />
                  </span>
                </div>
              </div>
              <div class="mb-6">
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Password"
                  v-model="form.password" />
                <div
                  v-if="
                    loginError &&
                    loginError.errors &&
                    loginError.errors.password
                  ">
                  <span
                    v-for="(message, keys) in loginError.errors.password"
                    :key="keys">
                    <validation-text :text="message" />
                  </span>
                </div>
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
              <div class="text-center py-3">
                <a href="#" class="text-sm text-blue-600 font-semibold">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="flex justify-center mt-3">
          <div
            class="login-form-width p-6 bg-white border border-gray-200 rounded-md shadow-sm">
            <div class="text-center">
              <span>Don't have an account?</span>
              <router-link
                :to="{ name: 'register' }"
                class="text-sm text-blue-600 font-semibold">
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Guest>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Guest from '../../components/slot/Guest.vue'
import ValidationText from '../../components/ValidationText.vue'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const form = ref({
      email: '',
      password: '',
    })

    // On Component Mount
    onMounted(() => {
      // Clear Form Errors
      store.dispatch('clearLoginError')
    })

    // Call vuex getters
    const loginError = computed(() => store.getters.loginError)
    // Call vuex action
    const onSubmit = () => {
      store.dispatch('login', { formData: form.value, router: router })
    }

    return {
      onSubmit,
      form,
      loginError,
    }
  },
  components: { Guest, ValidationText },
}
</script>

<style ValidationText></style>
