<template>
	<form id="age_inner" @submit.prevent="close()">
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
	function tstclose() {
		alert(3333)
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