<script setup>
import { useUser } from '@composables';

const props = defineProps({
  authors: Object
})

defineEmits(['like'])

const { user } = useUser()
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-1
  button.button(@click.stop.prevent="$emit('like')" v-if="user.pub")
    la-heart-solid(v-if="authors[user.pub]")
    la-heart(v-else)
  transition-group(name="fade")
    account-badge.rounded-full.shadow-md(
      v-for="(status, author) in authors" :key="author"
      :pub="author" :showName="false" v-show="status"
      ) {{ status !== true ? status : '' }}
</template>