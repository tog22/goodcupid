<template>
	<div id="inner_main">
		<div id="top_zone">
			<!-- <div id="profile_picture">
				<img src="https://via.placeholder.com/150" alt="Profile picture">
			</div>
			<div id="profile_name">
				<h1>
					{{ store.user.name }}
				</h1>
			</div> -->
		</div>
		<div id="profile_text">
			<section v-if="about_me">
				<h2>
					About Me
				</h2>
				<div class="section_contents">
					{{ about_me }}
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

		return {
			store: 			
				store_parent.state,
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

	}
})

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}

</script>