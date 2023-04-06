<script setup>
import { currentRoom } from '#composables';

import { ChatRoom } from '../components'
</script>

<template lang="pug">
chat-room(
	:key="currentRoom.pub"
	@account="$router.push(`/users/${$event}`)"
	)
</template>