<script setup>
import { ref, watch, computed } from 'vue'

import { usePictureUpload } from '@composables'

const props = defineProps({
  field: { type: String, default: 'cover' },
  options: {
    type: Object, default: {
      picSize: 800,
      preserveRatio: true
    }
  }
})

const emit = defineEmits(['update'])

const id = computed(() => `${props.field}_upload`)
const add = ref(false)
const picture = ref()

const { state, handleChange } = usePictureUpload(props.options)

watch(() => state.output, file => {
  if (file?.content) {
    add.value = true
    picture.value = file.content
  }
})

watch(picture, pic => {
  emit('update', pic)
})


</script>

<template lang='pug'>
.flex.flex-wrap
  input.hidden(type="file" v-if="!picture" :id="id"  @change="handleChange" accept="image/*")
  label.m-1.button.cursor-pointer.opacity-50.hover_opacity-100(@click="add = true" :class="{ active: picture }" :for="id")
    slot
      la-image
  ui-layer(:open="add" @close="add = false")
    button.button.absolute.text-2xl.right-2.opacity-40.hover_opacity-100
      la-trash-alt(@click="picture = null; add = false")
    img(:src="picture")
</template>

<style lang="postcss" scoped>
input {
  @apply p-2 rounded-xl m-1;
}
.button.active {
  @apply bg-fuchsia-800;
}
</style>