<template>
  <form class="block" @submit.prevent="onSubmitHandler">
    <div class="flex">
      <input type="text" name="comment" id="comment"
             class="bg-transparent outline-0 focus:ring-0 border-0 text-gray-900 text-sm block w-full pl-4 p-2.5"
             placeholder="Add a comment..." v-model="content">
      <button type="submit"
              :disabled="isProcessing"
              class="focus:outline-none h-full text-sky-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 mb-2 disabled:opacity-75">
        Post
      </button>
    </div>
  </form>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import useComment from "../../composables/comments.js";
import {useRoute} from 'vue-router';


export default {
  name: "CommentForm",
  props: ['postId'],
  setup(props) {
    const store = useStore()
    const content = ref('')
    const {isProcessing, addComment} = useComment()

    const currentRoute = computed(() => {
      return useRoute().name
    })

    const token = computed(() => store.getters.token)

    onMounted(() => {
      console.log(currentRoute.value)
    })

    const onSubmitHandler = async () => {
      console.log(currentRoute.value === 'posts.show')
      if (content.value !== '') {
        await addComment(token.value, props.postId, {
          content: content.value
        }, currentRoute)
        // Empty Form
        content.value = ''
      }
    }


    return {
      content,
      isProcessing,
      onSubmitHandler,
      currentRoute
    }
  }
}
</script>

<style scoped>

</style>