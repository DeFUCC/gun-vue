<script setup>
</script>

<template lang="pug">
router-view(v-slot="{ Component }")
	transition(name="fade" mode="out-in" appear)
		component(:is="Component" )
</template>