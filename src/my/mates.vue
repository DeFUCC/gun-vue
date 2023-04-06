<script setup lang="ts">
import { useUser } from '#composables';
import { MateList } from '../components'

const { user } = useUser()


</script>

<template lang='pug'>
mate-list(
  :pub="user.pub"  
  @browse="$router.push(`/private/${$event}`)"
  )
</template>

