<template>
	<div id="inner_main">
		<div class="grid">
			<div class="profile" v-for="p in profiles" @click="goto(p.pid)">
				<img class="pic" :src="'/images/profile_pics/'+p.pics[0]" alt="Profile picture" />
				<div class="name">
					{{ p.name }}
				</div>
			</div>
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
	name: 'Browse',
	components: {
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
			store: 			
				store_parent.state,
			profiles:
				dapi.profiles

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

.grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 35px;
}

@media screen and (max-width: 600px) {
	.grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

.profile {
	text-align: center;
	/* width: 220px; */
	background-color: white;
	padding: 15px 15px 0px;
	border-radius: 8px;
	cursor: pointer;
}

img.pic {
	width: 100%;
	border-radius: 4px;
	vertical-align: bottom;
}

.name {
	font-size: 1.33em;
	font-weight: 500;
	line-height: 1.714em;
	margin-bottom: 0.15em;
}

</style>