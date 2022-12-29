<script setup>
import { useUser } from '#composables'
import { ref } from 'vue'

const { user } = useUser()

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

const starred = ref(false)
const myStar = user.db.get('posts').get(`${props.tag}`).get(props.hash)

myStar.on((d, k) => {
  starred.value = d
})

function toggleStar(tag = props.tag, hash = props.hash) {
  myStar.put(!starred.value)
}

</script>

<template lang="pug">
button.m-1.button.items-center(
  v-if="user.is"
    @click.stop.prevent="toggleStar()"
    )
  .i-la-star(v-if="!starred")
  .i-la-star-solid(v-else)
</template>