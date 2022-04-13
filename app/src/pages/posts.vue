<script setup>
import { safeHash, currentRoom } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative
  post-list.w-full(
    tag='PvRPp6Qs4F5fkSx9CnWfUsN2QkpmsIkaVxvpGf6iK18='
    :key="currentRoom.pub"
    @close="$router.push('/posts/')" 
    @browse="$router.push(`/posts/${safeHash($event)}`)"
    @user="$router.push(`/users/${$event}`)"
    :header="false"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" )
</template>