<script setup>
import { useGuests, useGift, useUser } from '#composables'

const { user } = useUser()

const { gift, propose } = useGift()

const { guests, count } = useGuests()

</script>

<template lang='pug'>
.flex

  .w-160px.p-4.text-center
    user-icon.pointer-events-none(:size="150")
    .text-lg {{ user.name }}
  .flex-1
    .font-mono.text-sm.m-4.opacity-50.break-all
    account-select(v-model:pub="gift.to")
    .p-4.bg-light-300.bg-opacity-30.flex.flex-wrap.gap-4
      input(v-model="gift.qn"  placeholder="Quantity")
      input(v-model="gift.ql" placeholder="Quality")
      textarea(v-model="gift.wish" placeholder="Wish")
    button.button(@click="propose()") Propose

</template>