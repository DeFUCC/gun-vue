<script setup>
import { ref } from 'vue'

defineEmits(['sent'])

defineProps({
  gift: {
    type: Object,
    default: () => ({
      project: '',
      from: '',
      to: '',
      qn: 0,
      ql: ''
    })
  }
})

const open = ref()


</script>

<template lang="pug">
button.button(@click="open = true") Fund it now!
ui-layer(
  :open="open" 
  @close="open = false"
  )
  .p-2
    gift-form(
      :gift="gift" 
      @sent="open = false; $emit('sent', $event)"
      )
</template>