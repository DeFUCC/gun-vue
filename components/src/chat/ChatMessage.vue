<script setup>
import { computed, ref, onMounted } from 'vue'
import { selectedUser, useUser, getFirstEmoji } from '#composables';

const props = defineProps({
  index: { type: Number, default: 0 },
  source: {
    type: Object,
    default: () => ({
      author: '',
      timestamp: '',
      text: 'empty'
    })
  }
})

const dateTime = computed(() => {
  return formatDate(Number(props.source.timestamp))
})

const { user } = useUser()

const isMe = computed(() => props.source.author == user.pub)

function formatDate(timestamp) {
  if (!timestamp) return
  const theDate = new Date(timestamp)
  const date = theDate.toLocaleDateString('en-CA')
  const time = theDate.toLocaleTimeString('ru-RU')
  return {
    full: date + ' ' + time,
    date,
    time,
    // ms: ms(Date.now() - theDate.getTime()),
  }
}

const message = ref()
const fresh = ref(true)

onMounted(() => {
  if (props.index > 1) {
    const prevPub = document.getElementById(`chat-${props.index - 1}`)?.dataset?.pub
    if (prevPub == props.source.author) {
      fresh.value = false
    }
  }
})

</script>

<template lang="pug">
.px-1.py-2px.flex.flex-col.w-full.gap-1(
  ref="message" 
  :style="{ alignItems: isMe ? 'end' : 'start' }"
  )
  .flex.items-center.w-full.mt-2(
    v-show="fresh"
    :id="`chat-${index}`"
    :style="{ flexDirection: isMe ? 'row-reverse' : 'row' }"
    :data-pub="source.author"
    )
    account-badge.opacity-50.hover-opacity-90.transition(
      :pub="source.author" 
      :show-name="true" 
      :size="20" 
      @click="selectedUser.pub = source.author"
      )
    .ml-2.text-sm.opacity-20.hover-opacity-80.transition.cursor-default.text-light-200  {{ dateTime?.time }}
    .flex-1
    .ml-2.text-sm.opacity-20.hover-opacity-80.transition.cursor-default.text-dark-200 {{ dateTime?.date }} 
  .px-2.py-1.bg-light-300.bg-opacity-80.rounded-b-xl.max-w-max.break-all.overflow-hidden(:style="{ borderTopLeftRadius: isMe ? '12px' : '0px', borderTopRightRadius: isMe ? '0px' : '12px', fontSize: source.text == getFirstEmoji(source.text) ? '6em' : '1em' }")
    slot {{ source.text }}
</template>