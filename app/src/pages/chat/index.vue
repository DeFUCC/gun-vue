<script setup>
import { currentRoom } from '#composables';

</script>

<template lang="pug">
chat-room(
	:key="currentRoom.pub"
	@account="$router.push(`/users/${$event}`)"
	)
</template>