<script setup lang="ts">
import { theme } from './useTheme'

</script>

<template lang="pug">
button.button.p-2(@click="theme.dark = !theme.dark", aria-label="Toggle dark mode")
  .i-carbon-moon(v-show="theme.dark")
  .i-ion-ios-sunny(v-show="!theme.dark")
</template>
