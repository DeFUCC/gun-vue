<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import { refDebounced } from '@vueuse/core'
import VirtualList from 'vue3-virtual-scroll-list';
import ChatMessage from './ChatMessage.vue';

const props = defineProps({
  messages: { type: Object }
})

const list = ref();

const messageArray = computed(() => Object.values(props.messages || {}))
const debList = refDebounced(messageArray)
const sorted = computed(() => debList.value.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1))

watch(debList, () => {
  nextTick(() => {
    list.value.scrollToBottom()
  });
}, { deep: true });

</script>

<template lang='pug'>
virtual-list.flex.flex-col.bg-opacity-80.p-4.gap-2.overflow-y-scroll.scroll-smooth.flex-auto(
  ref="list"
  :data-key="'timestamp'"
  :data-sources="sorted"
  :data-component="ChatMessage"
  )
</template>