<script setup>
import { ref, computed } from 'vue'
import { slugify } from '@composables'
const name = ref()
const slug = computed(() => slugify(name.value))
</script>

<template lang='pug'>
.flex.flex-col.items-center
  .p-2.flex.items-center
    input.p-4(type="text" v-model="name")
    button.button.mx-4.text-xl(@click="$router.push(`/space/${slug}`)") Go
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>