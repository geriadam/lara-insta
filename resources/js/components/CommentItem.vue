<template>
  <div class="flex my-6">
    <img class="h-10 w-10 rounded-full"
         :src="comment.user.avatar" alt="hi"/>
    <div class="ml-3">
      <div class="text-sm antialiased block leading-tight">
        <span class="font-semibold mr-2">{{ comment.user.username }}</span>
        <span class="font-base text-gray-700">{{ comment.content }}</span>
      </div>
      <div class="text-xs font-base text-gray-600">
        {{ comment.created_at }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: ['comment'],
}
</script>

<style scoped>

</style>