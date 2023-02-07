<script setup>
import { ref } from 'vue'
defineProps({
  text: { type: String, default: '' },
  editable: Boolean,
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
.flex.mt-12.mb-2.items-center.gap-4
  h1.text-3xl.font-bold(
    ref="content"
    :contenteditable="editable" 
    @focus="edit = true"
    @blur="update($event)" 
    @keydown.enter.prevent.stop="update($event)"
    ) {{ text || '' }}
  .i-la-pen.text-2xl(
    v-if="editable && !edit" 
    @click="content.focus()"
    )
</template>