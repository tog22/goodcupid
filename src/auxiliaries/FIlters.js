import use_user_store from '@/store/User_Store'
const user_store = use_user_store()
const l = user_store.looking_for

const filters = {
	who: {
		type: 	'dropdown',
		options: {
			mlw: {
				text: 'Men <span class="s_light">who like women</span>'
			},
			wlm: {
				text: 'Women <span class="s_light">who like men</span>'
			},
		}
	},
	age: {
		type: 	'custom',
		placeholder:	'Ages '+l.age.min+' to 34',
		html: 			'<div class="filter_age"><div class="filter_age_slider"></div></div>'
	},
	distance: {
		type: 	'custom',
		placeholder:	'Within 25 miles',
		html: 			'ooooo'
	},
	height: {
		type: 	'custom',
		placeholder:	"At least 5'9\"",
		html: 			'ooooo'
	},
	

}

export default filters