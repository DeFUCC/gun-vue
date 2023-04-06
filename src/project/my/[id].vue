<script setup>
import { useUser } from '#composables';
import { ProjectPage } from '../components'

const { user } = useUser()
const props = defineProps({
  id: { type: String, default: '' }
})

</script>

<template lang="pug">
project-page(
  :key="id" 
  :path="id+'@'+user.pub"
  @gift="$router.push(`/gifts/${$event}`)"
  @user="$router.push(`/users/${$event}`)"
)
</template>