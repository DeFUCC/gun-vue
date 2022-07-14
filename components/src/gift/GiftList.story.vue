<script setup>
import { defineAsyncComponent, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { computedAsync } from '@vueuse/core'

const GiftList = defineAsyncComponent(() =>
  import('./GiftList.vue')
)



</script>

<template lang="pug">
Story(title="Gift/List")
  Variant(title="Round")
    GiftList
  template(#controls)
    .p-2.flex.flex-col.gap-4
     
</template>