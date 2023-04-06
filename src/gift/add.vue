<script setup>
import { safeHash } from '#composables';

import { GiftForm } from '../components'
</script>

<template lang="pug">
gift-form(@sent="$router.push(`/gifts/${safeHash($event)}`)" )
</template>