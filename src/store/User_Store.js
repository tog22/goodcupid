import { defineStore } from 'pinia'
// import dapi from '@/auxiliaries/Dummy_Server'

const use_user_store = defineStore('user_store', {
	state: () => {
		return {
			// user_profile: {}
		}
	},
})

export default use_user_store