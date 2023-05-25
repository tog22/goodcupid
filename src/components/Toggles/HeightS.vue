<template>
	<form @submit.prevent="submit" @keydown.enter="submit">
		At least <input type="text" name="min_height" v-model="min" />cm
		<input type="submit" class="hide" />
	</form>
</template>


<script setup>
	
	import bus from '@/auxiliaries/bus'
	import { inject, ref } from 'vue'
	const l = inject("store").state.looking_for
	let min = 120
	if ('height' in l && 'min' in l.height) {
		min = l.height.min
	}
	min = ref(min)

	const props = defineProps({
		close: {
			type:		Function,
			required:	true
		}
	})
	function submit() {
		if (validate()) {
			l.height = {
				min: min.value
			}
			props.close()
			bus.emit('search')
		}
	}

	function validate() {
		if (!/^\d+$/.test(min.value)) {
			alert(min)
			alert("Height must be a number")
			return false
		}
		return true
	}

</script>


<style scoped>

	input {
		width: 2.5em !important;
		width: 3.5ch !important;
	}

</style>