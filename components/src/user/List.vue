<script setup>
import { onClickOutside, useMediaQuery } from '@vueuse/core';
import { useGuests, joinRoom, useUser } from '@composables';
import { reactive, ref, computed, toRef } from 'vue'

const isLarge = useMediaQuery('(min-width: 640px)')

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
.absolute.left-0.top-2.z-200.flex.gap-2
  button.flex.items-center.p-4.bg-light-200.w-60.shadow-lg(@mousedown.stop.prevent="open = true")
    la-users.text-3xl
    .ml-1 Users list
    .flex-1
    button.button(v-if="user.is && !isInRoom" @click.stop.prevent="joinRoom()")
      la-plus
      .ml-2 Join
transition(name="fade")
  .absolute.left-0.top-20.w-60.bg-light-200.z-100.overflow-y-scroll.px-2.max-h-full(ref="panel" v-if="isLarge || (open && !isLarge)" )
    .flex.flex-col.my-6.gap-2(v-for="state in ['online', 'offline']" :key="state")
      .flex.items-center.bg-light-400.py-2
        .text-xl.mr-2.capitalize {{ state }}
        .px-2.py-1.bg-light-900.rounded-xl.font-bold {{ guests.count[state] }}
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