<script setup>
import { useUser, useMate } from '#composables';
import { AccountBadge } from '../components'

const props = defineProps({
  pub: { type: String, default: '' }
})

const { user } = useUser()

const { emoji, isMate, toggleMate } = useMate(props.pub)

</script>

<template lang="pug">
.flex.items-center(v-if="user.is && user.pub != pub")
  .flex.items-center.rounded-2xl.shadow-xl.px-2.text-3xl.bg-light-500.dark-bg-dark-700(
    :style="{ backgroundColor: isMate ? 'green' : '' }" 
    )
    account-badge.w-8(
      :pub="user.pub" 
      :show-name="false"
      )
    .p-2(v-if="isMate") {{ isMate }}
    input.mx-1.rounded-2xl.w-46px.p-2.rounded-lg.shadow-inner.text-center(
      v-if="!isMate" 
      v-model="emoji" 
      type="text" 
      placeholder="" 
      @click.stop.prevent
      )
    button.button(@click="toggleMate()")
      .i-la-plus(v-if="!isMate")
      .i-la-times(v-else)
</template>
