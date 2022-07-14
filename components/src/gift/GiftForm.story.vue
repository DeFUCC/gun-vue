<script setup>
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { computedAsync } from '@vueuse/core'

const GiftForm = defineAsyncComponent(() =>
  import('./GiftForm.vue')
)


</script>

<template lang="pug">
Story(title="Gift/Form")
  Variant(title="Round")
    GiftForm
  template(#controls)
    .p-2.flex.flex-col.gap-4
      
</template>