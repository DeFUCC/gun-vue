<script setup>
import { useSpace } from '@gun-vue/composables'
const space = useSpace('testSpace')

space.db.get('try').on(d => console.log(d))

function tryIt() {
  space.db.get('try').put(Date.now())
}
</script>

<template lang='pug'>
.flex.flex-column.items-center
  .p-4.bg-light-400.shadow(@click="tryIt()") {{ space }}
</template>