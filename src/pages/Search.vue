<template>
	<div class="inner_main">
		<div id="search">
			<h2 class="section_title">
				Show me…
			</h2>
			<div class="s_content">
				<Toggle name="who" />
				<Toggle name="age" :disp="Age" :sel="AgeS" />
				<Toggle name="height" :disp="Height" :sel="HeightS" />
				<Toggle name="religion" />
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
import { defineComponent, inject, toRaw, markRaw } from 'vue'

// Auxiliaries
import api from '@/auxiliaries/api'
import bus from '@/auxiliaries/bus'

// Components
import Toggle from '../components/Toggle.vue'
import Age from '../components/Toggles/Age.vue'
import AgeS from '../components/Toggles/AgeS.vue'
import Height from '../components/Toggles/Height.vue'
import HeightS from '../components/Toggles/HeightS.vue'

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
		this.do_search()
		bus.on('search', () => {
			this.do_search()
		});
	},
	methods: {
		goto(id) {
			this.$router.push("/profile/"+id)
		},
		build_search() {
			this.search_params = {}
			console.log(this.lf,'lf')
			let filt_num = 1
			for (let key in this.lf) {
				const filt = toRaw(this.lf[key])
				// let prefix = 'filter'+filt_num+'='
				let prefix = 'filter='
				if ('filt' in filt) {
					this.search_params[key] = '';
					const length = filt.filt.length
					filt.filt.forEach((f, i) => {
						this.search_params[key] += prefix+f
						if (i < length-1) {
							this.search_params[key] += '&'
						}
					})
				} else if ('min' in filt && 'max' in filt) {
					this.search_params[key] = prefix+key+',ge,'+filt.min+'&'
					this.search_params[key] += prefix+key+',le,'+filt.max
				} else if ('min' in filt) {
					this.search_params[key] = prefix+key+',ge,'+filt.min
				} else if ('max' in filt) {
					this.search_params[key] = prefix+key+',le,'+filt.max
				} else if (Array.isArray(filt)) {
					if (filt.length > 0) {
						this.search_params[key] = prefix+key+',in,'+filt.join(',')
					}
					/* filt.forEach((f, i) => {
						this.search_params[key] = prefix+key+',eq,'+f
						if (i < filt.length-1) {
							this.search_params[key] += '&'
						}
						filt_num++
						// prefix = 'filt'+filt_num+'='
					}) */
				}
				// filt_num++
			}
			lo('search_params = ')
			console.log(this.search_params)
		},
		do_search() {
			this.build_search()
			let loading_profiles = []
			let get_url = '/records/profiles?'
			for (let key in this.search_params) {
				get_url += this.search_params[key]+'&'
			}
			get_url = get_url.slice(0, -1)
			lo('https://gc6.philosofiles.com/api'+get_url)
			api.get(get_url).then((response) => {
				console.log(response)
				for (const profile_found of response.records ) {
					profile_found.pics = JSON.parse(profile_found.pics)
					profile_found.pic = profile_found.pics[0]
					loading_profiles.push(profile_found)
				}
				this.profiles = loading_profiles
			})


		}

	},
	data() {
		
		/*******************
		**  📦 DATA STORE **
		*******************/
		let store = inject("store").state

		return {
			store,
			lf: 			store.looking_for,
			search_params:  {},
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

<script setup>

// let lf = inject("store").state.looking_for
// watch(lf, (new_val, old_val) => {
// 	alert(33444)
// })



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