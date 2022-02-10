<script setup>
import { reactToPost, useUser, addPost, useGun, useRoom } from '@composables';
import { ref } from 'vue'

const props = defineProps({
  authors: Object,
  hash: String,
  tag: String,
  back: Boolean
})

defineEmits(['react'])
const { user } = useUser();

const reaction = ref(true)

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-1.relative
  button.button(@click.stop.prevent="reactToPost({ tag, hash, back, reaction })" v-if="user.pub")
    la-heart-solid(v-if="authors?.[user.pub]")
    la-heart(v-else)
  transition-group(name="fade")
    account-badge.rounded-full.shadow-md(
      v-for="(status, author) in authors" :key="author"
      :size="30"
      :pub="author" :showName="false" v-show="status"
      ) {{ status !== true && status != false ? status : '' }}
</template>