<script setup>
import { reactive, ref } from 'vue'

import { GunRelay, UiLayer, GunGraph } from '../components'
import GunRelayList from './GunRelayList.vue';
import { useRelay, useRelays } from '#composables'
import { trackers, defaultTrackers } from '../files/useTorrent'

import pack from '../../app/package.json'

const props = defineProps({
  text: { type: String, default: '' }
})

const { relay, setPeer, resetPeer } = useRelay()
const open = ref(false)

const { relays, loadRelays } = useRelays()

const show = reactive({
  graph: false,
  log: false,
  share: false,
})

const newTracker = ref('')
const addTracker = () => {
  if (newTracker.value && !trackers.value.includes(newTracker.value)) {
    trackers.value.push(newTracker.value)
    newTracker.value = ''
  }
}
const removeTracker = (tracker) => {
  const index = trackers.value.indexOf(tracker)
  if (index > -1) {
    trackers.value.splice(index, 1)
  }
}

const showTrackers = ref(false)
const showPeers = ref(false)
const showGraph = ref(false)

import { theme } from '../ui/useTheme'

</script>

<template lang="pug">
.flex.relative.p-4.flex-col.items-stretch.gap-4
  .p-0.flex.items-center.gap-2
    a.-mr-8(
      style="background:none !important"
      href="/" target="_self"
      )
      img.w-20.transition-all.duration-500.ease-in-out(src="https://gun-vue.js.org/media/gun-vue-logo.svg")
    p Gun-Vue demo app
    a.opacity-50.hover-op-100(
      href="https://github.com/DeFUCC/gun-vue/releases"
      target="_blank"
      ) v.{{ pack.version }}
    a.opacity-50.hover-op-100(
      href="https://gun-vue.js.org/basics/what-is.html"
      target="_blank"
      ) Docs
    .flex-auto

  .border-1.shadow-lg.rounded-lg.p-2.flex.items-center.gap-2
    ui-dark.button
    .text-lg Dark Mode
    .flex-auto 
    input.scale-120.mr-2(type="checkbox" v-model="theme.dark" switch)

  .flex.flex-col.border-1.shadow-lg.rounded-lg
    .p-2.flex.items-center.flex-wrap.w-full.gap-2  
      .i-carbon-bare-metal-server-01.text-lg.-mt-1
      .text-lg Relay 
      input.p-2.rounded-lg.flex-auto.dark-bg-dark-800(v-model="relay.peer")
      button.button(@click="setPeer(relay.peer)")
        .i-la-check
      button.button(@click="resetPeer()") 
        .i-la-undo-alt

    .flex.flex-col.px-2.pb-4
      .flex.items-baseline.gap-2
        .text-lg.text-left Volunteer GUN relay peers
        .text-sm(v-if="Object.keys(relays).length") {{ Object.keys(relays).length }}
        .flex-auto
        button.button(@click="showPeers = !showPeers; loadRelays()") 
          .i-la-angle-up(v-if="showPeers")
          .i-la-angle-down(v-else)
      transition(name="fade")
        ul.flex.flex-col.font-normal.items-start(v-if="showPeers")
          li.flex.w-full.text-left.p-1.hover-bg-light-500.cursor-pointer.hover-dark-bg-dark-600(
            v-for="link in relays" 
            :key="link.host" 
            :class="{ active: link.url == relay.peer }"
            :style="{ order: link.ping }"
            @click="setPeer(link.url)"
            ) 
            .flex-1.underline {{ link?.host }}
            .font-bold {{ link.ping }} ms


  .flex.gap-2.flex-col.border-1.shadow-lg.rounded-lg.p-1
    .flex.items-center.gap-2.p-2.dark-bg-dark-400.bg-light-800.rounded
      .i-la-network-wired.text-lg
      .text-xl Web-torrent trackers 
      .text-sm.mt-1 {{ trackers.length }}
      .flex-1
      button.button(@click="trackers = defaultTrackers")
        .i-la-undo-alt
      button.button(@click="showTrackers = !showTrackers") 
        .i-la-angle-up(v-if="showTrackers")
        .i-la-angle-down(v-else)
    transition(name="fade")
      .flex.flex-col.gap-2(v-if="showTrackers")
        .flex.items-center.gap-2
          input.p-1.rounded.flex-auto.bg-light-100.dark-bg-dark-800.max-w-60(v-model="newTracker")
          button.button(@click="addTracker") 
            .i-la-plus
        .p-1.flex.gap-2(v-for="tracker in trackers.toReversed()" :key="tracker")
          .text-sm {{ tracker }}
          button(@click="removeTracker(tracker)")
            .i-la-times


  .flex.flex-col.border-1.shadow-lg.rounded-lg.overflow-hidden
    .flex.items-baseline.gap-2.p-2.dark-bg-dark-400.bg-light-800.rounded
      .i-mdi-graph-outline
      .text-xl GUN graph
      .flex-1
      button.button(@click="showGraph = !showGraph") 
        .i-la-angle-up(v-if="showGraph")
        .i-la-angle-down(v-else)
    transition(name="fade")
      gun-graph.max-h-40vh.overflow-y-scroll(v-if="showGraph")
</template>


<style lang="postcss" scoped>
.active {
  @apply text-lg bg-light-900 font-bold dark-bg-dark-700;
}
</style>