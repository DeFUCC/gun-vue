<script setup>
import { useUser, useMate } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const { user } = useUser()

const { emoji, isMate, toggleMate } = useMate(props.pub)

</script>

<template lang="pug">
.flex.items-center(v-if="user.is && user.pub != pub")
  button.button.text-3xl(@click="toggleMate()")

    .ml-1.p-2(v-if="isMate") {{ isMate }}
    input.rounded-xl.w-3ch.p-2.rounded-lg.shadow-inner(v-if="!isMate" type="text" v-model="emoji" placeholder="" @click.stop.prevent)
    la-plus(v-if="!isMate")
    la-times(v-else)
</template>
