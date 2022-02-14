<script setup>
import { useGuests } from '@composables';
import { reactive, ref, computed, toRef } from 'vue'

const emit = defineEmits(['user'])

const props = defineProps({
  space: { type: String, default: 'public' }
})

const guests = useGuests({ space: props.space })

</script>

<template lang='pug'>
.flex.flex-col.p-4.items-center
  .flex.flex-col.my-2(v-for="state in ['online', 'offline']" :key="state")
    .flex.items-center.my-2
      .text-xl.mr-2.capitalize {{ state }}
      .p-2.bg-light-900.rounded-xl {{ guests.count[state] }}
    .flex.flex-wrap
      transition-group(name="fade")
        account-badge.shadow-md.m-1(
          :size="state == 'online' ? 100 : 50"
          :vertical="state == 'online'"
          v-for="(guest, p) in guests[state]" :key="p"
          :pub="guest.pub"
          @click="$emit('user', guest.pub)"
          :style="{ opacity: guest.online ? 1 : 0.5, order: guest.order }"
        ) 
</template> 