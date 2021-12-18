<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close'])
import { useTag } from '@composables';
const text = ref()
const { list, addToTag } = useTag(toRef(props, 'tag'))
</script>

<template lang='pug'>
.m-4.shadow-lg.p-4
  .flex.items-center
    .text-xl {{ tag }}
    .p-2(@click="$emit('close')")
      la-times
  .flex.flex-wrap
    .post(v-for="(item, hash) in list" :key="hash") {{ item?.text ? item.text : item }}
  form.mt-6(action="javascript:void(0);")
    input.p-4.rounded-xl(v-model="text")
    button.button(type="submit" @click="addToTag({ text }); text = ''") POST
</template>

<style scoped>
.post {
  @apply p-2 shadow-md m-1 rounded-lg;
}
</style>