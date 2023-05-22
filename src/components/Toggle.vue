<template>
	<div :class="'option '+opened+' '+in_store" :id="'o_'+name">
		<div v-if="type == 'dropdown'" class="selecter dropdown" >
			<div v-if="type == 'dropdown'" class="dropdown">
				<div 
					v-for="(option, index) in filter.options"
					:key="'o'+index"
					@click="dropdown_select(option)"
				>
					<span v-html="option.text"></span>
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
				×
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
			opened: 		'open',
			display_name: 	capitalize_first_letter(this.name),
		}

		const filter = filters[this.name]
		if (filter.type == 'dropdown') {
			const key = store.looking_for[this.name].key
			data = {
				...data,
				filter,
				key,
				type: 			filter.type,
				text: 			filter.options[key].text,
			}
		} else if (filter.type == 'custom') {
			data = {
				...data,
				type: 			'custom',
				text: 			filter.placeholder
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

</script>

<style>


</style>