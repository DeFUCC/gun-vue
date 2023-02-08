<script setup lang="ts">
import { useUser, reactToPost, useUserPosts, } from '../composables';
import { ref, computed } from 'vue'

const props = defineProps({
  pub: {
    default: '',
    type: String
  },
})

const { user } = useUser()

const isMe = computed(() => props.pub == user.pub)

const emit = defineEmits(['post'])

const postReaction = ref()
const userPosts = useUserPosts(props.pub)
const postList = computed(() => {
  return userPosts[postReaction.value] || []
})

</script>

<template lang="pug">
.flex.flex-col
  .text-xl.font-bold.mb-2 {{ isMe ? 'My ' : '' }} Posts
  .flex.flex-col.gap-4
    post-reaction-tabs(
      v-model:current="postReaction" 
      :reactions="userPosts"
      )
    transition(name="fade")
      .flex.flex-col.bg-light-800.rounded-2xl.gap-4(v-if="postReaction")
        transition-group(name="fade")
          .p-0.relative(
            v-for="(from, hash) in postList" 
            :key="hash"
          )
            .absolute.top-2.left-2.button.p-2.z-100.text-2xl.opacity-30.hover-opacity-100.transition.cursor-pointer(
              v-if="isMe"
              @click="reactToPost({ tag: from, hash: String(hash), reaction: postReaction, back: false })"
            ) 
              .i-la-trash
            post-card(
              style="flex: 1 1 100px"
              :hash="hash"
              :actions="false"
              @click="emit('post', hash)"
              )
</template>