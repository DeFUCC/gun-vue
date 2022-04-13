<script setup>
import { safeHash, currentRoom } from '@composables'
import { ref, computed } from 'vue'

const showGraph = ref()
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
    button.button(@click="showGraph = !showGraph" :class="{ active: showGraph }")
      la-eye
      .ml-2 Graph
  transition(name="fade")
    post-graph.absolute.top-2.right-2.left-2.z-10(@post="$router.push(`/posts/${safeHash($event)}`)" v-if="showGraph")
      button.button.fixed.top-40.right-8(@click="showGraph = false" v-if="showGraph")
        la-times.text-2xl
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" )
</template>