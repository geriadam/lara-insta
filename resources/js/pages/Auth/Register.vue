<template>
  <Guest>
    <div class="card-wrapper mb-8 md:mb-0">
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
              <div class="text-center py-3">
                <p href="#" class="text-sm text-gray-500 font-semibold text-lg">
                  Sign up to see photos and videos from your friends
                </p>
              </div>
              <div class="mb-4">
                <input
                  type="text"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Email"
                  v-model="form.email" />

                <div
                  v-if="
                    registerError &&
                    registerError.errors &&
                    registerError.errors.email
                  ">
                  <span
                    v-for="(message, keys) in registerError.errors.email"
                    :key="keys">
                    <validation-text :text="message" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <input
                  type="text"
                  id="full_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Full Name"
                  v-model="form.name" />

                <div
                  v-if="
                    registerError &&
                    registerError.errors &&
                    registerError.errors.name
                  ">
                  <span
                    v-for="(message, keys) in registerError.errors.name"
                    :key="keys">
                    <validation-text :text="message" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <input
                  type="text"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Username"
                  v-model="form.username" />

                <div
                  v-if="
                    registerError &&
                    registerError.errors &&
                    registerError.errors.username
                  ">
                  <span
                    v-for="(message, keys) in registerError.errors.username"
                    :key="keys">
                    <validation-text :text="message" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Password"
                  v-model="form.password" />

                <div
                  v-if="
                    registerError &&
                    registerError.errors &&
                    registerError.errors.password
                  ">
                  <span
                    v-for="(message, keys) in registerError.errors.password"
                    :key="keys">
                    <validation-text :text="message" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  id="confirm_password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
                  placeholder="Confirm Password"
                  v-model="form.password_confirmation" />
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign Up
              </button>
              <div class="text-center py-3">
                <p href="#" class="text-sm text-gray-500">
                  By signing up, you agree to our
                  <span class="font-bold">Terms,</span>
                  <span class="font-bold">Data Policy</span>
                  and
                  <span class="font-bold">Cookies Policy</span>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div class="flex justify-center mt-3">
          <div
            class="login-form-width p-6 bg-white border border-gray-200 rounded-md shadow-sm">
            <div class="text-center">
              <span>Have have an account?</span>
              <router-link
                :to="{ name: 'login' }"
                class="text-sm text-blue-600 font-semibold">
                Login
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
      username: '',
      email: '',
      password: '',
      name: '',
      password_confirmation: '',
    })

    // On Component Mount
    onMounted(() => {
      // Clear Form Errors
      store.dispatch('clearRegisterError')
    })

    // Call vuex getters
    const registerError = computed(() => store.getters.registerError)
    // Call vuex action
    const onSubmit = () =>
      store.dispatch('register', { formData: form.value, router: router })
    return {
      onSubmit,
      form,
      registerError,
    }
  },
  components: { Guest, ValidationText },
}
</script>

<style></style>
