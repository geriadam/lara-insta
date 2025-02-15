<template>
  <div class="border rounded-sm w-full md:max-w-xl mb-10 bg-white">
    <!-- Profile -->
    <div class="flex justify-between items-center px-4 py-3">
      <user-profile :user="post.profile.user"/>
      <div>
        <button class="relative" @click="toggleDropdown">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
        </button>
        <div id="dropdownDivider"
             v-show="IsDropdownActive"
             class="absolute w-44 bg-white rounded shadow">
          <ul class="py-1 text-sm text-gray-700 ">
            <li>
              <router-link :to="{ name: 'posts.show', params: {id: post.id} }"
                           class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Go to post
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Image -->
    <div class="w-full h-500px">
      <img
          :src="post.image.url"
          class="w-full h-full object-cover"/>
    </div>

    <!-- React and Comments -->
    <div class="border">

      <like-button :post="post"/>

      <div class="mx-4 mt-2 mb-2">
        <span class="font-semibold text-sm">{{ post.profile.user.username }}</span>
        {{ post.caption }}
      </div>

      <div class="font-base text-sm mx-4 mb-2" v-if="post.comments_count > 0">
        <router-link :to="{ name: 'posts.show', params: {id: post.id} }">
          View comments
        </router-link>
      </div>
      <div class=" text-xs font-sm uppercase mx-4 mb-4
        ">
        {{ post.created_at }}
      </div>
      <div class="w-full border-t border-x-0 border-b-0"></div>
      <comment-form :post-id="post.id"/>
    </div>
  </div>
</template>
<script>
import {ref, computed} from "vue";
import UserProfile from './UserProfile.vue'
import CommentForm from "../pages/Comment/CommentForm.vue";
import LikeButton from "./LikeButton.vue";

export default {
  components: {LikeButton, CommentForm, UserProfile},
  name: 'PostCard',
  props: ['post'],
  setup(props) {

    const backend_uri = `${import.meta.env.VITE_API_URI}`

    // For Dropdown
    const IsDropdownActive = ref(false)

    const toggleDropdown = () => {
      IsDropdownActive.value = !IsDropdownActive.value
    }

    return {
      backend_uri,
      IsDropdownActive,
      toggleDropdown
    }
  },
}
</script>
