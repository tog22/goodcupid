<template>
	<div class="option">
		<div class="selecter dropdown">
			<div 
				v-for="(option, index) in filter.options"
				:key="'o'+index"
				@click="text = option.text"
			>
				<span v-html="option.text"></span>
			</div>
		</div>
		<div class="chosen">
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

// Auxiliaries
import filters from '@/auxiliaries/Filters'
import use_user_store from '@/store/User_Store'


/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Toggle',
	components: {
	},
	props: {
		opt: {
			required: true,
			type: String
		}
	},
	methods: {
		goto(id) {
			this.$router.push("/profile/"+id)
		},
	},
	data() {
		
		let store_parent = inject("store")
		const user_store = use_user_store()
		const selected = user_store.looking_for[this.opt]
		const filter = filters[this.opt]
		console.log(filter.options)

		return {
			store:			store_parent.state,
			filter:			filter,
			text: 			filter.options[selected].text,
			cross_shown:	false,
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

<style scoped>

.option {
	position: relative;
}

.option .chosen,
.option .selecter {
	padding: 7px 1.5em 7px 1.5em;
	display: inline-block;
	border-radius: 18px;
	line-height: 22px;
	font-weight: bold;
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

.selecter {
	position: absolute;
	z-index: 1;
	background-color: #186BCC; /* light =  #BFE4EF; /*  #508ACC; */
	color: white;
}

</style>