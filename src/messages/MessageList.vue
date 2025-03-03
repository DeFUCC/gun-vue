<script setup lang="ts">
import { useMessagesList } from './useMessages';
import { AccountBadge, MessagesCount } from '../components'
import { ref } from 'vue';
import { useUser } from '#composables';
import { useMediaQuery, onClickOutside } from '@vueuse/core'

const props = defineProps({
  current: {
    type: String,
    default: ''
  }
})

const list = useMessagesList()

defineEmits(['chat'])

const open = ref(false)

const { user } = useUser()
const chatsPanel = ref()

const panelOpen = ref(true)

const isLarge = useMediaQuery('(min-width: 640px)')

onClickOutside(chatsPanel, () => !isLarge.value ? panelOpen.value = false : null)

</script>

<template lang="pug">
button.button.fixed.z-2000.top-16.left-4(style="flex: 1 0 200px")(v-if="(!panelOpen && !isLarge)" @click="panelOpen = true")
  .i-la-angle-right
transition(name="fade" mode="out-in" appear)
  .px-1.py-2.flex.flex-col.bg-dark-50.dark-bg-dark-400.bg-opacity-95.gap-2.overflow-y-scroll.scroll-smooth.absolute.sm-static.z-20000.min-w-260px.max-w-full.text-light-900.backdrop-filter.backdrop-blur-xl.pb-8(
    v-if="isLarge || (panelOpen && !isLarge)" 
    ref="chatsPanel" 
    style="flex: 0 1 320px"
    )
    slot
    .p-2.flex.gap-2(@click="$emit('chat', user?.pub); panelOpen = false" v-if="!list[user?.pub]")
      account-badge(:pub="user?.pub")
      .flex-1
      MessagesCount(:pub="user?.pub")
    .p-2.rounded-xl.flex.items-center.bg-light-500.dark-bg-dark-400.cursor-pointer(
      v-for="(chat, pub) in list" 
      :key="pub" 
      :class="{ current: pub == current }"
      @click="$emit('chat', pub); panelOpen = false"
      )
      account-badge(:pub="pub")
      .flex-1
      MessagesCount(:pub="pub")
</template>

<style scoped lang="postcss">
.current {
  @apply dark-bg-dark-900 bg-light-900
}
</style>