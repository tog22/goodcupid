<template>
	<header>
		<div id="menu_bar">
			<div id="logo_and_title" @click="$router.push('/')">
				<!-- <img id="logo" src="/images/telescope.png" height="40" width="40" alt="🔭" /> -->
				<div id="app_title">GoodCupid</div>
			</div>
			<div id="menu_zone">
				<div id="navbar_links">
					<router-link to="/search">
						Search
					</router-link>
					<router-link to="/message">
						Message
					</router-link>
					<router-link to="/profile">
						Profile
					</router-link>
				</div>
				<div id="dropdown_container">
					<div class="menu_icon" @click="is_menu_open = !is_menu_open">
						☰
					</div>
					<div id="menu_position">
						<div v-if="is_menu_open" id="basic_menu">
							<p v-for="link in menu_links" :key="link.title" v-bind="link">
								<a :href="link.url">
									<span v-html="link.title"> </span>
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
	
	<script>
	/*******************
	**   ⤵️ IMPORTS   **
	*******************/
	
	import { defineComponent } from 'vue'
	
	// Auxiliaries
	// import bus from '@/auxiliary/bus'
	
	// Components
	// import Debug_Display from '@/components/Debug_Display.vue'
	
	/*********************
	**   *️⃣ MAIN CODE   **
	*********************/
	
	export default {
		name: 'Menu_Bar',
		components: {
			// Debug_Display
		},
		data() {
			return {
				is_menu_open: false,
				menu_links: [
				{
					title: 'Search',
					url: '/search'
				},
				{
					title: 'Message',
					url: '/message'
				},
				{
					title: 'Profile',
					url: '/profile'
				}
				]
			}
		}
	}
</script>

<style scoped>

header {
	background-color: var(--primary);
}

#menu_bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	color: white;
	font-weight: bold;
	padding-top: 0.2em;
	padding-bottom: 0.2em;
	height: 62px;
	font-family: 'Poppins', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

#menu_bar a,
#menu_bar a:visited {
	color: white;
	text-decoration: none;
}

#logo_and_title {
	font-size: 21px;
	letter-spacing: 0.01em;
	cursor: pointer;
	
	display: flex;
	align-items: baseline;
}

#logo {
	margin-right: 14px;
	font-size: 1.6em;
}

#app_title {
	font-size: 1.45em;
	font-weight: 600;
	margin-right: 2em;
	text-transform: none;
	padding-bottom: 0.15em; /* to align with logo */
}

#navbar_links {
	/* font-family: 'Poppins', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; */
	font-weight: bold;
}

#menu_bar .menu_icon {
	position: relative;
	top: -0.12em;
	font-size: 2em;
}
#basic_menu {
	z-index: 2;
	background-color: white;
	position: absolute;
	right: 0px;
	top: 80px;
	padding: 1em;
	border: 1px solid #ddd;
}



/********************
NAVBAR LINKS
*/

#navbar_links a::after {
	content: ' • ';
	margin: 0 0.5em;
}

#navbar_links a:last-child::after {
	content: none;
}

/********************
UNUSED HAMBURGER MENU
*/

.menu_icon {
	cursor: pointer;
}

#menu_position {
	position: relative;
}

#basic_menu {
	position: absolute;
	top: -1px;
	right: 0;
	
	background-color: white;
	border: 1px solid black;
	
	font-size: 1em;
	white-space: nowrap;
	padding: 1em 2em 1.2em;
}

@media screen and (max-width: 767px) and (hover: none) {
	#basic_menu {
		font-size: 0.8em;
	}
}

@media screen and (max-width: 767px) and (hover: on-demand) {
	#basic_menu {
		font-size: 0.8em;
	}
}

#basic_menu p:first-child {
	margin-top: 0;
}

#basic_menu p:last-child {
	margin-bottom: 0;
}

#basic_menu p,
#basic_menu a,
#basic_menu a:visited,
#basic_menu a:active {
	color: rgb(0, 0, 238);
	cursor: pointer;
}

#basic_menu a:hover {
	color: black;
}
</style>
