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
			name: 'own_profile',
			component: () => import('../pages/Profile.vue')
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: () => import('../pages/Profile.vue')
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('../pages/Search.vue')
		},
		{
			path: '/message',
			name: 'message',
			component: () => import('../pages/Search.vue')
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import('../pages/Search.vue')
		},
	]
})

export default router
