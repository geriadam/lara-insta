import axios from 'axios'

import { ref, computed } from 'vue'
import { useRouter } from "vue-router";
import usePost from "./posts.js";

import Swal from 'sweetalert2'

export default function useComment() {
	const router = useRouter()
	const isProcessing = ref(false)

	const { getSinglePost } = usePost()

	const addComment = async (token, postId, data, currentRoute) => {
		try {
			isProcessing.value = true
			// Pass the authentication token
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			// Add Post
			await axios.post(
				`/api/comments/${postId}`,
				data,
				config
			)

			if (currentRoute.value === 'posts.show') {
				//await getSinglePost(token, postId)
				window.location.reload();
			} else {
				Swal.fire({
					toast: true,
					icon: 'success',
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					title: 'Comment has been added.',
				})

				await router.push({ name: 'posts.show', params: { id: postId } })
			}


		} catch (error) {
			console.error(error)
			console.error('Error adding comment')
		} finally {
			isProcessing.value = false
		}
	}

	return {
		isProcessing,
		addComment
	}
}
