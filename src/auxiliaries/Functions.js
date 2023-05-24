import api from './api'
import { inject } from 'vue'

const fn = {
	login:
	function(id) {
		// const store = inject('store')
		const get_url = '/records/profiles/'+id
		api.get(get_url).then((response) => {
			response.pics = JSON.parse(response.pics)
			response.pic = response.pics[0]
			store.user_profile = response
		})
	}
}

export default fn