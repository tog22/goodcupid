<template>
	<div id="inbox_page" class="inner_main">
		<div id="loading" v-if="!is_loaded">
			<!-- Loading... -->
		</div>
		<div id="content_zone" v-else>
			<h1 id="page_title">
				Messages
			</h1>
			<div class="tabs">
				<a class="tab active">
					Received
				</a>
				<a class="tab">
					Sent
				</a>
				<!-- <a class="tab">
					Drafts
				</a>
				<a class="tab">
					Archived
				</a> -->
			</div>
			<div class="message_list">
				<div class="message" v-for="(message, index) in received" :key="'m'+index" @click="$router.push('/messages/'+message.id)">
					<div class="profile_pic">
						<img :src="'/images/profile_pics/'+message.pic" />
					</div>
					<div class="s_content">
						<div class="from">
							{{ message.name }}
						</div>
						<div class="body">
							{{ message.body }}
						</div>
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

// Auxiliaries
import api from '@/auxiliaries/api'




/*********************
**   *️⃣ MAIN CODE   **
*********************/

let received = ref({})
let sent = ref({})
const is_loaded = ref(false)
const store = inject("store").state

let self
let other
load_messages('to_pid', received)

function load_messages(direction, result) {
	
	self = direction
	other = self == 'to_pid' ? 'from_pid' : 'to_pid'

	const get_url = '/records/messages/?join=profiles&filter='+self+',eq,'+store.user.uid+'order=date_time,desc'//+'&exclude=message' // join goes first
	console.log('https://gc6.philosofiles.com/api'+get_url)

	api.get(get_url).then((response) => {
		
		if (!Object.hasOwn(response, 'records')) {
			return
		}

		let messages = {}
		for (const message of response.records) {
			
			if (message[other].pid in messages) {
				continue
			} // else...

			message[other].pics = JSON.parse(message[other].pics)
			messages[message[other].pid] = {
				name:		message[other].name,
				pic:		message[other].pics[0],
				id:			message[other].pid,
				to:			message.to_pid,
				subject:	message.subject,
				date:		message.date,
				body:		message.message
			}

			lo(messages[message[other].pid])

		}

		result.value = messages
		is_loaded.value = true
	})
	
}

/*******************
**	🛠 FUNCTIONS  **
*******************/

function lo(to_log) {
	console.log(to_log)
}


</script>

<style>

h1#page_title {
	margin-top: 0;
}

#inbox_page h1#page_title {
	margin-bottom: 10px;
}

.tabs {
  display: flex;
}

a.tab {
  padding: 0.6em 1em 0.3em;
  margin-right: 0.8em;
  cursor: pointer;
  /* flex: 1; */
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  color: #ccc;
  border-bottom: 3px solid #ccc;
}

a.tab.active {
  color: #aaa;
  border-bottom-color: #aaa;
}

.message_list {
	margin: 2em 0;
}


</style>