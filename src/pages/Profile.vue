<template>
	<div id="inner_main">
		<div id="top_zone">
			<img id="profile_pic" :src="'/images/profile_pics/'+p.pic" alt="Profile picture" />
			<div id="name_etc">
				<h1 id="name">
					{{ p.name }}
				</h1>
			</div>
		</div>
		<div id="lower_zone">
			<div id="profile_text">
				<section v-if="p.about_me">
					<h2>
						About Me
					</h2>
					<div class="section_contents">
						{{ p.about_me }}
					</div>
				</section>
				<section v-if="p.favourite_media">
					<h2>
						Favourite shows, movies, music or books
					</h2>
					<div class="section_contents">
						{{ p.favourite_media }}
					</div>
				</section>
				<section v-if="p.message_me_if">
					<h2>
						 Message me if
					</h2>
					<div class="section_contents">
						{{ p.message_me_if }}
					</div>
				</section>
			</div>
			<div id="sidebar">
				<section id="details">
					<h2>
						My details
					</h2>
					<div class="section_contents">
						<div class="row">
							<div>
								Age:
							</div>
							<div>
								{{ p.age }}
							</div>
						</div>
						<div class="row">
							<div>
								Height:
							</div>
							<div>
								{{ p.height }}
							</div>
						</div>
					</div>
				</section>
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
import api from '@/auxiliaries/api'
import use_user_store from '@/store/User_Store'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Profile',
	components: {
	},
	created() {
		
		// Get data from API

		if (typeof(this.$route.params.id) != "undefined") {
			let id = this.$route.params.id
			const get_url = '/records/profiles/'+id
			api.get(get_url).then((response) => {
				response.pics = JSON.parse(response.pics)
				response.pic = response.pics[0]
				this.p = response
			})
		}


	},
	data() {
		
		let store_parent = inject("store")
		let profile = {a:1}

		if (typeof(this.$route.params.id) == "undefined") {
			
			const user_store = use_user_store()
			profile = user_store.user_profile

		}

		return {
			store: 		store_parent.state,
			p: 			profile
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