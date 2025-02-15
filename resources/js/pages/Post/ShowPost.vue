<template>
  <authenticated>
    <navbar/>

    <container>
      <div
          v-if="isLoading"
          class="flex items-center justify-center min-h-screen w-full">
        <clip-loader color="#1d4ed8" size="120px"></clip-loader>
      </div>
      <div v-else class="flex justify-center w-full my-16">
        <div class="block bg-white border border-gray-200 shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-[600px_minmax(400px,_1fr)_0px] gap-2">
            <div class="post-img-wrapper">
              <img class="w-full h-full object-cover"
                   :src="
                    post.image.url" :alt="post.id">
            </div>
            <div class="w-full h-full p-2.5 flex flex-col justify-between">
              <div class="top">
                <user-profile :user="post.profile.user"/>
                <div class="w-full border-t border-x-0 border-b-0 my-3"></div>
                <comment-list :comments="post.comments"/>
              </div>
              <div class="bottom">
                <div class="border-x-0 border-b-0 border-t">
                  <like-button :post="post"/>

                  <div class="mx-4 mt-2 mb-2">
                    <span class="font-semibold text-sm">{{ post.profile.user.username }}</span>
                    {{ post.caption }}
                  </div>
                  <div class="text-xs font-sm uppercase mx-4 mb-4">
                    {{ post.created_at }}
                  </div>
                  <div class="w-full border-t border-x-0 border-b-0"></div>
                  <comment-form :post-id="post.id"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </container>
  </authenticated>


</template>
<script>
import {computed, watch} from "vue";
import usePost from "../../composables/posts.js";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Navbar from "../../components/Navbar.vue";
import Authenticated from "../../components/slot/Authenticated.vue";
import Container from "../../components/Container.vue";
import UserProfile from "../../components/UserProfile.vue";
import CommentItem from "../../components/CommentItem.vue";
import CommentForm from "../Comment/CommentForm.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import LikeButton from "../../components/LikeButton.vue";
import CommentList from "../Comment/CommentList.vue";

export default {
  name: 'ShowPost',
  components: {
    CommentList,
    LikeButton, CommentForm, CommentItem, UserProfile, Container, Authenticated, Navbar, ClipLoader
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const {isLoading, post, getSinglePost} = usePost()

    const token = computed(() => store.getters.token);

    watch(
        () => route.params.id,
        (id) => {
          // Get Post
          getSinglePost(token.value, id)
        },
        {
          deep: true,
          immediate: true,
        }
    )

    return {
      isLoading,
      post,
    }
  }
}
</script>