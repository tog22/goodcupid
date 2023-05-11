<template>
	<form id="age_inner" @submit.prevent="submit" @keydown.enter="submit">
		From
		<input type="text" name="min_age" v-model="l.age.min" />
		to
		<input type="text" name="max_age" v-model="l.age.max"  />
		<input type="submit" class="hide" />
	</form>
</template>


<script setup>
	
	import { inject } from 'vue'
	const l = inject("store").state.looking_for

	const props = defineProps({
		close: {
			type:		Function,
			required:	true
		}
	})

	function submit() {
		if (validate()) {
			props.close()
		}
	}

	function validate() {
		if (!/^\d+$/.test(l.age.min) || !/^\d+$/.test(l.age.max)) {
			alert("Age must be a number")
			return false
		}
		if (l.age.min < 18) {
			alert("Minimum age is 18")
			return false
		}
		if (l.age.max > 180) {
			alert("Maximum age is 180")
			return false
		}
		if (l.age.min > l.age.max) {
			alert("Minimum age must be less than maximum age")
			return false
		}
		return true
	}

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