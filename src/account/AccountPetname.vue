<script setup lang="ts">
import { useUser, setPetname, SEA } from '../composables'
import { watch, ref } from 'vue'
import { Dropdown } from 'floating-vue'

const props = defineProps({
  pub: { type: String, default: '' }
})

const { user } = useUser()
const petname = ref('')
const newName = ref('')
const editPetname = ref(false)

watch(() => props.pub, pub => {
  user.db.get('petnames').get(pub).on(async d => {
    petname.value = await SEA.decrypt(d, user.pair())
  })
}, { immediate: true })

const petnameRules = {
  'The key must be resistant enough to forgery to survive in the context of the application threat model': true,
  'There can be at most one petname per key per user per application': true,
  'There can be at most one key per petname (per user per application)': true,
  'In the application user interface, all references to the key are represented by the petname': true,
  'The user must be able to assign a private petname to any key': true,
  'The petname must be assigned to the key only by explicit user action': true,
  'The user must be able to repeatedly edit the petname of any key': true,
  'The user interface shall assist the user in assuring that two petnames are not similar enough to enable mimicry': false,
  'Nicknames and alleged names must be unambiguously visually distinct from petnames': true,
}


</script>

<template lang="pug">
.flex.items-center.gap-2.px-2(v-if="user.is")
  account-avatar(
    :pub="pub" 
    :size="40"
    )
  .text-lg.flex.items-center.gap-2(v-if="petname && !editPetname") {{ petname }}
    .i-la-pen(@click="editPetname = !editPetname")
  input.m-1.p-2.rounded-lg(
    v-else 
    v-model="newName" 
    placeholder="Set private petname"
    @keydown.enter="setPetname(pub, newName); editPetname = false"
    @keydown.escape="editPetname = false"
    )
  .flex-1
  Dropdown
    .i-la-info-circle.cursor-pointer
    template(#popper)
      .text-xs.px-4.py-2.leading-5
        ul.max-w-120
          li.flex.gap-2.items-start(
            v-for="(state, rule) in petnameRules" 
            :key="rule"
            )
            input.my-2(
              type="checkbox" 
              :checked="state" 
              disabled
              )
            .p-0 {{ rule }}


        a.font-bold.underline(
          href="http://www.skyhunter.com/marcs/petnames/IntroPetNames.html"
          target="_blank"
          ) Stiegler, 2005

</template>

<style scoped lang="postcss">
li {
  @apply ml-0;
}
</style>


