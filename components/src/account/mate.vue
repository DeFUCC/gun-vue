<script setup>
import { ref } from 'vue'
import { useUser, getFirstEmoji } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const { user } = useUser()

const emoji = ref('👋')
const isMate = ref(false)

const dbMate = user.db.get('mates').get(props.pub)

dbMate.on(d => {
  isMate.value = getFirstEmoji(d)
})

function toggleMate() {
  dbMate.put(isMate.value ? false : getFirstEmoji(emoji.value))
}

</script>

<template lang="pug">
.flex.items-center(v-if="user.is && user.pub != pub")
  button.button.text-3xl(@click="toggleMate()")
    la-plus(v-if="!isMate")
    la-times(v-else)
    .ml-1 {{ isMate ? isMate : '👋' }}
    input.w-2ch(type="text" v-model="emoji" placeholder="👋" @click.stop.prevent)
</template>
