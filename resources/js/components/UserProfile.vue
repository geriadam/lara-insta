<template>
  <router-link :to="{ name: 'profile', params: { id: user.username } }">
    <div class="flex">
      <img class="h-10 w-10 rounded-full" :src="user.avatar" />
      <div class="ml-3">
        <span class="text-sm font-semibold antialiased block leading-tight">
          {{ user && user.username }}
        </span>
        <span class="text-gray-600 text-xs block">
          {{ user && user.name }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'UserProfile',
  props: ['user'],
}
</script>

<style></style>
