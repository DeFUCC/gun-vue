<script setup>
import { onClickOutside, useMediaQuery } from '@vueuse/core';
import { useGuests, joinRoom, useUser } from '#composables';
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

<template lang="pug">

button.absolute.flex.items-center.m-4.p-2.left-0.bottom-0.z-200(
  v-if="!open && !isLarge" 
  @mousedown.stop.prevent="open = true"
  )
  .i-la-users.text-3xl
  .ml-1.flex.items-center.gap-2 Users list
    .i-la-angle-up
  .flex-1
button.button.absolute.flex.items-center.m-4.p-2.right-0.top-0.z-200(
  v-if="user.is && !isInRoom" 
  @click.stop.prevent="joinRoom()"
  )
  .i-la-plus
  .ml-2 Join
transition(name="fade")
  .absolute.left-0.bottom-0.w-60.bg-light-200.bg-opacity-70.z-100.overflow-y-scroll.px-2.max-h-full.flex.flex-col.gap-2.p-2.rounded-tr-xl(
    v-if="isLarge || (open && !isLarge)" 
    ref="panel" 
    )
    .flex.flex-col.gap-2(
      v-for="state in ['online', 'offline']" 
      :key="state"
      )
      .flex.items-center
        .text-xl.mr-2.capitalize {{ state }}
        .px-2.py-1.rounded-xl.font-bold {{ guests.count[state] }}
      .flex.flex-wrap
        transition-group(name="fade")
          account-badge.shadow-md.m-1(
            v-for="(guest, p) in guests[state]"
            :key="p" 
            :size="30"
            :pub="guest.pub"
            :style="{ opacity: guest.online ? 1 : 0.5, order: guest.order }"
            @click="$emit('user', guest.pub)"
          ) 
</template> 