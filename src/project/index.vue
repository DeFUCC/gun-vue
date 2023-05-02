<script setup>
import { currentRoom } from '#composables';

import { ProjectList } from '../components'
</script>

<template lang="pug">
.flex.flex-col
	project-list(
		@open="$router.push(`/projects/${encodeURI($event)}`)"
		)
</template>