<script setup>
import { usePassLink, user } from '@composables'
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
const router = useRouter()

const props = defineProps({
  data: { type: String, default: '' }
})

const passPhrase = ref('')
const status = ref('')
const input = ref()
onMounted(() => {
  status.value = usePassLink(props.data)
})
watch(user, user => {
  if (user.is) {
    router.push('/auth/')
  }
})
</script>

<template lang='pug'>
.p-8.bg-light-200.rounded-3xl.shadow-xl.m-4
  .my-2(v-if="status == 'success'") You successfully logged in with a link
  .my-2(v-if="status == 'encrypted'")
    h1.text-3xl.font-bold.my-2 Hello! 
    h2.my-2.text-xl Seems like you have an encrypted key. 
    h3 You need to enter the correct passphrase to authorize with it.
    .flex.mt-4.items-stretch
      input.border-1.border-dark-100.p-4.rounded-xl(type="password" ref="input" v-model="passPhrase" autofocus @keydown.enter="usePassLink(data, passPhrase)")
      button.button.items-center(type="submit" @click="usePassLink(data, passPhrase)") Enter
</template>