<script setup>
import { useUser, usePost, addPost, useGun, useRoom } from '@composables';

const props = defineProps({
  authors: Object,
  hash: String,
  tag: String,
})

defineEmits(['like'])

const { user } = useUser()
const { room } = useRoom()

async function like() {
  const gun = useGun()
  if (props.tag == "posts") {
    let myPost = gun.user(room.pub).get('posts').get(`${props.hash}@${user.pub}`)
    let current = await myPost.then()
    myPost.put(!current, null, { opt: { cert: room.certs.posts } })
  } else {
    let myLink = gun.user(room.pub).get('links').get(`${props.tag}:${props.hash}@${user.pub}`)
    let current = await myLink.then()
    myLink.put(!current, null, { opt: { cert: room.certs.links } })
  }
}
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-1.relative
  button.button(@click.stop.prevent="like()" v-if="user.pub")
    la-heart-solid(v-if="authors[user.pub]")
    la-heart(v-else)
  transition-group(name="fade")
    account-badge.rounded-full.shadow-md(
      v-for="(status, author) in authors" :key="author"
      :size="30"
      :pub="author" :showName="false" v-show="status"
      ) {{ status !== true && status != false ? status : '' }}
</template>