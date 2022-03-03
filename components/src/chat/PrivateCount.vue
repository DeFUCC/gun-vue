<script setup>

import {useUser} from '@components'
const props = defineProps({
  pub: String
})

const emit = defineEmits(['chat'])

const {user} = useUser()

</script>

<template lang='pug'>
.p-2.flex.bg-light-200.rounded-full.cursor-pointer.shadow-md(@click="$emit('chat')")
  account-avatar(:pub="user.pub")
  ph-chats-light.text-3xl
  account-avatar(:pub="pub")
</template>