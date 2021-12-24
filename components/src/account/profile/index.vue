<script setup>
import { useAccount, color } from '@composables'
const { account, leave } = useAccount()
const addField = ref(false)
const newField = ref('')

function addNewField() {
  if (!addField.value) {
    addField.value = true
    return
  }
  account.profile[newField.value] = ''
  addField.value = true
}
</script>

<template lang='pug'>
.flex.flex-col(v-if="account.is")
  .flex.flex-col.p-2
    account-profile-field(
      v-for="(d,k) in account.profile" :key="d"
      :field="k" :content="d")
    .flex.items-center
      input.p-2.rounded-lg.shadow-md(v-model="newField" v-if="addField" @keydown.enter="account.profile[newField] = ''")
      button.button(@click="addNewField()")
        la-plus
</template>