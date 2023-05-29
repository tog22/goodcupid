<template>
	<div class="s_content">
		<form id="age_inner" @submit.prevent="submit" @keydown.enter="submit">
			From
			<input type="text" name="min_age" v-model="min" />
			to
			<input type="text" name="max_age" v-model="max"  />
			<input type="submit" class="hide" />
		</form>
	</div>
	<div class="close" @click="submit">
		×
	</div>
</template>


<script setup>
	
	import bus from '@/auxiliaries/bus'
	import { inject, ref } from 'vue'
	const l = inject("store").state.looking_for

	let min = 18
	let max = 99
	if ('age' in l) {
		min = l.age.min
		max = l.age.max
	}
	min = ref(min)
	max = ref(max)

	const props = defineProps({
		close: {
			type:		Function,
			required:	true
		}
	})

	function submit() {
		if (validate()) {
			l.age = {
				min: min.value,
				max: max.value
			}
			props.close()
			bus.emit('search')
		}
	}

	function validate() {
		if (!/^\d+$/.test(min.value) || !/^\d+$/.test(max.value)) {
			alert("Age must be a number")
			return false
		}
		if (min.value < 18) {
			alert("Minimum age is 18")
			return false
		}
		if (max.value > 180) {
			alert("Maximum age is 180")
			return false
		}
		if (min.value > max.value) {
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
	}

	#age_inner {
		white-space: nowrap;
	}
</style>