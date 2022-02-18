<script setup>
import { safeHash, useRoom } from '@composables'
const { room } = useRoom()
</script>

<template lang='pug'>
.flex.flex-col.flex-auto
  post-list.w-full(
    :header="false"
    tag="posts" 
    :key="room.pub"
    @close="$router.push('/posts/')" 
    @browse="$router.push(`/posts/${safeHash($event)}`)"
    @user="$router.push(`/users/${$event}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>