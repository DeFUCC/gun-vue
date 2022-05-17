<script setup>
import { useUser, useMate, useColor } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const { user } = useUser()
const colorDeep = useColor('deep')

const { emoji, isMate, toggleMate } = useMate(props.pub)

</script>

<template lang="pug">
.flex.items-center(v-if="user.is && user.pub != pub")
  button.flex.items-center.rounded-2xl.shadow-xl.px-2.text-3xl.bg-light-500(
    @click="toggleMate()" 
    :style="{ backgroundColor: isMate ? colorDeep.hex(pub) : '' }"
    )
    account-badge(:pub="user.pub" :showName="false")
    .p-2(v-if="isMate") {{ isMate }}
    input.mx-1.rounded-2xl.w-46px.p-2.rounded-lg.shadow-inner.text-center(
      v-if="!isMate" 
      type="text" 
      v-model="emoji" 
      placeholder="" 
      @click.stop.prevent
      )
    la-plus(v-if="!isMate")
    la-times(v-else)
</template>
