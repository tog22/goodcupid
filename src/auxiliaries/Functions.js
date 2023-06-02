import api from './api'
import { inject } from 'vue'
import store_parent from '../store/Store.js'
const store = store_parent.state 

const fn = {
	login:
	function(id) {
		const get_url = '/records/profiles/'+id
		api.get(get_url).then((response) => {
			response.pics = JSON.parse(response.pics)
			response.pic = response.pics[0]
			store.user_profile = response
			store.logged_in = true
		})
	},

	logout:
	function() {
		console.log(store)
		store.logged_in = false
		store.user_profile = {}
		store.user = {}
		console.log(store)
	}
}

export default fn

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}