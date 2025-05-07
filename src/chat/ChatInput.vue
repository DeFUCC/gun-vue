<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUser } from '../composables'
import UiLayer from '../ui/UiLayer.vue'
import { onStartTyping, useFocus } from '@vueuse/core'

const { user } = useUser()

const emit = defineEmits(['submit'])

const message = ref('')

function send() {
  emit('submit', message.value);
  message.value = ''
}

const text = ref()

onStartTyping(() => {
  if (!text.value.active)
    text.value.focus()
})

const { focused } = useFocus(text)

onMounted(() => {
  focused.value = true
})

</script>

<template lang="pug">
.flex.gap-2(v-if="user.pub")
  textarea.p-2.rounded-xl.bg-light-200.flex-1.dark-bg-dark-200(
    v-model="message" 
    ref="text"
    placeholder="Your message" 
    @keydown.enter.prevent.stop="send()"
    )
  button.button(
    v-if="user.pub" 
    @click="send()"
    )
    .i-la-comment-dots.mx-2
.p-4.flex.flex-col.items-center(v-else)
  button.button(@click="user.auth = !user.auth")
    | Log in to post messages

</template>