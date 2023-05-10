<template>
	<span>
		Ages {{ min_age }} to {{ max_age }}
	</span>
</template>

<script setup>
	import use_user_store from '@/store/User_Store'
	const user_store = use_user_store()
	const min_age = user_store.looking_for.age.min
	const max_age = user_store.looking_for.age.max
</script>