<script setup>
import { ref } from 'vue'
import { gun } from '@composables'

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
  host: { type: String, default: '' },
})

const banned = ref(false)

gun.get('ban').get(props.hash).on(d => {
  banned.value = d
})

async function banPost() {
  let banned = await gun.get('ban').get(props.hash).then()
  gun.get('ban').get(props.hash).put(!banned)
}

</script>

<template lang='pug'>
button.m-1.button.items-center(@click.stop.prevent="banPost()" :style="{ color: banned ? 'red' : 'inherit' }")
  la-trash-alt
</template>