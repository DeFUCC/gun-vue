<script setup>
import { ref } from 'vue'
const props = defineProps({
  text: String,
  editable: Boolean,
})

const emit = defineEmits(['update'])

const content = ref('')
const edit = ref(false)

function update() {
  emit('update', content.value);
  edit.value = false
}
</script>

<template lang='pug'>
.flex.flex-col
  .flex.items-center.mr-4.mb-2(v-if="!edit")
    .break-all {{ text }}
    la-pen.ml-2.cursor-pointer(@click="content = text; edit = true" v-if="editable && !edit")
  form.flex.items-center(v-else action="javascript:void(0);")
    input.my-2.p-2.shadow-lg.rounded-lg.w-full(v-if="editable && edit" type="text" v-model="content" @keyup.escape="edit = false" @keyup.enter="update()")
    .-ml-20.flex
      button.cursor-pointer(type="submit" @click="update()")
        la-check
      button.ml-2.cursor-pointer(v-if="edit" @click="edit = false")
        la-times
</template>