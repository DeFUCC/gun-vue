<script setup>
import { user } from '#composables'
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
  status.value = useAuthLink(props.data)
})
watch(user, user => {
  if (user.is) {
    router.push('/')
  }
})

function useAuthLink(data, passPhrase) {
  if (!data) return;
  const gun = useGun();
  const decoded = decodeURIComponent(data);
  if (decoded.substring(0, 3) == "SEA") {
    if (passPhrase) {
      SEA.decrypt(decoded, passPhrase).then(pair => {
        gun.user().auth(pair);
      })
    }
    return "encrypted";
  } else {
    try {
      let d = JSON.parse(decoded);
      if (isPair(d)) {
        gun.user().auth(d);
      }
      return "success";
    } catch (e) {
      return "incorrect link";
    }
  }
}
</script>

<template lang="pug">
.p-8.bg-light-200.dark-bg-dark-200.rounded-3xl.shadow-xl.m-4
  .my-2(v-if="status == 'success'") You successfully logged in with a link
  .my-2(v-else-if="status == 'encrypted'")
    h1.text-3xl.font-bold.my-2 Hello! 
    h2.my-2.text-xl Seems like you have an encrypted key. 
    h3 You need to enter the correct passphrase to authorize with it.
    .flex.mt-4.items-stretch
      input.border-1.border-dark-100.p-4.rounded-xl(type="password" ref="input" autocomplete="current-password" v-model="passPhrase" autofocus @keydown.enter="useAuthLink(data, passPhrase)")
      button.button.items-center(type="submit" @click="useAuthLink(data, passPhrase)") Enter
  .my-2(v-else)
    h1.text-2xl Failed to parse the auth link.
</template>