<template>
	<div id="inner_main">
		<div id="top_zone">
			<img id="profile_pic" :src="'/images/profile_pics/'+pic" alt="Profile picture" />
			<div id="name_etc">
				<h1 id="name">
					{{ name }}
				</h1>
			</div>
		</div>
		<div id="lower_zone">
			<div id="profile_text">
				<section v-if="about_me">
					<h2>
						About Me
					</h2>
					<div class="section_contents">
						{{ about_me }}
					</div>
				</section>
				<section v-if="favourite_media">
					<h2>
						Favourite shows, movies, music or books
					</h2>
					<div class="section_contents">
						{{ favourite_media }}
					</div>
				</section>
				<section v-if="message_me_if">
					<h2>
						 Message me if
					</h2>
					<div class="section_contents">
						{{ message_me_if }}
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
								{{ age }}
							</div>
						</div>
						<div class="row">
							<div>
								Height:
							</div>
							<div>
								{{ height }}
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
import store from '@/store/Store'
import dapi from '@/auxiliaries/Dummy_Server'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Profile',
	components: {
	},
	data() {
		
		/*******************
		**  📦 DATA STORE **
		*******************/
		let store_parent = inject("store")

		if (typeof(this.$route.params.id) == "undefined") {
			
			return {
				store: 			
					store_parent.state,
				name:
					dapi.user_profile.name,
				id:
					dapi.user_profile.pid,
				pic:
					dapi.user_profile.pics[0],
				about_me: 		
					dapi.user_profile.about_me,
				age:			
					dapi.user_profile.age,
				height:
					dapi.user_profile.height,
				favourite_media: 
					dapi.user_profile.favourite_media,
				message_me_if:
					dapi.user_profile.message_me_if,

			}

		} else {
			
			let id = this.$route.params.id
			let profile = dapi.profiles.find(p => p.pid == id)

			return {
				store: 			
					store_parent.state,
				name:
					profile.name,
				id:
					profile.pid,
				pic:
					profile.pics[0],
				about_me: 		
					profile.about_me,
				age:			
					profile.age,
				height:
					profile.height,
				favourite_media: 
					profile.favourite_media,
				message_me_if:
					profile.message_me_if,

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