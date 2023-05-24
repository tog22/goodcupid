<template>
	<div id="edit" class="inner_main">
		<h1 id="page_title">
			Your profile
		</h1>
		<form @submit="on_submit" class="form1 edit_profile_form">
			<div class="basic_details">
				<div class="s_item">
					<label for="name">
						Name:
					</label>
					<input type="text" id="name" name="name" v-model="name" />
				</div>
				<div class="s_item">
					<label for="gender">
						Gender:
					</label>
					<select id="gender" v-model="gender">
						<option value="">Please select</option>
						<option value="m">Man</option>
						<option value="w">Woman</option>
					</select>
				</div>
				<div class="s_item">
					<label for="looking_for">
						Looking for:
					</label>
					<select id="looking_for" v-model="looking_for">
						<option value="">Please select</option>
						<option value="m">Men</option>
						<option value="w">Women</option>
						<option value="b">Both</option>
					</select>
				</div>
				<div class="s_item">
					<label for="age">
						Age:
					</label>
					<input type="text" id="age" name="age" v-model="age" />
				</div>
				<div class="s_item">
					<label for="height">
						Height (cm):
					</label>
					<input type="text" id="height" name="height" v-model="height" />
				</div>
			</div>
			<div class="prompts">
				<div class="s_item">
					<label for="about_me"> 
						About me
					</label>
					<textarea v-model="about_me" id="about_me" name="about_me" rows="5">
					</textarea>
				</div>
			</div>
			<div class="prompts">
				<div class="s_item">
					<label for="favourite_media"> 
						Favourite shows, movies, music or books
					</label>
					<textarea v-model="favourite_media" id="favourite_media" name="favourite_media" rows="5">
					</textarea>
				</div>
			</div>
			<div class="prompts">
				<div class="s_item">
					<label for="message_me_if"> 
						Message me if
					</label>
					<textarea v-model="message_me_if" id="message_me_if" name="message_me_if" rows="5">
					</textarea>
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
import { defineComponent, inject } from 'vue'

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
		const store = inject('store').state
		data = { ...data, ...store.user_profile }
		console.log(data)
		return data

	}
})
</script>

<style>

.edit_profile_form
,
.edit_profile_form input,
.edit_profile_form select 
{
	font-size: 1.1em;
}
.basic_details {
	display: table;
}

.basic_details .s_item {
	display: table-row;
}

.basic_details label,
.basic_details input,
.basic_details select {
	display: table-cell;
	margin-bottom: 1em;
}

.basic_details label {
	padding-right: 2em;
}

.form1 input[type="submit"] {
	margin-top: 1em;
}

.prompts label {
	display: block;
	margin-bottom: 0.5em;
	font-weight: bold;
	font-size: 1.15em;
}

.prompts > div {
	margin: 1em 0;
}

.prompts textarea {
	width: 100%;
	max-width: 600px;
	
}

</style>