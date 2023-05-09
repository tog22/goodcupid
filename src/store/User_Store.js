import { defineStore } from 'pinia'
// import dapi from '@/auxiliaries/Dummy_Server'

const use_user_store = defineStore('gc_user_store', {
	state: () => {
		return {
			a: 1,
			// user_profile: {}
			looking_for: {
				who:			'mlw',
				age:			{
					min:	26,
					max:	34,
				}
			}
		}
	},
	persist: true,
})

export default use_user_store