<script setup>
import { DictAuthors } from '../components'
</script>

<template lang="pug">
dict-authors(@author="$router.push(`/dict/by/${$event}`)")
</template>