<script setup>
import { gun, user } from '@composables'

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

const starred = ref(false)

user.db.get('feeds').get(`${props.tag}`).get(props.hash).on((d, k) => {
  starred.value = d
})

function toggleStar(tag = props.tag, hash = props.hash) {
  user.db.get('feeds').get(`${props.tag}`).get(props.hash).put(!starred.value)
}

</script>

<template lang='pug'>
button.button(@click.stop.prevent="toggleStar()" v-if="user.is")
  la-star(v-if="!starred")
  la-star-solid(v-else)
</template>