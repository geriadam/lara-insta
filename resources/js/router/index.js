import { createWebHistory, createRouter } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
import Profile from '../pages/Profile/Profile.vue'
import EditProfile from '../pages/Profile/EditProfile.vue'
import ShowPost from '../pages/Post/ShowPost.vue'
import NotFound from '../pages/NotFound.vue'

// We use username as a url parameter

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '/posts/:id',
		name: 'posts.show',
		component: ShowPost,
	},
	{
		path: '/profiles/:id',
		name: 'profile',
		component: Profile,
	},
	{
		path: '/profiles/:id/edit',
		name: 'profiles.edit',
		component: EditProfile,
	},
	{
		path: '/:patchMatch(.*)*',
		name: 'notfound',
		component: NotFound,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		// When Router Link is Clicked, always scroll the new page on the top of page
		document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
	},
})

export default router
