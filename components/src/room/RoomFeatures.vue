<script setup>
import { currentRoom, useGun } from '#composables';
import { ref, reactive, computed } from 'vue'
const props = defineProps({
  features: { type: Object, default: {} },
  titles: {
    default: {
      space: 'Space',
      topics: 'Topics',
      posts: 'Posts',
      projects: 'Projects',
      gifts: 'Gifts',
      dict: 'Dictionary',
      users: 'Users',
      rooms: 'Rooms',
    }
  }
})

defineEmits(['browse'])


</script>

<template lang='pug'>
.flex.flex-wrap.items-center.gap-4.p-4
  .cursor-pointer.flex-1.flex.flex-col.items-center.p-4.relative.bg-light-700.rounded-lg.shadow-sm.transition.hover_shadow-lg(v-for="(cert, c) in titles" :key="c" :title="cert" @click="$emit('browse', c)")
    .text-4xl 
      room-feature-icon(:icon="c")
    .px-1.font-bold() {{ titles[c] }}
    la-lock-open.text-xs.absolute.top-2.right-2.opacity-30(v-if="features[c] || (c == 'users' && features.space) || (c == 'topics' && features.chat)")
</template>