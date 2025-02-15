<template>
  <div
    v-if="posts.length > 0"
    class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
    <div v-for="(post, index) in posts" :key="index">
      <post-item :post="post" />
    </div>
  </div>
  <div v-else class="pt-14 md:pt-16">
    <div class="flex flex-col justify-center items-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-20 h-20">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>

      <p class="text-center text-3xl">No Posts Yet</p>
    </div>
  </div>
</template>

<script>
import PostItem from '../../components/PostItem.vue'
export default {
  components: { PostItem },
  props: ['posts'],
}
</script>

<style></style>
