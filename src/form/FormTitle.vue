<script setup>
import { ref } from 'vue'
defineProps({
  text: { type: String, default: '' },
  editable: { type: Boolean, default: false }
})

const emit = defineEmits(['update'])

const content = ref('')
const edit = ref(false)

function update(ev) {
  emit('update', ev.target.innerText);
  ev.target.blur()
  edit.value = false
}

</script>

<template lang="pug">
.flex.mb-2.items-center.gap-4(v-if="text || editable")
  .p-0(
    ref="content"
    :contenteditable="editable" 
    @focus="edit = true"
    @blur="update($event)" 
    @keydown.enter.prevent.stop="update($event)"
    ) {{ text || '' }}
  .i-la-pen(
    v-if="editable && !edit" 
    @click="content.focus()"
    )
</template>