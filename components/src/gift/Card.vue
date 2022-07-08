<script setup>
import { acceptGift, giftPath, useUser } from '@composables'
import { computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'

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

const complete = computed(() => props.gift.sent && props.gift.received)

const time = useTimeAgo(props.gift.date)

</script>

<template lang='pug'>
.p-2.rounded-xl.bg-light-200.bg-opacity-90.flex.shadow-lg.flex.items-center(
  :style="{ backgroundColor: complete ? 'lightgreen' : 'transparent' }"
  )
  .flex.items-center.gap-2
    account-avatar.flex-auto(:pub="gift.from")
    .flex.items-center.gap-2 TO
    account-avatar(:pub="gift.to")
  .flex.gap-2.p-2.items-center.flex-wrap.flex-1
    .flex.flex-col
      .text-xl.font-bold {{ gift.qn }}
    .flex.flex-col
      .text-lg {{ gift.ql }}

    .p-2.flex-auto(v-if="gift.wish") {{ gift.wish }}

    .p-2(v-if="gift.date") {{ time }}
    button.button(@click="acceptGift(hash)" v-if="gift.to == user?.pub && !complete") Accept
</template>