<script setup lang="ts">
import { watchOnce } from '@vueuse/core';
import { reactive, onMounted } from 'vue'

import { AccountBadge, AccountSelect } from './components'

const state = reactive({
  pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
  size: 200
})

function mySetup() {
  onMounted(async () => {
    const { useGuests } = await import('../composables')
    const { guests } = useGuests()
    watchOnce(() => guests, () => {
      state.pub = Object.keys(guests)[0]
    })
  })
}

</script>

<template lang="pug">
Story(
  title="Account/Badge" 
  icon="la:id-badge" 
  :setup-app="mySetup"
  )
  Variant(title="Round")
    Suspense
      AccountBadge(v-bind="state")

  template(#controls)
    .p-2.flex.flex-col.gap-4
      .flex.gap-2
        label(for="size") Size
        input#size(
          v-model="state.size"
          type="range"
          :min="40"
          :max="500"
          )
      AccountSelect(v-model:pub="state.pub")
</template>