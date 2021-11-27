<script setup>
import { useAccount } from 'gun-composable/account'

const { account } = useAccount()
</script>

<template lang='pug'>
.flex.flex-col.p-8
  .text-sm {{ account }}
  button.button(@click="account.generate()") Generate
  .p-2.rounded-xl.border-1
    label(for="name") Name
    input#name(type="text" v-model="account.name")
  button.button(@click="account.auth()" v-if="!account.is") Auth
  button.button(@click="account.logout()" v-else) Logout
  .p-2.rounded-xl.border-1
    label(for="name") Age
    input#name(type="text" v-model="account.profile.age")
</template>