<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  pub: { type: String, default: '' }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})

</script>

<template lang='pug'>
.p-0
  ui-layer(:open="open" :closeButton="false"  @close="$router.push('/users/')")
    account-home(
    :pub="pub" 
    @browse="$router.push(`/users/${$event}`)" 
    :key="pub"
    @feed="$router.push(`/posts/${$event}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )

</template>