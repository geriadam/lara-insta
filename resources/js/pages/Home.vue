<template>
  <Authenticated>
    <Navbar />
    <section class="my-10">
      <Container>
        <div
          class="grid grid-col-1 md:grid-cols-[650px_minmax(350px,_1fr)_0px] gap-0">
          <div
            v-if="isLoading"
            class="flex items-center justify-center min-h-screen w-full">
            <clip-loader color="#1d4ed8" size="120px"></clip-loader>
          </div>
          <div v-else>
            <div v-for="(post, index) in posts" :key="index">
              <post-card :post="post" />
            </div>
          </div>

          <div class="hidden md:block">
            <suggestions
              :following="response.following"
              :suggestions="response.suggestions" />
          </div>
        </div>
      </Container>
    </section>
  </Authenticated>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useFollow from '../composables/follow'
import usePost from '../composables/posts'
import Container from '../components/Container.vue'
import Navbar from '../components/Navbar.vue'
import PostCard from '../components/PostCard.vue'
import Suggestions from '../components/Suggestions.vue'
import Authenticated from '../components/slot/Authenticated.vue'
import Modal from "../components/Modal.vue";

import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    PostCard,
    Container,
    Suggestions,
    Authenticated,
    ClipLoader,
    Modal
  },
  setup() {
    const store = useStore()

    // Get the token from state
    const token = computed(() => store.getters.token)

    const { response, getFollowings } = useFollow()
    const { posts, isLoading, getPostsFromYourFollowings } = usePost()

    onMounted(() => {
      getFollowings(token.value)
      getPostsFromYourFollowings(token.value)
    })

    return {
      response,
      posts,
      isLoading,
    }
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
