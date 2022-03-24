<script setup>
import { useRelay, useRelays } from '@composables'
import { onMounted } from 'vue';

const { relay, setPeer, resetPeer } = useRelay()

const { relays, loadRelays } = useRelays()

onMounted(() => {
  loadRelays()
})

</script>

<template lang='pug'>
.flex.flex-col
  .flex.items-center
    .text-lg.text-left Volunteer relay peers:
    .flex-auto
    button.button.m-1(@click="loadRelays()")
      la-redo-alt
  ul.flex.flex-col.font-normal.items-start
    li.flex.w-full.text-left.p-1.hover_bg-light-500.cursor-pointer(
      v-for="link in relays" :key="link.host" 
      @click="setPeer(link.url)"
      :class="{ active: link.url == relay.peer }"
      :style="{ order: link.ping }"
      ) 
      .flex-1.underline {{ link.host }}
      .font-bold {{ link.ping }} ms
</template>

<style lang="postcss" scoped>
.active {
  @apply text-lg bg-light-900 font-bold;
}
</style>