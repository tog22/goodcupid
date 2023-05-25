const filters = {
	who: {
		type: 	'dropdown',
		options: {
			mlw: {
				key: 		'mlw',
				text: 		'Men <span class="s_light">who like women</span>',
				filter:		'filter=gender,eq,m&filter=looking_for,cs,w'
			},
			wlm: {
				key: 		'wlm',
				text: 		'Women <span class="s_light">who like men</span>',
				filter:		'filter=gender,eq,w&filter=looking_for,cs,m'
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
	education: {
		type: 	'checkboxes',
		options: {
			hs: {
				key: 		'hs',
				text: 		'High school',
				filter:		'filter2=education,eq,hs'
			},
			ts: {
				key: 		'ts',
				text: 		'Trade/tech school',
				filter:		'filter2=education,eq,ts'
			},
			ic: {
				key: 		'ic',
				text: 		'In college',
				filter:		'filter2=education,eq,ic'
			},
			ug: {
				key: 		'ug',
				text: 		'Undergraduate degree',
				filter:		'filter2=education,eq,ug'
			},
			ig: {
				key: 		'ig',
				text: 		'In grad school',
				filter:		'filter2=education,eq,ig'
			},
			gd: {
				key: 		'gd',
				text: 		'Graduate degree',
				filter:		'filter2=education,eq,gd'
			}
		}
	},
	religion: {
		type: 	'checkboxes',
		options: {
			// Non-religious
			// Christian
			// Jewish
			// Muslim
			// Hindu
			// Buddhist
			// Sikh
			// Other religion
			nr: {
				key: 		'nr',
				text: 		'Non-religious',
				filter:		'filter3=religion,eq,nr'
			},
			ch: {
				key: 		'ch',
				text: 		'Christian',
				filter:		'filter3=religion,eq,ch'
			},
			ju: {
				key: 		'ju',
				text: 		'Jewish',
				filter:		'filter3=religion,eq,ju'
			},
			mu: {
				key: 		'mu',
				text: 		'Muslim',
				filter:		'filter3=religion,eq,mu'
			},
			hi: {
				key: 		'hi',
				text: 		'Hindu',
				filter:		'filter3=religion,eq,hi'
			},
			bu: {
				key: 		'bu',
				text: 		'Buddhist',
				filter:		'filter3=religion,eq,bu'
			},
			si: {
				key: 		'si',
				text: 		'Sikh',
				filter:		'filter3=religion,eq,si'
			},
			or: {
				key: 		'or',
				text: 		'Other religion',
				filter:		'filter3=religion,eq,or'
			}
		}
	},
	ethnicity: {
		type: 	'checkboxes',
		options: {
			// Asian
			// Black
			// Hispanic / Latin
			// Indian
			// Middle Eastern
			// Native American
			// Pacific Islander
			// White
			// Other ethnicity
			as: {
				key: 		'as',
				text: 		'Asian',
				filter: 	'filter4,eq,as'
			},
			bl: {
				key: 		'bl',
				text: 		'Black',
				filter: 	'filter4,eq,bl'
			},
			hi: {
				key: 		'hi',
				text: 		'Hispanic / Latin',
				filter: 	'filter4,eq,hi'
			},
			in: {
				key: 		'in',
				text: 		'Indian',
				filter: 	'filter4,eq,in'
			},
			me: {
				key: 		'me',
				text: 		'Middle Eastern',
				filter: 	'filter4,eq,me'
			},
			na: {
				key: 		'na',
				text: 		'Native American',
				filter: 	'filter4,eq,na'
			},
			pi: {
				key: 		'pi',
				text: 		'Pacific Islander',
				filter: 	'filter4,eq,pi'
			},
			wh: {
				key: 		'wh',
				text: 		'White',
				filter: 	'filter4,eq,wh'
			},
			ot: {
				key: 		'ot',
				text:		'Other ethnicity',
				filter: 	'filter4,eq,ot'
			}
		}
	}
	

}

export default filters