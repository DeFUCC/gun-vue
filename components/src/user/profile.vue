<script setup>
import { useAccount, user, addProfileField, color } from '@composables'

const { account } = useAccount(user.pub)

const newField = ref('')

</script>

<template lang='pug'>
.flex.flex-col
  .flex.flex-col.p-2
    user-profile-field(
      v-for="(d,k) in account.profile" :key="d"
      :field="k" :content="d")
    .flex.items-center
      input.p-2.rounded-lg.shadow-md(v-model="newField" @keydown.enter="addProfileField(newField)")
      button.button.items-center(@click="addProfileField(newField)")
        la-plus
        .p-1 Add a field
</template>