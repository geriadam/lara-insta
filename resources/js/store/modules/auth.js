import Swal from 'sweetalert2'
import axios from 'axios'

// State
const state = {
	token: null,
	user: null,
	registerError: null,
	loginError: null,
}

const getters = {
	// @return Boolean
	authenticated: (state) => {
		return state.token && state.user // Check if authenticated
	},

	// @return user object
	user: (state) => {
		return state.user // Get User Information from the state
	},

	// @return api token
	token: (state) => {
		return state.token // Get Token from the state
	},

	loginError: (state) => {
		return state.loginError // Get Register Error from the state
	},

	registerError: (state) => {
		return state.registerError // Get Register Error from the state
	},
}

// Actions are when you are creating API calls and committing Mutations
const actions = {
	async login({ commit, dispatch }, data) {
		try {
			const response = await axios.post(
				`/api/login`,
				data.formData
			) // Login that returns a token
			dispatch('attempt', response.data.token)
			commit('SET_LOGIN_ERROR', null) // Clear Errors
			data.router.replace('/') // Redirect When Success Login
		} catch (e) {
			commit('SET_LOGIN_ERROR', e.response.data) // Set Error
			if (e.response.status === 401) {
				console.error('Forbidden: Invalid Credentials')
				Swal.fire({
					background: '#F7471C',
					toast: true,
					icon: 'error',
					iconColor: '#ffffff',
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					title: "<span style='color:white'>Invalid Email or Password</span>",
				})
			}
		}
	},

	async register({ commit, dispatch }, data) {
		try {
			const response = await axios.post(
				`/api/register`,
				data.formData
			) // Register that returns a token
			dispatch('attempt', response.data.token)
			commit('SET_REGISTER_ERROR', null) // Clear Errors
			data.router.replace('/') // Redirect When Success Register
		} catch (e) {
			commit('SET_REGISTER_ERROR', e.response.data)
		}
	},

	async attempt({ commit, state }, token) {
		if (token) {
			commit('SET_TOKEN', token)
		}

		// Check if there is a token in the state
		// Don't send unnecessary error if no token
		// Stop the process
		if (!state.token) {
			return
		}

		try {
			// If there is a token the get the user from API
			const response = await axios.get(`/api/me`)

			commit('SET_USER', response.data) // Set the user data on the state
		} catch (e) {
			// If token is invalid then clear the state
			commit('SET_TOKEN', null)
			commit('SET_USER', null)
			localStorage.removeItem('token')
			console.error('Unauthorized')
		}
	},

	logout({ commit }, router) {
		return axios.post(`/api/logout`).then(() => {
			commit('SET_TOKEN', null)
			commit('SET_USER', null)

			// Redirect to login after logout
			router.push('/login')
		})
	},

	clearLoginError({ commit }) {
		commit('SET_LOGIN_ERROR', null)
	},

	clearRegisterError({ commit }) {
		commit('SET_REGISTER_ERROR', null)
	},
}

const mutations = {
	SET_TOKEN: (state, payload) => {
		state.token = payload // Set the token on the state
	},
	SET_USER: (state, payload) => {
		state.user = payload // Set the user data on the  state
	},
	SET_LOGIN_ERROR: (state, payload) => {
		state.loginError = payload // Set the validation error for register form
	},
	SET_REGISTER_ERROR: (state, payload) => {
		state.registerError = payload // Set the validation error for register form
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
