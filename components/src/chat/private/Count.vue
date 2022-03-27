<script setup>
import { usePrivateChatCount } from '@composables'

const props = defineProps({
  pub: String
})

const emit = defineEmits(['chat'])

const { count, available } = usePrivateChatCount(props.pub)

</script>

<template lang='pug'>
.p-2.flex.items-center.bg-light-200.rounded-xl.cursor-pointer.shadow-md(
  @click="$emit('chat')"
  :style="{ opacity: available ? 1 : 0.1 }"
  )
  ph-chats-light.text-3xl
  .font-bold.text-lg.mx-2 {{ count }}
</template>