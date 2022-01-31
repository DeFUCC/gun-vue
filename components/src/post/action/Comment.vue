<script setup>
import { gun } from '@composables'
import { reactive, computed } from 'vue'

const props = defineProps({
  hash: { type: String, default: '' },
})

const comments = reactive({})

const myStar = gun.get(`${props.hash}`)

myStar.map().on((d, k) => {
  comments[k] = d
})

const count = computed(() => Object.keys(comments).length)

</script>

<template lang='pug'>
button.m-1.button.items-center(v-if="count > 0")
  la-comment
  .ml-1.text-sm {{ count }}
</template>