<script setup>
import { useGun, currentRoom, isEmoji, useUser, reactToPost, useUserPosts, useUserLinks } from '@composables';
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  pub: String,
})

const { user } = useUser()

const isMe = computed(() => props.pub == user.pub)

const emit = defineEmits(['post'])



const postReaction = ref()
const userPosts = useUserPosts(props.pub)
const postList = computed(() => {
  return userPosts[postReaction.value] || []
})


const linkReaction = ref()
const userLinks = useUserLinks(props.pub)

</script>

<template lang='pug'>
.flex.flex-col
  .text-xl.font-bold.mb-2 {{ isMe ? 'My ' : '' }} Posts
  .flex.flex-col.gap-4
    reaction-tabs(:reactions="userPosts" v-model:current="postReaction")
    transition(name="fade")
      .flex.flex-col.bg-light-800.rounded-2xl.gap-4(v-if="postReaction")
        transition-group(name="fade")
          .p-0.relative(
            v-for="(from, hash) in  userPosts[postReaction]" :key="hash"
          )
            .absolute.top-2.left-2.button.p-2.z-100.text-2xl.opacity-30.hover_opacity-100.transition.cursor-pointer(
              v-if="isMe"
              @click="reactToPost({ tag: from == postReaction ? 'posts' : from, hash: hash, reaction: postReaction })"
            ) 
              la-trash
            post-card(
              style="flex: 1 1 100px"
              :hash="hash"
              @click="emit('post', hash)"
              :actions="false"
              )

  .text-xl.font-bold.mb-2 {{ isMe ? 'My ' : '' }} Links
  .flex.flex-col.gap-4
    reaction-tabs(:reactions="userLinks" v-model:current="linkReaction")
    transition(name="fade")
      .flex.flex-col.bg-light-800.rounded-2xl.gap-4(v-if="linkReaction")
        transition-group(name="fade")
          .p-0.relative(
            v-for="(from, hash) in userLinks[linkReaction]" :key="hash"
          )
            .absolute.top-2.left-2.button.p-2.z-100.text-2xl.opacity-30.hover_opacity-100.transition.cursor-pointer(
              v-if="isMe"
              @click="reactToPost({ tag: from == linkReaction ? 'posts' : from, hash: hash, reaction: linkReaction })"
            ) 
              la-trash
            post-card(
              style="flex: 1 1 100px"
              :hash="hash"
              @click="emit('post', hash)"
              :actions="false"
              )
</template>