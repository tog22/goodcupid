<template>
	<div id="message_page" class="inner_main">
		<div id="loading" v-if="!(is_profile_loaded && are_messages_loaded)">
			Loading...
		</div>
		<div id="content_zone" v-else>
			<div id="person">
				<div class="profile_pic">
					<img :src="'/images/profile_pics/'+profile.pic" />
				</div>
				<div class="name">
					{{ profile.name }}
				</div>
			</div>
			<div id="messages">
				<div class="message" :class="message.sender" v-for="(message, index) in messages" :key="'m'+index">
					<div class="s_content">
						{{ message.message }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

/*******************
**   ⤵️ IMPORTS   **
*******************/

// External libraries
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Auxiliaries
import api from '@/auxiliaries/api'




/*********************
**   *️⃣ MAIN CODE   **
*********************/

const is_profile_loaded = ref(false)
const are_messages_loaded = ref(false)
const store = inject("store").state

const profile = ref({})
const route = useRoute()
// if (typeof(route.params.id) == "undefined") {}

let id = route.params.id
const get_url = '/records/profiles/'+id
api.get(get_url).then((response) => {
	response.pics = JSON.parse(response.pics)
	profile.value.pic = response.pics[0]
	profile.value.name = response.name
	is_profile_loaded.value = true
})

const messages = ref([])
const get_url2 = '/records/messages/?filter1=from_pid,eq,'+store.user.uid+'&filter1=to_pid,eq,'+id+'&filter2=from_pid,eq,'+id+'&filter2=to_pid,eq,'+store.user.uid+'&order=date_time,asc'
api.get(get_url2).then((response) => {
	for (let i in response.records) {
		if (response.records[i].from_pid == store.user.uid) {
			response.records[i].sender = 'user'
		} else {
			response.records[i].sender = 'other'
		}
	}
	messages.value = response.records
	are_messages_loaded.value = true
})




/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}


</script>

<style>

#person {
	display: flex;
	align-items: center;
}

.name {
	font-size: 2em;
	font-weight: bold;
}


</style>