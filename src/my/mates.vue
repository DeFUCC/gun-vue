<script setup lang="ts">
import { useUser } from '#composables';

const { user } = useUser()
</script>

<template lang='pug'>
mate-list(
  :pub="user.pub"  
  @browse="$router.push(`/my/chat/${$event}`)"
  )
</template>

