<template>
  <div v-if="comments.length > 0">
    <div v-for="comment in comments" :key="comment.id">
      <comment-item :comment="comment" />
    </div>
  </div>
  <div v-else div class="flex justify-center items-center">
    <p class="my-6">No comments</p>
  </div>
</template>

<script>
import CommentItem from "../../components/CommentItem.vue";

export default {
  name: "CommentList",
  props: ['comments'],
  components: {CommentItem},

}
</script>

<style scoped>

</style>