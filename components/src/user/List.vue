<script setup>
import { onClickOutside } from '@vueuse/core';
import { useGuests, joinRoom, useUser } from '@composables';
import { reactive, ref, computed, toRef } from 'vue'
onClickOutside

const emit = defineEmits(['user'])

const { user } = useUser()

const guests = useGuests()

const open = ref()
const panel = ref()

onClickOutside(panel, () => {
  if (open.value) {
    open.value = false
  }
})

const isInRoom = computed(() => guests.guests[user.pub])

</script>

<template lang='pug'>
.flex.flex-col.items-center.relative.w-full(ref="panel")
  .absolute.left-2.top-2.z-200.flex.gap-2
    button.button(@click="open = !open")
      la-users.text-3xl
      .ml-1 Users list
    button.button(v-if="user.is && !isInRoom" @click="joinRoom()")
      la-plus
      .ml-2 Join
  transition(name="fade")
    .absolute.left-0.w-50.bg-light-200.z-100.h-80vh.overflow-y-scroll.px-2.pt-12(v-show="open" )
      .flex.flex-col.my-2(v-for="state in ['online', 'offline']" :key="state")
        .flex.items-center.my-2
          .text-xl.mr-2.capitalize {{ state }}
          .p-2.bg-light-900.rounded-xl {{ guests.count[state] }}
        .flex.flex-wrap
          transition-group(name="fade")
            account-badge.shadow-md.m-1(
              :size="30"
              v-for="(guest, p) in guests[state]" :key="p"
              :pub="guest.pub"
              @click="$emit('user', guest.pub)"
              :style="{ opacity: guest.online ? 1 : 0.5, order: guest.order }"
            ) 
</template> 