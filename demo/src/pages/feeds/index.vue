<script setup>
import { useTags } from '@composables'
const { tags } = useTags()
</script>

<template lang='pug'>

tag-list.m-2.p-2.shadow-md.rounded-xl(@tag="$router.push($event)")
.p-4.text-center.opacity-20.text-xl.text-shadow-md Open one of {{ tags.count }} feeds
</template>