<script setup>
import { useUser, useColor, } from '@composables';
import { computed, ref } from 'vue'

const props = defineProps({
  isMy: [Boolean, String],
  reaction: [Boolean, String],
})

const emit = defineEmits(['react', 'user'])
const colorDeep = useColor('deep')

const { user } = useUser();

</script>

<template lang='pug'>
button.rounded-2xl.text-lg.bg-light-200.flex.items-center.pl-1.pr-1.mr-1(
  :style="{ backgroundColor: isMy ? colorDeep.hex(user.pub) : '' }"
  v-if="user.pub"
  ) 
  //- account-avatar.rounded-full.shadow-md(:pub="user.pub" :size="32")
  .flex.items-center.px-2.py-1.text-xl(
    v-if="!isMy"
    @click.stop.prevent="emit('react', '👍')" 
    )
    la-plus
  .flex.items-center(v-if="!isMy")
    input.py-1.px-2.w-36px.rounded-xl.mx-1.text-center(v-model="reaction" @input="$event.target.value && emit('react', reaction)" @click.stop.prevent v-if="!isMy")

  .flex.items-center(v-else @click.stop.prevent="emit('react', reaction)")
    .px-2.py-1.text-xl.w-36px {{ reaction }}
    la-times
  button.rounded-2xl.flex.items-center.pl-1.pr-1.mr-1(
    v-if="!isMy"
    @click.stop.prevent="emit('react', '🗑')"
  )
    la-minus
</template>