<script setup>
import { useGun, useUser } from '#composables';
import { computed, reactive } from 'vue'

const props = defineProps({
  pub: {
    type: String,
    default: ''
  }
})

const { user } = useUser()
const gun = useGun()

const my = computed(() => user.pub == props.pub)

const wallets = reactive({})

gun.user(props.pub).get('wallets').map().on((d, k) => {
  wallets[k] = d
})

</script>

<template lang='pug'>
.flex.flex-col.p-4.w-full
  .text-xl.flex.gap-2
    span(v-if="my") My
    span wallets
    .flex-1
    account-badge(:pub="pub")
  .flex.flex-col
    p {{ wallets }}
  form(action="javascript:void(0)" v-if="user.pub == pub")
    button.button() Add wallet
</template>