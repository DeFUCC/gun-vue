<script setup>
import { usePrivateChatCount } from '@composables'

const props = defineProps({
  pub: String
})

const emit = defineEmits(['chat'])

const { count, available } = usePrivateChatCount(props.pub)

</script>

<template lang='pug'>
.pl-2.flex.items-center.bg-light-200.rounded-xl.cursor-pointer(
  @click="$emit('chat')"
  :style="{ opacity: available ? 1 : 0.1 }"
  )
  ph-chats-light.text-xl
  .font-bold.text-lg.mx-2 {{ count }}
</template>