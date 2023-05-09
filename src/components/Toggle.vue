<template>
	<div :class="'option '+open" :id="opt">
		<div class="selecter dropdown"  v-if="type == 'dropdown'" >
			<div class="close" @click="close_toggle">
				×
			</div>
			<div v-if="type == 'dropdown'" class="dropdown">
				<div 
					v-for="(option, index) in filter.options"
					:key="'o'+index"
					@click="text = option.text"
				>
					<span v-html="option.text"></span>
				</div>
			</div>
			<div v-else-if="type == 'custom'" class="custom">
				
			</div>
		</div>
		<div class="selecter" v-if="opt == 'age'">
			<div class="close" @click="close_toggle">
				×
			</div>
			<div class="s_content">
				<Age />
			</div>
		</div>
		<div class="chosen" @click="open_toggle">
			<span v-html="text"></span>
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
import filters from '@/auxiliaries/Filters'
import use_user_store from '@/store/User_Store'

// Components
import Age from './Toggles/Age.vue'


/*********************
**   *️⃣ MAIN CODE   **
*********************/

function resize_selecter(opt) {
	$(document).ready(function() {
		let min_width = $('#o_'+opt+' .chosen').width() + 'px';
		$('#o_'+opt+' .selecter').css('min-width', min_width)
	})
}

export default defineComponent({
	name: 'Toggle',
	components: {
		Age
	},
	props: {
		opt: {
			required: true,
			type: String
		}
	},
	mounted() {
		resize_selecter(this.opt)
	},
	updated() {
		resize_selecter(this.opt)
	},
	methods: {
		goto(id) {
			this.$router.push("/profile/"+id)
		},
		open_toggle() {
			if (this.open == 'closed') {
				this.open = 'open'
			} else {
				this.open = 'closed'
			}
		},
		close_toggle() {
			if (this.open == 'open') {
				this.open = 'closed'
			} else {
				this.open = 'open'
			}
		}
	},
	data() {
		
		let store_parent = inject("store")
		const user_store = use_user_store()
		const filter = filters[this.opt]

		if (filter.type == 'dropdown') {
			
			const selected = user_store.looking_for[this.opt]

			return {
				store:			store_parent.state,
				open: 			'closed',
				filter:			filter,
				type: 			filter.type,
				text: 			filter.options[selected].text,
				cross_shown:	false,
			}

		} else if (filter.type == 'custom') {
			
			return {
				open: 			'closed',
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

.option .chosen,
.option .selecter.dropdown {
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