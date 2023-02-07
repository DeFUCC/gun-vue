<script setup>
import { giftState, useColor, useUser, useGift, useGun, currentRoom, useProject } from '#composables'
import { computed, ref } from 'vue'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
  hash: { type: String, default: '' },
})

const emit = defineEmits(['project'])

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


const { project } = useProject(computed(() => gift.project))

</script>

<template lang="pug">
.flex.p-0.rounded-xl.shadow-lg.border-2.relative.overflow-hidden(
  v-if="Object.keys(gift).length > 0"
  :style="{ opacity: state.complete ? 1 : 0.5 }"
  ) 
  //- .font-mono.text-7px.absolute.-bottom-2.right-2.opacity-40(
    :style="{ color: color.hex(hash) }"
    ) {{ hash }}
  .w-3.min-w-3.h-full.flex-0(:style="{ backgroundColor: color.hex(hash) }")
  .flex.flex-wrap.gap-2.items-center.px-2
    .flex-0.flex.flex-wrap.px-2.gap-2
      .flex.flex-col
        .text-xl.font-bold {{ gift.qn }}
      .flex.flex-col
        .text-lg.font-bold {{ gift.ql }}
    .flex.items-center.gap-2.flex-0

      .flex.flex-col.gap-2.text-xs
        account-badge(
          :pub="gift.from" 
          :style="{ opacity: state.from ? 1 : 0.4 }"
          )
          gift-status.mr-2(:state="state.from")
      .i-la-arrow-right.m-2

      .flex.flex-col.gap-2.text-xs
        account-badge(
          :pub="gift.to" 
          :style="{ opacity: state.to ? 1 : 0.4 }"
          )
          gift-status.mr-2(:state="state.to")

    slot

    .flex.gap-2.flex-wrap
      .flex.flex-col.gap-1(v-if="gift.room != currentRoom.pub") 
        .text-xs ROOM 
        .p-0 {{ roomTitle }}
      .flex.flex-col.gap-1(v-if="gift.date") 
        .text-xs {{ date }}
        .p-0 {{ time }}
      .flex.flex-col.gap-1(v-if="gift.project") 
        .text-xs PROJECT
        .py-1.px-2.rounded-lg.text-sm(
          :style="{ backgroundColor: project.color }"
          @click="$emit('project', gift.project)"
          ) {{ project.title }}

      .flex.flex-1.gap-2.p-2.items-center.flex-wrap.leading-tight.text-xs(
      style="flex: 1 1 20%"
      )  {{ gift.wish }}

    .flex.gap-2

      template(v-if="gift.from == user.pub")
        button.button(
          v-if="!state.from" 
          @click.stop.prevent="giftState(hash, true)"
          ) Propose
        button.button(
          v-else 
          @click.stop.prevent="giftState(hash, false)"
          ) Cancel

      template(v-if="gift.to == user.pub")
        button.button(
          v-if="!state.to" 
          @click.stop.prevent="giftState(hash, true)"
          ) Accept
        button.button(
          v-if="state.to" 
          @click.stop.prevent="giftState(hash, false)"
          ) Reject

</template>