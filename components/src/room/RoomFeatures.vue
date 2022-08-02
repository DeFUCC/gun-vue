<script setup>
import { ref } from 'vue'
const props = defineProps({
  features: { type: Object, default: {} }
})

defineEmits(['browse'])

const names = {
  space: 'Space',
  topics: 'Topics',
  posts: 'Posts',
  users: 'Users',
  rooms: 'Rooms',
  projects: 'Projects',
  gifts: 'Gifts',
  dict: 'Dictionary',

}

</script>

<template lang='pug'>
.flex.flex-wrap.items-center.gap-4.p-4
  .cursor-pointer.flex-1.flex.flex-col.items-center.p-4.relative.bg-light-700.rounded-lg.shadow-sm.transition.hover_shadow-lg(v-for="(cert, c) in names" :key="c" :title="cert" @click="$emit('browse', c)")
    .text-4xl
      ph-hands-clapping(v-if="c == 'space'")
      ph-newspaper(v-if="c == 'posts'")
      ph-house(v-if="c == 'rooms'")
      la-broadcast-tower(v-if="c == 'topics'")
      ph-users(v-if="c == 'users'")
      ph-books(v-if="c == 'dict'")
      la-toolbox(v-if="c == 'projects'")
      la-sun(v-if="c == 'gifts'")
    .px-1.font-bold() {{ names[c] }}
    la-lock-open.text-xs.absolute.top-2.right-2.opacity-30(v-if="features[c] || (c == 'users' && features.space) || (c == 'topics' && features.chat)")
</template>