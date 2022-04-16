<script setup>

import { useUser, useDictRecordsBy } from '@composables';
import { computed } from 'vue'

const props = defineProps({
  author: String
})

const { user } = useUser()

const pub = computed(() => props.author || user.pub)

const records = computed(() => useDictRecordsBy(pub.value))

</script>

<template lang='pug'>
.p-8.bg-light-200(v-if="user.is") 
  .text-xl.mb-4 Records by {{ pub == user.pub ? 'me' : pub }}
  p {{ records }}
</template>