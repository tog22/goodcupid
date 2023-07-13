<template>
	<div id="login_page" class="inner_main">
		<h1 id="page_title">
			Log in
		</h1>
		<form @submit="on_submit" id="login_form">
			<div class="s_item">
				<label for="email">
					Email
				</label>
				<input type="text" id="email" name="email" v-model="email" />
			</div>
			<div class="s_item">
				<label for="password">
					Password
				</label>
				<input type="password" id="password" name="password" v-model="password" />
			</div>
			<input type="submit" value="Submit" />
		</form>
	</div>
</template>

<script setup>
/*******************
**   ⤵️ IMPORTS   **
*******************/

import { inject, ref } from 'vue'
import fn from '@/auxiliaries/Functions'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

const email = ref('')
const password = ref('')

function on_submit() {
	const url = ''
}

</script>

<style>


</style>