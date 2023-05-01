
import api from './api'
import use_user_store from '@/store/User_Store'

const fn = {
	login:
	function(id) {
		const user_store = use_user_store()
		
		const get_url = '/records/profiles/'+id
		api.get(get_url).then((response) => {
			response.pics = JSON.parse(response.pics)
			response.pic = response.pics[0]
			user_store.user_profile = response
		})
	}
}

export default fn