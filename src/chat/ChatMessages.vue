<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { ref, watch, nextTick } from 'vue'
import VirtualList from 'vue3-virtual-scroll-list';
import ChatMessage from './ChatMessage.vue';

const props = defineProps({
  messages: { type: Array, default: () => [] }
})

const list = ref();

watchDebounced(() => props.messages, () => {
  nextTick(() => {
    list.value.scrollToBottom()
  });
}, { deep: true, debounce: 300 });

</script>

<template lang="pug">
virtual-list.flex.flex-col.bg-opacity-80.p-4.gap-2.overflow-y-scroll.scroll-smooth.flex-auto(
  ref="list"
  :data-key="'timestamp'"
  :data-sources="messages"
  :data-component="ChatMessage"
  )
</template>