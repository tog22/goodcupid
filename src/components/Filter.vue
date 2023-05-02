<template>
	<div class="option">
		Men <span class="s_light">who like women</span>
	</div>
</template>

<script>
/*******************
**   ⤵️ IMPORTS   **
*******************/

// External libraries
import { defineComponent, inject } from 'vue'

// Auxiliaries
import bus from '@/auxiliaries/bus'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Filter',
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
		}
	},
	data() {
		
		/*******************
		**  📦 DATA STORE **
		*******************/
		let store_parent = inject("store")

		return {
			store:			store_parent.state,
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


</style>