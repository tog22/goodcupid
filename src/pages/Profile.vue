<template>
	<div id="profile_page" class="inner_main">
		<div v-if="!loaded">
			Loading...
		</div>
		<div id="top_zone" v-if="loaded">
			<img v-if="pic" id="profile_pic" :src="'/images/profile_pics/'+pic" alt="Profile picture" />
			<div class="s_right">
				<div class="s_top">

				</div>
				<div class="s_middle">
					<h1 id="name">
						{{ name }}
					</h1>
				</div>
				<div class="s_bottom">
					<div v-if="is_user">
						<router-link to="/edit">Edit profile</router-link>
						|
						<a href="#">
							Log out
						</a>
					</div>
				</div>
			</div>
		</div>
		<div id="lower_zone" v-if="loaded">
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
				for (let key in response) {
					this[key] = response[key]
				}
				this.loaded = true
			})
		}


	},
	data() {
		
		let data = {}
		data.loaded = false
		data.is_user = false
		// data.store = inject("store").state

		if (typeof(this.$route.params.id) == "undefined") {
			data.is_user = true
			const user_store = use_user_store()
			data = { ...data, ...user_store.user_profile }
			data.loaded = true
		}

		return data

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

#top_zone .s_right {
	display: flex;
	flex-direction: column;
}

#top_zone .s_right .s_top {
	height: 60px;
}

#top_zone .s_right .s_middle {
	height: 60px;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
}
#top_zone .s_right .s_bottom {
	height: 60px;
}

h1#name {
	font-weight: 500;
	margin: 0;
}

</style>