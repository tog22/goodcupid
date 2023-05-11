<template>
	<div class="inner_main">
		<div id="search">
			<h2 class="section_title">
				Show me…
			</h2>
			<div class="s_content">
				<!-- <Toggle name="who" /> -->
				<Toggle name="age" :disp="Age" :sel="AgeS" />
				<!-- <Toggle name="distance" />
				<Toggle name="height" /> -->
			</div>
		</div>
		<div class="grid">
			<div 
				class="profile"
				v-for="p in profiles"
				:key="'p'+p.pid" 
				@click="goto(p.pid)"
			>
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
import { defineComponent, inject, markRaw } from 'vue'

// Auxiliaries
import api from '@/auxiliaries/api'

// Components
import Toggle from '../components/Toggle.vue'
import Age from '../components/Toggles/Age.vue'
import AgeS from '../components/Toggles/AgeS.vue'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Browse',
	components: {
		Toggle,
		Age,
		AgeS
	},
	created() {

		this.profiles = []
		if (Object.keys(this.$route.params).length === 0) {
			const get_url = '/records/profiles/'
			api.get(get_url).then((response) => {
				for (const profile_found of response.records ) {
					profile_found.pics = JSON.parse(profile_found.pics)
					profile_found.pic = profile_found.pics[0]
					this.profiles.push(profile_found)
				}
			})
		}

	},
	methods: {
		goto(id) {
			this.$router.push("/profile/"+id)
		},
		do_search() {
			let loading_profiles = []
			const get_url = '/records/profiles/'
		}
	},
	data() {
		
		/*******************
		**  📦 DATA STORE **
		*******************/
		let store_parent = inject("store")

		return {
			store:			store_parent.state,
			profiles:		[],
			Age: 			markRaw(Age),
			AgeS: 			markRaw(AgeS)
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

#search {
	background-color: white;
	padding: 2em 2em 0.5em 2em;
	border-radius: 8px;
	margin-bottom: 2em;
}

#search .s_content {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	margin-top: 2em;
}



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

@media screen and (max-width: 660px) {
	.name {
		font-size: 1.2em;
	}
}

</style>