<script setup>
import { reactToPost, useUser, currentRoom, getFirstEmoji, useGun, useColor } from '@composables';
import { ref } from 'vue'

const props = defineProps({
  authors: Object,
  hash: String,
  tag: String,
  back: Boolean
})

defineEmits(['react'])
const colorDeep = useColor('deep')

const { user } = useUser();

const reaction = ref('👍')

const gun = useGun()

const roomDb = gun.user(currentRoom.pub)

if (props.tag == 'posts' || props.tag == 'rooms') {
  roomDb.get(props.tag).get(`${props.hash}@${user.pub}`).on(d => {
    if (d && d !== true) {
      reaction.value = d
    }
  })
} else {
  roomDb.get('links').get(`${props.tag}:${props.hash}@${user.pub}`).on(d => {
    if (d && d !== true) {
      reaction.value = d
    }
  })
}



</script>

<template lang='pug'>
.p-2.flex.flex-wrap.gap-1.relative.items-center
  button.button(
    :style="{ backgroundColor: authors?.[user.pub] ? colorDeep.hex(user.pub) : '' }"
    @click.stop.prevent="reactToPost({ tag, hash, back, reaction: getFirstEmoji(reaction) })" 
    v-if="user.pub"
    )
    input.px-2.w-36px.rounded-xl(v-model="reaction" @click.stop.prevent)
    la-plus(v-if="!authors?.[user.pub]")
    la-times(v-else)
  transition-group(name="fade")
    account-badge.rounded-full.shadow-md(
      v-for="(status, author) in authors" :key="author"
      :size="30"
      :pub="author" :showName="false" v-show="status"
      ) 
      .mr-2.ml-1(v-if="status !== true") {{ status !== true && status != false ? status : '' }} 
</template>