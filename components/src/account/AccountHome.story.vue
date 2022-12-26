<script setup>
import { defineAsyncComponent, onMounted, reactive } from 'vue'
import { watchOnce } from '@vueuse/core'


const AccountHome = defineAsyncComponent(() => import('./AccountHome.vue'))
const AccountSelect = defineAsyncComponent(() => import('./AccountSelect.vue'))

const state = reactive({
  pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
})

function mySetup() {
  onMounted(async () => {
    const { useGuests } = await import('#composables')
    const { guests } = useGuests()
    watchOnce(guests, () => {
      state.pub = Object.keys(guests)[0]
    })
  })
}

</script>

<template lang="pug">
Story(
  title="Account/Home" 
  icon="la:home" 
  :setup-app="mySetup"
  )
  Variant(title="Round")
    ClientOnly
      Suspense
        AccountHome(
          :key="state.pub" 
          :pub="state.pub"
          )

  template(#controls)
    .p-2.flex.flex-col.gap-4
      AccountSelect(v-model:pub="state.pub")
</template>

<docs lang="md">
Currently it's important to set the `:key="pub"` attribute for the component to correctly update with changing pub key.
</docs>