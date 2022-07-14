<script setup>
import { useGuests, } from '#composables'

const { guests, count } = useGuests()

const emit = defineEmits(['update:pub'])

const props = defineProps({
  pub: { type: String, default: '' }
})

</script>

<template lang='pug'>
.p-4
  account-badge(:pub="pub" v-if="pub")
    .flex-1
    la-times.mr-2(@click="$emit('update:pub', '')")
  .flex.flex-col(v-else)
    .font-bold USER SELECT OF {{ count.total }}

    .flex.flex-wrap.gap-3
      account-badge(v-for="guest of guests" :key="guest" @click="$emit('update:pub', guest.pub)" :pub="guest.pub")
</template>