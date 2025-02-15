<template>
  <button
    @click="followProfile"
    type="button"
    class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-3 text-center"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import { ref, computed } from 'vue'
import useFollow from '../composables/follow'
export default {
  name: 'FollowButton',
  props: ['userId', 'follows'],
  setup(props) {
    const isFollows = ref(props.follows)

    const { toggleFollowProfile } = useFollow()

    // Follow and Unfollow
    const followProfile = () => {
      toggleFollowProfile(props.userId)
      // Change value of follows into opposite
      isFollows.value = !isFollows.value
    }

    // Change Button Text
    const buttonText = computed(() => {
      return isFollows.value ? 'Unfollow' : 'Follow'
    })

    return {
      followProfile,
      buttonText,
    }
  },
}
</script>

<style></style>
