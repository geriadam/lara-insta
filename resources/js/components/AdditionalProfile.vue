<template>
  <div class="w-full">
    <div class="flex space-x-3 mb-5">
      <p class="text-4xl">
        {{ response.profile.user.username }}
      </p>

      <follow-button
        v-if="!isOwnedProfile"
        :userId="response.profile.user.id"
        :follows="response.follows" />
      <button
        v-else
        class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-3 text-center items-center">
        <router-link
          :to="{
            name: 'profiles.edit',
            params: { id: response.profile.user.username },
          }"
          >Edit Profile</router-link
        >
      </button>
    </div>
    <div class="flex space-x-6 mb-5">
      <p>
        <span class="font-bold">
          {{ response.profile.posts.length }}
        </span>
        posts
      </p>
      <p>
        <span class="font-bold">
          {{ response.profile.followers_count }}
        </span>
        followers
      </p>
      <p>
        <span class="font-bold">
          {{ response.profile.user.following_count }}
        </span>
        following
      </p>
    </div>
    <div>
      <p>
        <span class="font-bold">{{ response.profile.user.name }}.</span>
        {{ response.profile.description }}
      </p>
      <p class="text-sm font-semibold text-blue-700">
        {{ response.profile.website ?? "" }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import FollowButton from '../components/FollowButton.vue'

export default {
  name: 'AdditionalProfile',
  props: ['response'],
  components: {
    FollowButton,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // Get a data from the state getters
    const user = computed(() => store.getters.user)

    const isOwnedProfile = ref(false)

    watch(
      () => route.params.id,
      (username) => {
        if (user.value.username === username) {
          isOwnedProfile.value = true
        } else {
          isOwnedProfile.value = false
        }

        console.log(isOwnedProfile.value)
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      isOwnedProfile,
    }
  },
}
</script>

<style></style>
