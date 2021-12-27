<script setup>
import { usePassLink, user } from '@composables'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  data: { type: String, default: '' }
})

const passPhrase = ref('')
const status = ref('')
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
.p-8 {{ status }}
  .my-2(v-if="status == 'success'") You successfully logged in with a link
  .my-2(v-if="status == 'encrypted'")
    h2.text-xl.font-bold You need to enter your password to login with this link
    input(type="password" v-model="passPhrase" @keydown.enter="usePassLink(data, passPhrase)")
</template>