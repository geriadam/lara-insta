import axios from 'axios'

import {ref} from 'vue'

import Swal from 'sweetalert2'

import {useRouter} from 'vue-router'

export default function useProfile() {
    const response = ref(null)
    const isLoading = ref(true)
    const isSaving = ref(false)
    const passwordErrors = ref(null)
    const router = useRouter()

    const filteredProfiles = ref([])


    const getProfileByUsername = async (param) => {
        try {
            isLoading.value = true
            // Pass the authentication token
            const config = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                },
            }

            const res = await axios.get(
                `${import.meta.env.VITE_API_URI}/api/profiles/${param.username}`,

                config
            )
            response.value = res.data

            isLoading.value = false
        } catch (error) {
            if (error.response.status === 404) {
                await router.push({name: 'notfound'})
            }
            console.error('Getting profile error')
        } finally {
            isLoading.value = false
        }
    }

    const updateProfile = async (param) => {
        try {
            isSaving.value = true

            const config = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                },
            }

            // Response is from ref so no need to pass form data on param
            // Create FormData Object
            const formData = new FormData()
            formData.append('_method', 'PUT') // For Laravel FormData To Work for PUT|PATCH
            formData.append('name', response.value.profile.user.name)
            formData.append('email', response.value.profile.user.email)
            formData.append('username', response.value.profile.user.username)
            formData.append('description', response.value.profile.description)
            formData.append('website', response.value.profile.website)
            formData.append('image', param.image)

            await axios.post(
                `${import.meta.env.VITE_API_URI}/api/profiles/${param.username}`, formData,
                config
            )

            // Redirect back to profile
            await router.push({
                name: 'profile',
                params: {id: response.value.profile.user.username},
            })

            Swal.fire({
                toast: true,
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Profile has been updated.',
            })

            isSaving.value = false
        } catch (error) {
            Swal.fire({
                toast: true,
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Error updating profile. Please try again.',
            })

            console.log(error)

            isSaving.value = false
        }
    }

    const changePassword = async (token, formData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            const res = await axios.post(`${import.meta.env.VITE_API_URI}/api/change_password`, formData, config)

            passwordErrors.value = null

            Swal.fire({
                toast: true,
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: res.data.message,
            })

            // Clear Form
            formData.current_password = '';
            formData.password = '';
            formData.password_confirmation = '';

        } catch (e) {
            passwordErrors.value = null
            if (e.response.status == 401) {
                // Incorrect old password
                passwordErrors.value = e.response.data
            } else if (e.response.status == 422) {
                // validation error
                passwordErrors.value = e.response.data
            } else {
                // 500 error
                Swal.fire({
                    toast: true,
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'Error updating password. Please try again.',
                })
                console.error(e)
                passwordErrors.value = null
            }
        }
    }

    const searchProfile = async (search) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/profiles/search/${search}`)
            filteredProfiles.value = res.data
        } catch (e) {
            console.error(e.data)
            filteredProfiles.value = []
        }
    }

    return {
        response,
        getProfileByUsername,
        updateProfile,
        changePassword,
        isLoading,
        isSaving,
        passwordErrors,
        searchProfile,
        filteredProfiles
    }
}
