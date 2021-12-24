<script setup>
import { useRelay } from '@composables'

const relay = useRelay()
const open = ref(false)

</script>

<template lang='pug'>
.mx-2.text-xl.cursor-pointer.relative(@click="open = true")
  carbon-bare-metal-server-01
  .p-1.bottom-0.left-2.rounded-full.transition-all.duration-300.ease-in-out.opacity-50.absolute(
    :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
    )
transition(name="fade")
  .fixed.w-full.h-full.flex.items-center.justify-center.z-10.top-0(v-show="open")
    .bg-dark-100.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer(@click="open = false")
    .bg-light-100.w-90.rounded-3xl.flex.flex-col.z-4.text-center.break-all.relative.shadow-2xl.overflow-hidden.p-8
      button.button.absolute.right-0.top-0(@click="open = false")
        la-times
      .h-1.w-42.mb-2.rounded-full.transition-all.duration-300.ease-in-out.opacity-40(
        :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
        )
      .flex.flex-col.items-start
        .p-0 Server is {{ relay.status }} for {{ relay.age }}
        .p-0  Host: 
          input.ml-2.opacity-60.cursor-not-allowed(disabled v-model="relay.peer")
        .p-0 Delay: {{ relay.delay }} ms
        .p-0 Pulse drift: {{ relay.lag }} ms

</template>