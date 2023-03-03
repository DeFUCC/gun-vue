<script setup>
import { currentRoom } from '#composables';
</script>

<template lang="pug">
.flex.flex-col
	.p-1
		project-list(
			:key="currentRoom.pub"
			:pub="currentRoom.pub"
			@open="$router.push(`/projects/${encodeURI($event)}`)"
			)
</template>