<script setup>
import { selectedUser } from '#composables';
import { ProjectPage } from '../components'

const props = defineProps({
  path: { type: String, default: '' }
})



</script>

<template lang="pug">
project-page(
  :key="path" 
  :path="path"
  @gift="$router.push(`/gifts/${$event}`)"
  @user="selectedUser.pub = $event"
)
</template>