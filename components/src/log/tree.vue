<script setup>
import { useLog, formatDate, color, safeHash, gunAvatar } from '@composables'
const props = defineProps({
  name: { type: String, default: 'logs' },
  after: { type: String, default: "2021-01-01" },
  before: { type: String, default: "2023-01-01" },
})
const { sorted, putNow, count } = useLog(props);
// const message = ref()
// const input = ref()

// onMounted(() => {
//   input.value.focus()
// })

</script>

<template lang='pug'>
.flex.flex-col.m-2.p-4.rounded-2xl.shadow-lg

  .flex.flex-col.text-sm

    //- form.p-4.flex.flex-wrap(action="javascript:void(0)")
    //-   input.p-4.rounded-xl.mr-4(v-model="message" autofocus ref="input")
    //-   button.button(@click="message && putNow(message); message = ''") Say now

    .p-1.flex.items-center.rounded-xl.row(v-for="data in sorted" :key="data")
      .mx-1.px-2.rounded-xl(:style="{ backgroundColor: color.deep.hex(data[1].event) }") {{ data[1].event }}
      .flex-1(v-if="data[1].event == 'now'") {{ data[1].data }}
      .flex.rounded-xl(v-if="data[1].event == 'guest'" :style="{ backgroundColor: color.deep.hex(data[1]?.pub || 0) }")
        img.rounded-xl(:src="gunAvatar(data[1].pub, 24)")
        .px-2 @{{ data[1].space }}
      router-link.mx-1.p-1.rounded-xl(
        v-if="data[1].event == 'new-post'" :to="'/feeds/' + data[1].feed + '/' + safeHash(data[1].hash)" 
        :style="{ backgroundColor: color.light.hex(data[1]?.hash || 0) }"
        ) {{ '#' + data[1].feed }}/{{ safeHash(data[1].hash) }}
      .flex-1
      .mx-1.text-sm {{ formatDate(data[0]).ms }} 
    .p-2.mt-4.opacity-20 Total {{ count }} log records

</template>

<style scoped>
.row:nth-child(2n) {
  @apply bg-light-900;
}
</style>