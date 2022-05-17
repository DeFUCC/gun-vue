<script setup>
import { updateProfile } from '@composables'
import { ref } from 'vue'
import urlRegex from 'url-regex'

const props = defineProps({
  field: { type: String, default: '' },
  content: { type: String, default: '' },
})
const edit = ref(false)
const text = ref(props.content)

function update() {
  updateProfile(props.field, text.value)
  edit.value = false;
  text.value = ''
}

function isLink(text) {
  return urlRegex({ exact: true }).test(text)
}
</script>

<template lang='pug'>
.p-2.flex.items-center.break-all
  .mr-2.font-bold {{ field }}
  .flex.items-center
    .text-md.flex.items-center(v-if="!edit") 
      .p-0(v-if="!isLink(content)") {{ content }}
      a.font-bold.underline(v-else :href="content" target="_blank") {{ content }} 
      button.p-1(@click="edit = true")
        la-pen
    .p-1.flex.items-center.flex-1(v-else)
      input.p-2.rounded-xl.pr-16(type="text", v-model="text" @keydown.enter="update()")
      .-ml-16
        button.p-1(type="submit" @click="update()")
          la-check
        button.p-1(@click="text = ''; edit = false")
          la-times
</template>