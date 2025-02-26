<script setup>

const props = defineProps({
  pub: {
    default: '',
    type: String
  }
})


</script>

<template lang='pug'>
.flex.flex-col.h-full
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      keep-alive
        component(:is="Component" style="flex: 6" )
</template>
