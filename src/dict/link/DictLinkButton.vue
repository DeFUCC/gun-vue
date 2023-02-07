<script setup>
import { useUser, dictRecord } from '#composables';

defineProps({
  type: {
    type: String, default: ''
  },
  hash: {
    type: String, default: ''
  },
  my: Boolean
})

const { user } = useUser()

</script>

<template lang="pug">
.i-la-link.link(
  v-if="user.is"
  :class="{ active: dictRecord[type] == hash }"
  :style="{ color: my ? 'red' : '' }"
  @click.stop.prevent="dictRecord[type] = dictRecord[type] == hash ? null : hash"
  )
</template>

<style lang="postcss" scoped>
.link {
  @apply cursor-pointer transition ml-2 p-1 bg-light-100 rounded-xl text-xl;
}

.link.active {
  @apply bg-dark-50 text-light-200;
}
</style>