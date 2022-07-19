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
  .flex.items-center(v-if="pub")
    account-badge(:pub="pub" )
    .flex-1
    la-times.mr-2.cursor-pointer(@click="$emit('update:pub', '')")
  .flex.flex-col(v-else)
    .flex.items-center.p-2
      .font-bold SELECT A USER
      .flex-1 
      .p-0 {{ count.total }}

    .flex.flex-wrap.gap-3
      transition-group(name="fade")
        account-badge(v-for="guest of guests" :key="guest" @click="$emit('update:pub', guest.pub)" :pub="guest.pub")
</template>