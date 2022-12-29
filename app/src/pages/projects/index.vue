<script setup>
import { currentRoom } from '#components';
</script>

<template lang="pug">
.flex.flex-col
	project-list(
		:key="currentRoom.pub"
		:pub="currentRoom.pub"
		@open="$router.push(`/projects/${encodeURI($event)}`)"
		)
</template>