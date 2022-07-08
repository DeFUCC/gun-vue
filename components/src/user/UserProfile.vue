<script setup>
import { useAccount, useUser, addProfileField } from '@composables'
import { ref } from 'vue'

const { user } = useUser()

const { account } = useAccount(user.pub)

const newField = ref('')

</script>

<template lang='pug'>
.flex.flex-col
  .flex.flex-col.p-2
    user-profile-field(
      v-for="(d, k) in account.profile" :key="d"
      :field="k" :content="d")
    .flex.items-center.flex-wrap
      input.p-2.rounded-lg.shadow-md(v-model="newField" @keydown.enter="addProfileField(newField)" placeholder="New profile field")
      button.m-2.button.items-center(@click="addProfileField(newField)")
        la-plus
        .p-1.text-sm Add
</template>