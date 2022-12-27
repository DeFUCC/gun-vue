<script setup>
</script>

<template lang="pug">
.flex.flex-col
	.flex.gap-2.p-4
		router-link.button(:to="`/projects/my/`") My projects
		router-link.button(:to="`/projects/public/`") Public projects

	router-view(v-slot="{ Component }")
		transition(name="fade")
			component(:is="Component" )
</template>