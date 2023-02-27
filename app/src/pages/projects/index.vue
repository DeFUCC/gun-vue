<script setup>
import { currentRoom, itemTypes, useNewDiscourseItem } from '#composables';

const { newItem, add } = useNewDiscourseItem()
</script>

<template lang="pug">
.flex.flex-col
	.p-1
		project-list(
			:key="currentRoom.pub"
			:pub="currentRoom.pub"
			@open="$router.push(`/projects/${encodeURI($event)}`)"
			)
	.p-2
		input(type="text" v-model="newItem.title")
		select(v-model="newItem.type")
			option(
				v-for="t in itemTypes" 
				:key="t.type" 
				:value="t.type"
				) {{ t.title }}

		pre {{ newItem }}
		button.button(@click="add()") Add
</template>