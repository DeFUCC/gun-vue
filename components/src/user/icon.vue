<script setup>
import { useUser } from '@composables';
import { ref, onMounted } from 'vue'

const props = defineProps({
  size: { type: Number, default: 42 }
})

onMounted(() => {
  useUser()
})
const open = ref(false)

</script>

<template lang="pug">
.mx-2.text-xl.cursor-pointer
  account-avatar(:size="size" :border="2" @click="open = true")
  ui-layer(:open="open" @close="open = false")
    user-home
</template>