<script setup>
import { DictBy } from '../components'

const props = defineProps({
  author: String
})


</script>

<template lang="pug">
dict-by(:author="author")
</template>