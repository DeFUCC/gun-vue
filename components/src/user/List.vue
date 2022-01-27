<script setup>
import { useGuests } from '@composables';
import { reactive, ref, computed, toRef } from 'vue'

const emit = defineEmits(['user'])

const props = defineProps({
  space: { type: String, default: 'public' }
})

const { guests, online, offline, getOpacity, getOrder } = useGuests({ space: props.space })

</script>

<template lang='pug'>
.flex.flex-wrap.p-4
  transition-group(name="fade")
    .p-1(
      v-for="(guest, p) in guests" :key="p"
      @click="$emit('user', guest.pub)"
      v-show="getOrder(guest.pulse) !== null"
      :style="{ opacity: getOpacity(guest.pulse), order: guest.order }"
      ) 
      account-badge.shadow-md(:pub="guest.pub") 

</template> 