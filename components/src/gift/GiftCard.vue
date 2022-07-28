<script setup>
import { giftState, useColor, useUser, useGift } from '#composables'
import { computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
  hash: String,
})

const { user } = useUser()

const color = useColor()

const { gift, status } = useGift(props.hash)

const complete = computed(() => gift.sent && gift.received)

const time = useTimeAgo(gift.date)

</script>

<template lang='pug'>
.p-2.rounded-xl.bg-light-200.bg-opacity-90.flex.shadow-lg.flex-wrap.items-center.border-2(
  :style="{ backgroundColor: status == 'complete' ? color.hex(hash) : '#ccc3', borderColor: !status == 'complete' ? color.hex(hash) : 'transparent' }"
  )
  .flex.items-center.gap-2(style='flex: 1 1 100px')
    account-avatar(:pub="gift.from")
    la-arrow-right.flex-auto
    account-avatar(:pub="gift.to")
  .flex.gap-2.p-2.items-center.flex-wrap(style="flex:1 1 300px")
    .flex.flex-col
      .text-xl.font-bold {{ gift.qn }}
    .flex.flex-col
      .text-lg.font-bold {{ gift.ql }}
    .flex-1
    .flex-auto(v-if="gift.wish") {{ gift.wish }}

    .p-2(v-if="gift.date") {{ time }}
    template(v-if="gift.to == user?.pub")
      button.button(@click.stop.prevent="giftState(hash, true)" v-if="status == 'proposed'") Accept
      button.button(@click.stop.prevent="giftState(hash, false)" v-if="status == 'complete'") Reject
</template>