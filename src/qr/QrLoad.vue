<script setup>
import { useQR } from './useQR';
const emit = defineEmits(["loaded"]);

const { processFile } = useQR()

</script>

<template lang="pug">
input#qr-input(
  type="file",
  accept="image/*",
  @change="processFile($event.target.files[0],(data)=> $emit('loaded',data))"
  )
</template>


