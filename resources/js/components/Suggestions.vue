<template>
  <div>
    <div
      v-for="user in following"
      :key="user.id"
      class="flex flex-col space-y-3 mt-5">
      <user-profile :user="user" />
    </div>
    <p class="text-gray-600 font-semibold text-sm mt-5">Suggestions For You</p>
    <div
      v-for="user in suggestions"
      :key="user.id"
      class="flex flex-col space-y-3 mt-5">
      <user-profile :user="user" />
    </div>
  </div>
</template>

<script>
import UserProfile from './UserProfile.vue'
export default {
  name: 'Suggestions',
  props: ['following', 'suggestions'],
  components: {
    UserProfile,
  },
}
</script>

<style></style>
