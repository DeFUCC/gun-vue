<script setup>
import { ref } from 'vue'
import { gun, ms, addPost } from '@composables';

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' }
})

const timestamp = ref(0)

gun
  .get(`#${props.tag}`)
  .get(props.hash)
  .on(function (d, k, g) {
    timestamp.value = g.put['>']
  })

async function updatePost() {
  let data = await gun
    .get(`#${props.tag}`)
    .get(props.hash).then()
  gun
    .get(`#${props.tag}`)
    .get(props.hash).put(data)
}
</script>

<template lang='pug'>
button.button.items-center(@click.stop.prevent="updatePost()")
  .p-0.mr-1.text-sm {{ ms(Date.now() - timestamp) }}
  mdi-watering-can-outline
</template>