<template>
  <form @submit.prevent="onSubmit">
    <div class="flex space-x-3 items-center mb-5">
      <h2 class="text-gray-800 font-bold text-2xl">
        Create new post
      </h2>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
    </div>
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="default_size">Image caption</label>
      <input
          type="caption"
          id="caption"
          class="bg-gray-50 rounded-md text-gray-900 border text-sm rounded-sm block w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full"
          placeholder="Caption"
          required
          v-model="form.caption"
      />
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="default_size">Upload an image</label>
      <input @change="handleOnChangeImage"
             accept="image/*" class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file">
    </div>
    <button
        type="submit"
        class="text-white rounded-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>

</template>

<script>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import usePost from '../../composables/posts'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const {addPost} = usePost()

    const form = ref({
      caption: '',
      image: null,
    })

    const handleOnChangeImage = (e) => {
      form.value.image = e.target.files[0]
    }

    // From VueX State
    const token = computed(() => store.getters.token)
    const user = computed(() => store.getters.user)

    const onSubmit = () => {
      // Create FormData Object
      const formData = new FormData()
      formData.append('caption', form.value.caption)
      formData.append('image', form.value.image)

      addPost({
        token: token.value,
        data: formData,
        router: router,
        username: user.value.username,
      })
    }

    return {
      form,
      onSubmit,
      handleOnChangeImage,
    }
  },
}
</script>

<style></style>
