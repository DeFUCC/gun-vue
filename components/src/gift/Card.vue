<script setup>
import { acceptGift, giftPath, useUser } from '@composables'
import { ref } from 'vue'

const props = defineProps({
  hash: String,
  gift: {
    type: Object, default: {
      qn: 0,
      ql: '',
      wish: '',
      from: '',
      to: '',
    }
  }
})

const { user } = useUser()

const accepted = ref()

user.db.get(giftPath).get(props.hash).on(d => {
  accepted.value = d
})


</script>

<template lang='pug'>
.p-2.rounded-xl.bg-light-200.bg-opacity-90.flex.shadow-lg
  account-avatar.m-4.min-w-50px.flex-1(:pub="gift.from" :size="100")
  .p-2.bg-green-300.h-4.rounded-xl(v-if="gift.sent")
  .p-2.bg-green-300.h-4.rounded-xl(v-if="gift.received")
  .flex-auto 
    .flex.gap-4.p-2.items-center.flex-wrap
      .flex.flex-col
        .text-xl.font-bold {{ gift.qn }}
      .flex.flex-col
        .text-lg {{ gift.ql }}
      .flex.items-center.gap-2.p-2 FOR
        account-avatar(:pub="gift.to")
      .p-2(v-if="gift.wish") {{ gift.wish }}
      .p-2(v-if="gift.date") {{ gift.date }}
      button.button(@click="acceptGift(hash)" v-if="gift.to == user?.pub && !accepted") Accept
</template>