<template>
	<div id="age_inner">
		From
		<input type="text" name="min_age" v-model="min_age" />
		to
		<input type="text" name="max_age" v-model="max_age"  />
		<!-- <div>
			bbbbb bbbbb bbbbb bbbbb  
		</div> -->
	</div>
</template>


<script setup>

	import use_user_store from '@/store/User_Store'
	const user_store = use_user_store()
	const min_age = user_store.looking_for.age.min
	const max_age = user_store.looking_for.age.max
	
</script>


<style scoped>
	input {
		width: 2em;
		width: 3ch;
		box-sizing: border-box;
		margin: 0 0.2em;
	}

	#age_inner {
		white-space: nowrap;
	}
</style>