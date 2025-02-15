import axios from 'axios'

import { ref } from 'vue'

export default function useFollow() {
  const response = ref([])
  const isFollowingLoading = ref(true)

  const toggleFollowProfile = async (user_id) => {
    try {
      const res = await axios.post(
        `/api/follow/${user_id}`
      )
      console.log(res.data)
    } catch (error) {
      console.error('Following profile error')
    }
  }

  const getFollowings = async (token) => {
    try {
      isFollowingLoading.value = true
      // Pass the authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const res = await axios.get(
        `/api/following`,
        config
      )

      response.value = res.data

      isFollowingLoading.value = false
    } catch (error) {
      console.error('Error Getting posts from your friends')
    } finally {
      isFollowingLoading.value = false
    }
  }

  return {
    toggleFollowProfile,
    response,
    isFollowingLoading,
    getFollowings,
  }
}
