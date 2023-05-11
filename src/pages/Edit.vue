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
	padding-right: 1em;
	margin-bottom: 1em;
}

.form1 input[type="submit"] {
	margin-top: 1em;
}

</style>