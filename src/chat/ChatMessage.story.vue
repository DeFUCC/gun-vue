<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const ChatMessage = defineAsyncComponent(() => import('./ChatMessage.vue'))
const AccountSelect = defineAsyncComponent(() => import('../account/AccountSelect.vue'))

const state = reactive({
  author: '',
  timestamp: Date.now(),
  text: 'message text'
})

</script>

<template lang="pug">
Story(
  title="Chat/Message" 
  icon="la:envelope"
  )
  Variant(title="Round")
    ChatMessage(v-bind="state")

  template(#controls)
    .p-2.flex.flex-col.gap-4
      AccountSelect(v-model:pub="state.author")
      textarea(v-model="state.text")
</template>