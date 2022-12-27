<script setup>
</script>

<template lang="pug">
router-view(v-slot="{ Component }")
	transition(name="fade")
		component(:is="Component" )
</template>