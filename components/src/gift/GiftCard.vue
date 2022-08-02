<script setup>
import { giftState, useColor, useUser, useGift, useGun } from '#composables'
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
.p-2.rounded-xl.bg-light-200.bg-opacity-90.flex.shadow-lg.flex-col.items-center.border-2(
  style="flex: 1 1 200px"
  :style="{ backgroundColor: state.complete ? color.hex(hash) : '#ccc3', borderColor: !state.complete ? color.hex(hash) : 'transparent' }"
  )
  .flex.items-center.gap-2.w-full
    .flex.flex-col.gap-2
      account-badge(:pub="gift.from")
      gift-status(:state="state.from")
      template(v-if="gift.from == user.pub")
        button.button(@click.stop.prevent="giftState(hash, true)" v-if="!state.from") Propose
        button.button(@click.stop.prevent="giftState(hash, false)" v-else) Cancel
    .flex-auto.flex.items-center.flex.flex-col
      .flex.flex-col
        .text-xl.font-bold {{ gift.qn }}
      .flex.flex-col
        .text-lg.font-bold {{ gift.ql }}
    .flex.flex-col.gap-2
      account-badge(:pub="gift.to")
      gift-status(:state="state.to")
      template(v-if="gift.to == user?.pub")
        button.button(@click.stop.prevent="giftState(hash, true)" v-if="!state.to") Accept
        button.button(@click.stop.prevent="giftState(hash, false)" v-if="state.to") Reject
  .flex.flex-1.gap-2.p-2.items-center.flex-wrap(v-if="gift.wish")  {{ gift.wish }}
  .flex.gap-2.flex-wrap
    .flex.flex-col.gap-1(v-if="gift.room") 
      .text-xs ROOM 
      .p-0 {{ roomTitle }}

    .flex.flex-col.gap-1(v-if="gift.project") 
      .text-xs PROJECT
      .p-0 {{ gift.project.slice(0, -88) }}
    .flex.flex-col.gap-1(v-if="gift.date") 
      .text-xs {{ date }}
      .p-0 {{ time }}
  .font-mono.text-8px.mb-0.mt-2 {{ hash }}
</template>