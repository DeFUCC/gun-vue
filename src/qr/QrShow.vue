
<script setup>

const props = defineProps({
  data: { type: String, default: '' },
  size: { type: Number, default: 400 },
  margin: { type: Number, default: 1 }
});

import { useQRCode } from '@vueuse/integrations/useQRCode'

const qrcode = useQRCode(() => props.data, {
  errorCorrectionLevel: 'Q',
  scale: 8,
  margin: 4
})
</script>
<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.min-w-16.flex.flex-col.items-center
  img(:src="qrcode" alt="QR Code")
</template>

