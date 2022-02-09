<script setup>
import { useGun, currentRoom } from '@composables'
import { reactive, computed } from 'vue'

const props = defineProps({
  hash: { type: String, default: '' },
})

const gun = useGun()

const comments = reactive({})

gun.user(currentRoom.pub).get('links').map().once((d, k) => {
  if (k.includes(props.hash) && d) {
    comments[k] = d
  } else {
    delete comments[k]
  }
})

// myStar.map().on((d, k) => {
//   comments[k] = d
// })

const count = computed(() => Object.keys(comments).length)

</script>

<template lang='pug'>
button.m-1.button.items-center(v-if="count >= 0")
  la-link
  .ml-1.text-sm {{ count }}
</template>