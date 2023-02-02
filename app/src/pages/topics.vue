<script setup>

</script>

<template lang="pug">
.flex.relative.items-stretch.bg-dark-50.bg-opacity-40.max-h-90vh.min-h-90vh
  chat-topics(@topic="$router.push(`/topics/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")
</template>