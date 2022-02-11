<script setup>
import { reactToPost, useUser, currentRoom, getFirstEmoji, useGun, useColor } from '@composables';
import { ref } from 'vue'

const props = defineProps({
  authors: Object,
  hash: String,
  tag: String,
  back: Boolean
})

defineEmits(['react', 'user'])
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

function react(event) {
  reactToPost({ tag: props.tag, hash: props.hash, back: props.back, reaction: getFirstEmoji(reaction.value) })
}

</script>

<template lang='pug'>
.p-2.flex.flex-wrap.gap-1.relative.items-center
  button.rounded-2xl.text-lg.bg-light-200.flex.items-center.pl-1.pr-1.mr-1(
    :style="{ backgroundColor: authors?.[user.pub] ? colorDeep.hex(user.pub) : '' }"
    @click.stop.prevent="react()" 
    v-if="user.pub"
    )
    account-avatar.rounded-full.shadow-md(:pub="user.pub" :size="32")
    .flex.items-center(v-if="!authors?.[user.pub]")
      input.py-1.px-2.w-36px.rounded-xl.mx-1.text-center(v-model="reaction" @input="$event.target.value && react()" @click.stop.prevent v-if="!authors?.[user.pub]")
      la-plus
    .flex.items-center(v-else)
      .px-2.py-1.text-xl.w-36px {{ reaction }}
      la-times
  transition-group(name="fade")
    account-badge.rounded-full.shadow-md(
      @click.stop.prevent="$emit('user', author)"
      v-for="(status, author) in authors" :key="author"
      :size="30"
      :selectable="true"
      v-show="status && author != user.pub"
      :pub="author" :showName="false"
      ) 
      .mr-2.ml-1(v-if="status !== true") {{ status !== true && status != false ? status : '' }} 
</template>