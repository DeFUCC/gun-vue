<script setup>
import { giftState, useColor, useUser, useGift, useGun, currentRoom } from '#composables'
import { computed, ref } from 'vue'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
  hash: String,
})

const { user } = useUser()

const color = useColor()

const { gift, state } = useGift(props.hash)

const time = computed(() => new Date(gift.date).toLocaleTimeString('en-GB'))
const date = computed(() => new Date(gift.date).toLocaleDateString('en-GB'))

const roomTitle = computed(() => {
  const title = ref()
  const gun = useGun()
  gun.user(gift.room).get('profile').get('name').on(d => title.value = d)
  return title.value
})

</script>

<template lang='pug'>
.p-2.rounded-xl.bg-light-200.bg-opacity-90.flex.shadow-lg.flex-wrap.gap-2.items-center.border-2.relative(
  :style="{ backgroundColor: state.complete ? color.hex(hash) : '#ccc3', borderColor: !state.complete ? color.hex(hash) : 'transparent' }"
  v-if="Object.keys(gift).length > 0"
  ) 
  .font-mono.text-7px.absolute.bottom-1.right-2.opacity-40 {{ hash }}
  .flex-auto.flex.flex.flex-col.px-2(
    style="flex: 1 1 20px"
  )
    .flex.flex-col
      .text-xl.font-bold {{ gift.qn }}
    .flex.flex-col
      .text-lg.font-bold {{ gift.ql }}
  .flex.items-center.gap-2

    .flex.flex-col.gap-2.text-xs
      account-badge(:pub="gift.from")
        gift-status.mr-2(:state="state.from")
    la-arrow-right.m-2
    .flex.flex-col.gap-2.text-xs
      account-badge(:pub="gift.to")
        gift-status.mr-2(:state="state.to")
  .flex.gap-2.p-2.items-center.flex-wrap(
    v-if="gift.wish"
    style="flex: 100 1 200px"
    )  {{ gift.wish }}
  slot
  .flex.gap-2.flex-wrap
    .flex.flex-col.gap-1(v-if="gift.room != currentRoom.pub") 
      .text-xs ROOM 
      .p-0 {{ roomTitle }}

    .flex.flex-col.gap-1(v-if="gift.project") 
      .text-xs PROJECT
      .p-0 {{ gift.project.slice(0, -88) }}
    .flex.flex-col.gap-1(v-if="gift.date") 
      .text-xs {{ date }}
      .p-0 {{ time }}
  .flex.gap-2
    template(v-if="gift.from == user.pub")
      button.button(@click.stop.prevent="giftState(hash, true)" v-if="!state.from") Propose
      button.button(@click.stop.prevent="giftState(hash, false)" v-else) Cancel
    template(v-if="gift.to == user?.pub")
      button.button(@click.stop.prevent="giftState(hash, true)" v-if="!state.to") Accept
      button.button(@click.stop.prevent="giftState(hash, false)" v-if="state.to") Reject
</template>