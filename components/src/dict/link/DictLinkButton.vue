<script setup>
import { useGun, useUser, useColor, useDictRecordsFor, dictRecord, langParts } from '@composables';

const props = defineProps({
  type: String,
  hash: String,
  my: Boolean
})

const { user } = useUser()

</script>

<template lang='pug'>
la-link.link(
  v-if="user.is"
  @click.stop.prevent="dictRecord[type] = dictRecord[type] == hash ? null : hash"
  :class="{ active: dictRecord[type] == hash }"
  :style="{ color: my ? 'red' : '' }"
  )
</template>

<style lang="postcss" scoped>
.link {
  @apply cursor-pointer transition ml-2 p-1 bg-light-100 rounded-xl text-xl;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>