<script setup>
import { reactive, ref, watchEffect, watch, computed, nextTick } from 'vue'
const add = ref()
const url = ref()
const input = ref()
const valid = ref(false)

const emit = defineEmits(['update']);

watchEffect(() => {
  if (url.value) {
    valid.value = input?.value?.checkValidity()
    if (valid.value) {
      emit('update', url.value)
    }
  }
})

</script>

<template lang='pug'>
.flex.flex-wrap
  button.button.m-1(@click="add = !add" :class="{ active: valid }")
    la-link
  ui-layer(:open="add" @close="add = false")
    .text-lg Paste a link
    input.text-sm.p-4.my-4(ref="input" type="url" v-model="url" placeholder="Paste a URL")
</template>

<style lang="postcss" scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
.active {
  @apply bg-fuchsia-500;
}
</style>