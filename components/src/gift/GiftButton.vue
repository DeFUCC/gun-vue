<script setup>
import { reactive, computed, ref } from 'vue'

const props = defineProps({
  gift: {
    type: Object,
    default: {
      project: '',
      from: '',
      to: '',
      qn: 0,
      ql: ''
    }
  }
})

const open = ref()

function fund() {
  console.log('funded!', props.gift)
}

</script>

<template lang='pug'>
button.button(@click="open = true") Fund it now!
ui-layer(:open="open" @close="open = false")
  .p-2
    gift-form(:gift="gift")
</template>