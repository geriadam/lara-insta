import { createStore } from 'vuex'
import auth from './modules/auth'

// Create Store
export default createStore({
	modules: {
		auth,
	},
})
