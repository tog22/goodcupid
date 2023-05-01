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
import fn from '@/auxiliaries/Functions'
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

		fn.login(1)

	}
})

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}

</script>
