<script setup>
import { safeHash } from '#composables';

import { GiftList } from '../components'
</script>

<template lang="pug">
gift-list(
  @open="$router.push(`/gifts/${safeHash($event)}`)"
  @project="$router.push(`/projects/${$event}`)"
  )
</template>