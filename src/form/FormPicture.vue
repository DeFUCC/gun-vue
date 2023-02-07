<script setup>
import { ref, watch, computed } from 'vue'

import { usePictureUpload } from '#composables'

const props = defineProps({
  field: { type: String, default: 'cover' },
  options: {
    type: Object,
    default: () => ({
      picSize: 800,
      preserveRatio: true
    })
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

<template lang="pug">
.flex.flex-wrap
  input.hidden(
    v-if="!picture" 
    :id="id" 
    type="file"  
    accept="image/*"
    @change="handleChange"
    )
  label.m-1.button.cursor-pointer(
    :class="{ active: picture }" 
    :for="id" 
    @click="add = true"
    )
    slot
      .i-la-image
  ui-layer.max-h-60vh.mt-20(
    :open="add" 
    @close="add = false"
    )
    button.button.fixed.text-2xl.opacity-40.hover-opacity-100.m-4
      .i-la-check(@click="add = false")
    button.button.fixed.text-2xl.opacity-40.hover-opacity-100.mt-4.ml-18
      .i-la-trash-alt(@click="picture = ''; add = false")
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