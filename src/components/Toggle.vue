<template>
	<div :class="'option '+opened" :id="'o_'+name">
		<div class="selecter dropdown"  v-if="type == 'dropdown'" >
			<div class="close" @click="close">
				×
			</div>
			<div v-if="type == 'dropdown'" class="dropdown">
				<div 
					v-for="(option, index) in filter.options"
					:key="'o'+index"
					@click="dropdown_select(option)"
				>
					<span v-html="option.text"></span>
				</div>
			</div>
			<div v-else-if="type == 'custom'" class="custom">
				code for type=custom goes here
			</div>
		</div>
		<div class="selecter" v-if="name == 'age'">
			<div class="close" @click="close">
				×
			</div>
			<div class="s_content">
				<div v-if="component_passed">
					<component :is="sel" :close="close" />
				</div>
			</div>
		</div>
		<div class="chosen" @click="open">
			<div v-if="component_passed">
				<component :is="disp" />
			</div>
			<div v-else-if="type == 'dropdown'">
				<span v-html="text"></span>
			</div>
			<div v-else>
				code for when component not passed or not a dropdown
			</div>
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
		}
	},
	data() {
		
		let store = inject("store").state
		const filter = filters[this.name]

		if (filter.type == 'dropdown') {
			
			const key = store.looking_for[this.name].key

			return {
				store,
				filter,
				key,
				opened: 		'closed',
				type: 			filter.type,
				text: 			filter.options[key].text,
				cross_shown:	false,
			}

		} else if (filter.type == 'custom') {
			
			return {
				store,
				opened: 		'closed',
				type: 			'custom',
				text: 			filter.placeholder
			}

		}

	}
})

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}

</script>

<style>

.option {
	position: relative;
}

.option .chosen,
.option .selecter {
	padding: 7px 1.5em 7px 1.5em;
	display: inline-block;
	line-height: 22px;
	font-weight: bold;
}

.option .chosen
/* ,
.option .selecter.dropdown */
{
	border-radius: 18px;
}

.option .selecter {
	border-radius: 10px;
}
.option .chosen {
	margin-right: 1.5em;
	height: 36px;
}

.option .chosen::after {
	content: '▾';
    position: relative;
    left: 0.5em;
}

.option .s_below {
	height: 1.5em;
}

.closed .selecter {
	display: none;
}

.selecter {
	position: absolute;
	z-index: 1;
	width: max-content;
	max-width: 400px;

	background-color: #186BCC; /* light =  #BFE4EF; /*  #508ACC; */
	color: white;
	box-sizing: content-box;
}

.selecter input[type="text"] {
	border: none;
}

/***********************
**  SPECIFIC OPTIONS  **
***********************/



</style>