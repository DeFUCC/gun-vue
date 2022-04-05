<script setup>
import { safeHash, currentRoom } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative
  post-list.w-full(
    :header="false"
    tag="posts" 
    :key="currentRoom.pub"
    @close="$router.push('/posts/')" 
    @browse="$router.push(`/posts/${safeHash($event)}`)"
    @user="$router.push(`/users/${$event}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>