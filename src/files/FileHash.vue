<script setup>
import { reactive } from 'vue'
import { hashText } from '../crypto/useCrypto';

const files = reactive({})

function calculateHash(ev) {
  const uploads = ev?.target?.files
  for (const file of uploads) {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      // Use a regex to remove data url part
      const base64String = reader.result
      const hash = await hashText(base64String)
      files[hash] = { name: file.name }
    };
  }
}
</script>

<template lang='pug'>
.flex.flex-col.gap-2.p-2
  label.p-2.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer.max-w-90.overflow-scroll
    .font-bold Check file hash
    .flex-1
    input(
      type="file"
      @change="calculateHash($event)"
      )
  .p-2.flex.flex-col.break-all.bg-light-100.dark-bg-dark-400.shadow(v-for="(file,hash) in files" :key="hash")
    .p-0.text-xs.bg-light-400.dark-bg-dark-800.select-none.opacity-80 {{ file.name }} 
    .font-mono.p-0.text-lg {{ hash }}

</template>