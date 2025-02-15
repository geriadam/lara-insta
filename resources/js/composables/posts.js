import axios from 'axios'

import { ref, computed } from 'vue'

import Swal from 'sweetalert2'

import { useRouter } from "vue-router";

export default function usePost() {
  const posts = ref([])
  const post = ref(null)
  const isLoading = ref(true)
  const isProcessing = ref(false)
  const router = useRouter()

  const getPostsFromYourFollowings = async (token) => {
    try {
      isLoading.value = true
      // Pass the authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(
        `/api/posts`,
        config
      )

      posts.value = response.data

      isLoading.value = false
    } catch (error) {
      console.error('Error Getting posts from your friends')
    } finally {
      isLoading.value = false
    }
  }

  const addPost = async (param) => {
    try {
      // Pass the authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${param.token}`,
        },
      }

      // Add Post
      await axios.post(
        `/api/posts`,
        param.data,
        config
      )

      // Go back to profile
      await param.router.push(`/profiles/${param.username}`)

      Swal.fire({
        toast: true,
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Post has been added.',
      })
    } catch (error) {
      console.error('Error adding post')
    }
  }

  const likePost = async (token, postId) => {
    try {
      isProcessing.value = true
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const res = await axios.post(
        `/api/posts/like_post/${postId}`,
        config
      )

      console.log(res.data)
      return res.data;

    } catch (e) {
      console.error(e)
    } finally {
      isProcessing.value = false
    }
  }

  const getSinglePost = async (token, postId) => {
    try {
      isLoading.value = true
      // Pass the authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(
        `/api/posts/${postId}`,
        config
      )

      post.value = response.data

      isLoading.value = false
    } catch (error) {
      if (error.response.status === 404) {
        await router.push({ name: 'notfound' })
      }
      console.error('Error Getting post')
    } finally {
      isLoading.value = false
    }
  }

  return {
    posts,
    post,
    isLoading,
    addPost,
    getPostsFromYourFollowings,
    likePost,
    isProcessing,
    getSinglePost
  }
}
