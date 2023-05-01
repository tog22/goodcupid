<template>
	<div id="edit" class="inner_main">
		<h1 id="page_title">
			Your profile
		</h1>
		<form @submit="on_submit" class="form1">
			<div class="basic_details">
				<div class="s_item">
					<label for="name">
						Name
					</label>
					<input type="text" id="name" name="name" v-model="name" />
				</div>
				<div class="s_item">
					<label for="age">
						Age
					</label>
					<input type="text" id="name" name="name" v-model="age" />
				</div>
			</div>
			<input type="submit" value="Save changes" />
		</form>
	</div>
</template>

<script>
/*******************
**   ⤵️ IMPORTS   **
*******************/

// External libraries
import { defineComponent } from 'vue'

// Auxiliaries
import use_user_store from '@/store/User_Store'

/*********************
**   *️⃣ MAIN CODE   **
*********************/

export default defineComponent({
	name: 'Edit',
	components: {
	},
	methods: {
		on_submit: 
		function() {
			alert(2)
		}
	},
	data() {
		
		let data = {}
		const user_store = use_user_store()
		data = { ...data, ...user_store.user_profile }
		console.log(data)
		return data

	}
})
</script>

<style>

.basic_details {
	display: table;
}

</style>