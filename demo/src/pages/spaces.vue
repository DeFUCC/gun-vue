<script setup>
import { ref, computed } from 'vue'
import { slugify } from '@composables'
const name = ref()
const slug = computed(() => slugify(name.value))
</script>

<template lang='pug'>
.flex.flex-col.items-center
  .p-2.flex.items-center
    input.p-3.rounded-2xl.shadow-md(type="text" v-model="name" placeholder="Enter a space name" @keyup.enter="$router.push(`/spaces/${slug}`)")
    button.button.mx-4.text-xl(@click="$router.push(`/spaces/${slug}`)") Go
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>