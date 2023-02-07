<script setup lang="ts">
import { useGuests, } from '../composables'

const { guests, count } = useGuests()

defineEmits(['update:pub'])

defineProps({
  pub: { type: String, default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk' }
})

</script>

<template lang="pug">
.p-4
  .flex.items-center(v-if="pub")
    account-badge(:pub="pub" )
    .flex-1
    .i-la-times.mr-2.cursor-pointer(@click="$emit('update:pub', '')")
  .flex.flex-col(v-else)
    .flex.items-center.p-2
      .font-bold SELECT A USER
      .flex-1 
      .p-0 {{ count.total }}

    .flex.flex-wrap.gap-3
      transition-group(name="fade")
        account-badge(
          v-for="guest of guests" 
          :key="guest.pub" 
          :pub="guest.pub" 
          @click="$emit('update:pub', guest.pub)")
</template>