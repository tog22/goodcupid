<template>
	<span v-if="is_set">
		{{ height_in_feet }} and up
	</span>
	<span v-else>
		Height
	</span>
</template>

<script setup>
	import { computed, inject, ref } from 'vue'
	const l = inject("store").state.looking_for

	let is_set = ref(false)
	if (l.hasOwnProperty('height') && l.height.hasOwnProperty('min')) {
		is_set.value = true
	}

	let height_in_feet = computed(() => {
		return cm_to_feet(l.height.min)
	})

	

	function cm_to_feet(cm) {
		const feet = Math.floor(cm / 30.48)
		const inches = Math.round((cm / 30.48 - feet) * 12)
		return `${feet}'${inches}"`
	}

</script>