<template>
	<div :class="'option '+opened+' '+in_store" :id="'o_'+name">
		<div v-if="type == 'dropdown'" class="selecter dropdown" >
			<div class="dropdown">
				<div 
					v-for="(option, index) in filt.options"
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
		<div v-else-if="component_passed" class="selecter">
			<component :is="sel" :close="close" />
			<!-- <div class="s_content">
				<div v-if="component_passed">
					<component :is="sel" :close="close" />
				</div>
			</div>
			<div class="close" @click="close">
				×
			</div> -->
		</div>
		<div class="chosen" @click="open">
			<span v-if="in_store">
				<span v-if="component_passed">
					<component :is="disp" />
				</span>
				<span v-else-if="type == 'dropdown'">
					<span v-html="text"></span>
				</span>
				<span v-else-if="type == 'checkboxes'">
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
import { defineComponent, inject, toRaw } from 'vue'
import $ from 'jquery'

// Auxiliaries
import bus from '@/auxiliaries/bus'
import filts from '@/auxiliaries/Filters'

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
			let filt_in_store = this.store.looking_for[this.name]
			filt_in_store.key = option.key
			filt_in_store.text = option.text
			filt_in_store.filt = option.filt
			bus.emit('search')
			this.close()
		},
		checkbox_click(name, option, index) {
			
			/***********************
			**  Update the store  */

			let checked = !option.selected 
				// ↑ opposite, becuase it gets set after this function is called
			if (!this.store.looking_for.hasOwnProperty(name)) {
				this.store.looking_for[name] = []
			}
			let filt_in_store = this.store.looking_for[this.name]

			if (checked) {
				if (!filt_in_store.includes(index)) {
					filt_in_store.push(index)
				}
			} else {
				let i = filt_in_store.indexOf(index)
				filt_in_store.splice(i, 1)
			}

			/******************
			**  Redo search  */

			this.text = this.checkbox_text()
			bus.emit('search')

		},
		checkbox_text() {

			let text = '<strong>'+this.display_name+'</strong>'
			
			if (this.store.looking_for[this.name].length > 0) {
				text += ': <span class="s_light">'
				const selected = toRaw(this.store.looking_for[this.name])
				lo(selected)

				let do_cutoff = false
				const length = selected.length
				selected.forEach((value, index) => {

					if (do_cutoff) return

					text += this.options[value].text

					if (text.length > 65) { // 40 chars of this are HTML
						text += '…'
						do_cutoff = true
					} else if (index !== length - 1) {
						text += ', '
					}
				});
				text += '</span>'
			}

			return text
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

		const filt = filts[this.name]

		if (filt.type == 'custom') {
			/************ CUSTOM */

			data = {
				...data,
				type: 			'custom',
				text: 			filt.placeholder
			}

		} else if (filt.type == 'dropdown') {
			/******************* DROPDOWN */
			
			if (this.name in store.looking_for) {
				const key = store.looking_for[this.name].key
				data = {
					...data,
					key,
					filt,
					type: 			filt.type,
					text: 			filt.options[key].text,
				}
			} else {
				data = {
					...data,
					filt,
					type: 			filt.type,
					text: 			filt.placeholder,
				}
			}

		} else if (filt.type == 'checkboxes') {
			/******************* CHECKBOXES */

			let options = dc(filt.options)
			for (let key in options) {
				options[key].selected = false
			}

			let text = '<strong>'+data.display_name+'</strong>';
			let is_anything_set = false

			if (this.name in store.looking_for) {
				for (const code of store.looking_for[this.name]) {
					options[code].selected = true
					is_anything_set	= true
				}
			}

			if (is_anything_set) {
				text += ': <span class="s_light">'
				const selected = toRaw(store.looking_for[this.name])
				lo(selected)

				let do_cutoff = false
				const length = selected.length
				selected.forEach((value, index) => {

					if (do_cutoff) return

					text += options[value].text

					if (text.length > 65) { // 40 chars of this are HTML
						text += '…'
						do_cutoff = true
					} else if (index !== length - 1) {
						text += ', '
					}
				});
				text += '</span>'
			}
			
			data = {
				...data,
				options,
				text,
				type: 			filt.type
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