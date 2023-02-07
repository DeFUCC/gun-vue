<script setup>
import { currentRoom, useGun } from '#composables';
import { ref, reactive, computed } from 'vue'
const props = defineProps({
  cert: { type: String, default: '' },
  open: { type: [Boolean, String], default: false },
  title: { type: String, default: '' },
  type: { type: String, default: '' },
  pub: { type: String, default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk' },
})

defineEmits(['browse'])

const count = computed(() => {
  const gun = useGun()
  const obj = reactive({})
  gun.user(props.pub).get(props.type).map().once((d, k) => {
    if (!d) return
    obj[k] = true
  })
  return obj
})

</script>

<template lang="pug">
.cursor-pointer.flex-1.flex.flex-col.items-center.p-4.relative.bg-light-700.rounded-lg.shadow-sm.transition.hover-shadow-lg(:title="cert")
  .text-4xl 
    room-feature-icon(:icon="type")
  .px-1.font-bold() {{ title }}
  .i-la-lock-open.text-xs.absolute.top-1.right-1.opacity-30(v-if="open")
  .absolute.bottom-1.right-1.text-xs.opacity-30 {{ Object.keys(count).length }}
</template>