<template>
	<span v-if="is_set">
		{{ l.height.min }}cm and up
	</span>
	<span v-else>
		Height
	</span>
</template>

<script setup>
	import { inject, ref } from 'vue'
	const l = inject("store").state.looking_for

	let is_set = ref(false)
	if (l.hasOwnProperty('height') && l.height.hasOwnProperty('min')) {
		is_set.value = true
	}
</script>