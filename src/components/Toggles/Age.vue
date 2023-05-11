<template>
	<span>
		Ages {{ l.age.min }} to {{ l.age.max }}
	</span>
</template>

<script setup>
	import { inject } from 'vue'
	const l = inject("store").state.looking_for
</script>