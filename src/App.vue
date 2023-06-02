<template>
	<Menu_Bar/>
	<main>
		<RouterView />
	</main>
</template>

<script>
/*******************
**   ⤵️ IMPORTS   **
*******************/

// External libraries
import { defineComponent, provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Auxiliaries
import api from '@/auxiliaries/api'
import store from '@/store/Store'

// Components
import Menu_Bar from '@/components/chrome/Menu_Bar.vue'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'App',
	components: {
		Menu_Bar
	},
	setup() {
		/*******************
		**  📦 DATA STORE **
		*******************/
		provide('store', store)
		let store_state = store.state
		
		// For now, auto-login
		
	}
})

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}

</script>
