<script setup>
import {
  defineAsyncComponent,
  reactive
} from 'vue'

const QrLoad = defineAsyncComponent(() =>
  import('./QrLoad.vue')
)

const state = reactive({
  data: "",

})
</script>

<template lang="pug">
Story(
  title="Qr/Load" 
  icon="la:qrcode"
  )
  Variant(title="Round")
    ClientOnly
      Suspense
        QrLoad(
          v-bind="state" 
          @loaded="state.data = $event"
          )

  template(#controls)
    .p-4.flex.flex-col.gap-4
      .font-bold Output
      pre.text-xs {{ state.data }}
</template>
