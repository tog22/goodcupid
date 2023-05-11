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
		placeholder:	'Ages 28 to 34',
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