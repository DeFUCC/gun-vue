<script setup>
import { useRelay } from '@composables'
import { ref } from 'vue'

const props = defineProps({
  text: { type: String }
})

const relay = useRelay()
const open = ref(false)

</script>

<template lang='pug'>
.cursor-pointer.relative
  button.flex(@click="open = true")
    carbon-bare-metal-server-01.text-xl.-mt-1
    .ml-2.font-bold(v-if="text") {{ text }}
    .p-1.bottom-0.left-2.rounded-full.transition.duration-300ms.ease-in-out.opacity-50.absolute(
      :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
      )
  ui-layer(:open="open" @close="open = false")
    .p-4
      .h-2.w-full.mb-2.rounded-full.transition-all.duration-300.ease-in-out.opacity-40(
        :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
        )
      .flex.flex-col.items-start
        .p-0 Server is {{ relay.status }} for {{ relay.age }}
        .p-0  Host: 
          input.ml-2.opacity-60.cursor-not-allowed(disabled v-model="relay.peer")
        .p-0 Delay: {{ relay.delay }} ms
        .p-0 Pulse drift: {{ relay.lag }} ms

</template>