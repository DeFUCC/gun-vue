<script setup>
import { useUser } from '#components';

const { user } = useUser()
</script>

<template lang="pug">
project-list(
	:key="user.pub"
	:pub="user.pub"
	:personal="true"
	@open="$router.push(`/projects/my/${encodeURI($event)}`)"
	)
</template>