import { createRouter, createWebHistory } from 'vue-router'
import Home_Page from '../pages/Home_Page.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home_Page
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('../pages/Profile.vue')
		}
	]
})

export default router
