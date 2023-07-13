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
			path: '/edit',
			name: 'edit',
			component: () => import('../pages/Edit.vue')
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('../pages/Search.vue')
		},
		{
			path: '/inbox',
			name: 'inbox',
			component: () => import('../pages/Inbox.vue')
		},
		{
			path: '/messages/:id',
			name: 'messages',
			component: () => import('../pages/Message_Thread.vue')
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import('../pages/Settings.vue')
		},
	]
})

export default router
