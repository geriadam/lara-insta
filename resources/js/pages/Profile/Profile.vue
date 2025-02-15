<template>
  <Authenticated>
    <Navbar/>
    <Container>
      <div
          v-if="isLoading"
          class="flex items-center justify-center min-h-screen w-full">
        <clip-loader color="#1d4ed8" size="120px"></clip-loader>
      </div>
      <div v-else>
        <div class="flex justify-center my-16">
          <div class="grid md:grid-cols-[450px_minmax(650px,_1fr)_0px] gap-0">
            <div class="w-full flex justify-center mb-7 md:mb-0">
              <div class="profile-img-wrapper">
                <img
                    class="rounded-full w-full h-full object-cover"
                    :src="response.profile.user.avatar"
                    alt="dp"/>
              </div>
            </div>
            <additional-profile :response="response"/>
          </div>
        </div>
        <Posts :posts="response.profile.posts"/>
      </div>
    </Container>
  </Authenticated>
</template>

<script>
import {watch, computed} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import useProfile from '../../composables/profiles'

import Container from '../../components/Container.vue'
import Navbar from '../../components/Navbar.vue'
import Authenticated from '../../components/slot/Authenticated.vue'
import AdditionalProfile from '../../components/AdditionalProfile.vue'

import Posts from './Posts.vue'

// Loader
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    Navbar,
    Container,
    Posts,
    Authenticated,
    ClipLoader,
    AdditionalProfile,
  },
  setup(props) {
    const {response, isLoading, getProfileByUsername} = useProfile()
    const route = useRoute()
    const store = useStore()

    // Get the token from state
    const token = computed(() => store.getters.token)

    // fetch the user information when url parameter change
    watch(
        () => route.params.id,
        (username) => {
          if (username) {
            // Get Profile
            getProfileByUsername({
              token: token.value,
              username: username,
            })
          }
        },
        {
          deep: true,
          immediate: true,
        }
    )

    return {
      response,
      isLoading,
    }
  },
}
</script>

<style></style>
