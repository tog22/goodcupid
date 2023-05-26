<template>
	<div id="inbox_page" class="inner_main">
		<div id="loading" v-if="!loaded">
			Loading...
		</div>
		<div id="content_zone">
			<h1>
				Messages
			</h1>
		</div>
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
			<div class="message" v-for="(message, index) in messages" :key="'m'+index">
				<div class="message_top">
					<div class="message_left">
						<div class="message_from">
							From: {{ message.from }}
						</div>
						<div class="message_to">
							To: {{ message.to }}
						</div>
					</div>
					<div class="message_right">
						<div class="message_date">
							{{ message.date }}
						</div>
					</div>
				</div>
				<div class="message_middle">
					<div class="message_subject">
						{{ message.subject }}
					</div>
					<div class="message_body">
						{{ message.body }}
					</div>
				</div>
				<div class="message_bottom">
					<div class="message_left">
						<div class="message_reply">
							Reply
						</div>
					</div>
					<div class="message_right">
						<div class="message_delete">
							Delete
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

let messages = ref([])

const loaded = ref(false)
const store = inject("store").state
const uid = store.user.uid

const get_url = '/records/messages/?filter=to,eq,'+uid
api.get(get_url).then((response) => {
	for (let key in response) {
		this[key] = response[key]
	}
	loaded = true
})


</script>