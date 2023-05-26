<template>
	<div :class="'option '+opened+' '+in_store" :id="'o_'+name">
		<div v-if="type == 'dropdown'" class="selecter dropdown" >
			<div class="dropdown">
				<div 
					v-for="(option, index) in filter.options"
					class="s_item"
					:key="'o'+index"
					@click="dropdown_select(option)"
				>
					<span v-html="option.text"></span>
				</div>
			</div>
			<!-- <div class="close" @click="close">
				✔︎
			</div> -->
		</div>
		<div v-else-if="type == 'checkboxes'" class="selecter" >
			<div class="checkboxes">
				<div 
				v-for="(option, index) in options"
				class="s_item"
				:key="'o'+index"
				>
					<label :for="'o_'+name+'_'+index" >
						<input type="checkbox"  @click="checkbox_click(name, option, index)" :id="'o_'+name+'_'+index" v-model="option.selected" />
						<span v-html="option.text"></span>
					</label>
				</div>
			</div>
			<div class="close" @click="close">
				×
			</div>
		</div>
		<div v-else class="selecter">
			<div class="s_content">
				<div v-if="component_passed">
					<component :is="sel" :close="close" />
				</div>
			</div>
			<div class="close" @click="close">
				✔︎<!-- × -->
			</div>
		</div>
		<div class="chosen" @click="open">
			<span v-if="in_store">
				<span v-if="component_passed">
					<component :is="disp" />
				</span>
				<span v-else-if="type == 'dropdown'">
					<span v-html="text"></span>
				</span>
				<span v-else>
					code for when component not passed or not a dropdown
				</span>
			</span>
			<span v-else v-html="display_name">
			</span>
		</div>
		<div class="s_below">
			
		</div>
	</div>
</template>

<script>
/*******************
**   ⤵️ IMPORTS   **
*******************/

// External libraries
import { defineComponent, inject } from 'vue'
import $ from 'jquery'

// Auxiliaries
import bus from '@/auxiliaries/bus'
import filters from '@/auxiliaries/Filters'

// Components
import AgeS from './Toggles/AgeS.vue'
import { faBus } from '@fortawesome/free-solid-svg-icons'


/*********************
**   *️⃣ MAIN CODE   **
*********************/

function resize_selecter(name) {
	$(document).ready(function() {
		let min_width = $('#o_'+name+' .chosen').width() + 'px';
		$('#o_'+name+' .selecter').css('min-width', min_width)
	})
}

export default defineComponent({
	name: 'Toggle',
	components: {
		AgeS
	},
	props: {
		name: {
			type: String,
			required: true
		},
		disp: {
			type: Object
		},
		sel: {
			type: Object
		}
	},
	mounted() {
		resize_selecter(this.name)
	},
	updated() {
		resize_selecter(this.name)
	},
	methods: {
		goto(id) {
			this.$router.push("/profile/"+id)
		},
		open() {
			this.opened = 'open'
		},
		close() {
			this.opened = 'closed'
		},
		dropdown_select(option) {
			this.text = option.text
			let filter_in_store = this.store.looking_for[this.name]
			filter_in_store.key = option.key
			filter_in_store.text = option.text
			filter_in_store.filter = option.filter
			bus.emit('search')
			this.close()
		},
		checkbox_click(name, option, index) {
			// console.log(name, '<n o>',option, 'i',index)
			// religion <n o> Proxy(Object) {key: 'mu', text: 'Muslim', filter: 'filter3=religion,eq,mu', selected: false}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: false i mu
			
		}
	},
	computed: {
		component_passed() {
			if (this.disp === undefined)
				return false
			else
				return true
		},
		in_store() {
			if (this.store.looking_for.hasOwnProperty(this.name))
				return 'is_set'
			else
				return ''
		}
	},
	data() {
		
		let store = inject("store").state

		let data = {
			store,
			cross_shown:	false,
			opened: 		'closed',
			display_name: 	capitalize_first_letter(this.name),
		}

		const filter = filters[this.name]

		if (filter.type == 'custom') {

			data = {
				...data,
				type: 			'custom',
				text: 			filter.placeholder
			}

		} else if (filter.type == 'dropdown') {
			
			if (this.name in store.looking_for) {
				const key = store.looking_for[this.name].key
				data = {
					...data,
					key,
					filter,
					type: 			filter.type,
					text: 			filter.options[key].text,
				}
			} else {
				data = {
					...data,
					filter,
					type: 			filter.type,
					text: 			filter.placeholder,
				}
			}

		} else if (filter.type == 'checkboxes') {

			let options = dc(filter.options)
			for (let key in options) {
				options[key].selected = false
			}

			let text = '<strong>'+data.display_name+'</strong>';
			let is_anything_set = false

			if (this.name in store.looking_for) {
				for (const key in store.looking_for[this.name]) {
					options[key].selected = true
					is_anything_set	= true
				}
			}

			if (is_anything_set) {
				text += ': '
				const _options = Object.entries(options)
				const length = _options.length;
				_options.forEach(([key, value], index) => {
					text += value.text
					if (index !== length - 1) {
						text += ', '
					}
				});
			}
			
			data = {
				...data,
				options,
				text,
				type: 			filter.type
			}
		}

		return data

	}
})

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}

function capitalize_first_letter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// deep copy
function dc(obj) {
	return JSON.parse(JSON.stringify(obj))
}

</script>

<style>



</style>