<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserAvatar = defineAsyncComponent(() =>
  import('./UserAvatar.vue')
)

const state = reactive({
  size: 200,
})


</script>

<template lang="pug">
Story(
  title="User/Avatar" 
  icon="la:user"
  )
  Variant(title="Round")
    UserAvatar(v-bind="state")

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
</template>