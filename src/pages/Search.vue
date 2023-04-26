<template>
	<div id="inner_main">
		<div id="search">
			<form @submit="on_submit">
				<div class="s_item">
					<label>
						Mongoness
					</label>
					<input />
				</div>
			</form>
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
import store from '@/store/Store'
import dapi from '@/auxiliaries/Dummy_Server'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Search',
	components: {
	},
	data() {
		
		/*******************
		**  📦 DATA STORE **
		*******************/
		let store_parent = inject("store")

		return {
			store: 			
				store_parent.state,

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