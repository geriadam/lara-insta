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
              Post
            </div>
          </div>
        </div>
      </Container>
    </section>
  </Authenticated>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Container from '../components/Container.vue'
import Navbar from '../components/Navbar.vue'
import Authenticated from '../components/slot/Authenticated.vue'
import Modal from "../components/Modal.vue";

import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Container,
    Authenticated,
    ClipLoader,
    Modal
  },
  setup() {
    const store = useStore()
    const token = computed(() => store.getters.token)
    console.log(token)
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
