<template>
  <div class="w-full">
    <div class="post-item-wrapper">
      <router-link :to="{ name: 'posts.show', params: { id: post.id } }">
        <img
            :src="post.image.url"
            alt=""
            class="w-full h-full object-cover"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'PostItem',
  props: ['post'],
}
</script>

<style></style>
