<template>
	<span>
		{{ l.height.min }}cm and up
	</span>
</template>

<script setup>
	import { inject } from 'vue'
	const l = inject("store").state.looking_for
</script>