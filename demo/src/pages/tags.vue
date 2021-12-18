<script setup>
import { useRouter } from 'vue-router'
const route = useRouter()
function navigate(tag) {
  route.push(tag)
}
</script>

<template lang='pug'>
.flex.flex-col
  tag-list.m-2.p-2.shadow-md.rounded-xl(@tag="$router.push($event)")
  router-view
</template> 