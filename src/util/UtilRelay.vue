<script setup>
import { useRelay, useRelays } from '#composables'
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, default: '' }
})

const { relay, setPeer, resetPeer } = useRelay()
const open = ref(false)

const { relays, loadRelays } = useRelays()

</script>

<template lang="pug">
.cursor-pointer.relative.text-left
  button.flex(@click="open = true")
    .i-carbon-bare-metal-server-01.text-xl.-mt-1
    .ml-2.font-bold(v-if="text") {{ text }}
    .p-1.bottom-0.left-2.rounded-full.transition.duration-300ms.ease-in-out.opacity-50.absolute(
      :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
      )
  ui-layer(
    :open="open" 
    @close="open = false")
    .p-4.min-w-60vw.max-w-full
      .h-2.w-full.mb-2.rounded-full.transition-all.duration-300.ease-in-out.opacity-40(
        :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
        )
      .flex.flex-col.items-start
        .p-0.flex.items-center.flex-wrap.w-full  Host: 
          input.mx-1.p-2.rounded-lg.flex-auto(v-model="relay.peer")
          button.button.m-1(@click="setPeer(relay.peer)") Set
          button.button.m-1(@click="resetPeer()") Reset

        .info(v-if="relay.status != 'offline'")
          .p-0 Relay server is {{ relay.status }} for {{ relay.age }}
          .num.p-0 Delay: {{ relay.delay }} ms
          .num.p-0 Pulse drift: {{ relay.lag }} ms
          .num.p-0 Active wires: {{ relay.activeWires }} / {{ relay.totalConnections }}
          .p-0 Data storage is {{ relay.store ? 'enabled' : 'disabled' }}
      util-relay-list
</template>

<style lang="postcss" scoped>
.num {
  font-variant-numeric: tabular-nums;
}

.active {
  @apply text-lg bg-light-900 font-bold;
}
</style>