<script setup>
import { genUUID, useGun, useUser } from '#composables';
import { computed, reactive, ref } from 'vue'
import vSelect from 'vue-select' // https://vue-select.org/
import 'vue-select/dist/vue-select.css';
import { currencies } from './currencies.js';

const emit = defineEmits(['wallet', 'clear'])

const props = defineProps({
  pub: {
    type: String,
    default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk'
  },
  activeWallet: {
    type: Object,
    default: () => ({})
  }
})

const { user } = useUser()
const gun = useGun()

const my = computed(() => user.pub == props.pub)

const wallets = reactive({})

gun.user(props.pub).get('wallets').map().on((d, k) => {
  if (!d) {
    delete wallets[k]
    return
  }
  let obj = { ...d }
  delete obj._
  wallets[k] = obj
})

const open = ref()

const newWallet = reactive({
  currency: '',
  account: '',
  url: ''
})

function addWallet() {
  const uuid = genUUID()
  gun.user().get('wallets').get(uuid).put(newWallet)
  open.value = false
}

function removeWallet(key) {
  console.log(key)
  gun.user().get('wallets').get(key).put(null)
}



</script>

<template lang="pug">
.flex.flex-col.gap-2
  .flex.flex-col.gap-2
    gift-wallet.cursor-pointer(
      v-for="(wallet, key) in wallets" 
      :key="wallet" 
      :wallet="wallet"
      :style="{ backgroundColor: wallet == activeWallet ? '#3333' : '' }"
      @click="wallet != activeWallet ? $emit('wallet', wallet) : $emit('clear')"
      )
      .i-la-trash-alt.opacity-40.hover-opacity-90(
        v-if="user.pub == pub" 
        @click="removeWallet(key)"
        )

  button.button(
    v-if="user.pub == pub" 
    @click="open = true"
    ) Add a wallet
ui-layer(
  :open="open" 
  @close="open = false"
  )
  .p-2
    .text-xl Add a new wallet
    .grid.grid-cols-2.gap-2(style="grid-template-columns: 1fr 6fr;")

      .p-2 Currency
      vSelect.rounded-xl(
        v-model="newWallet.currency"
        :options="currencies"
        :append-to-body="true"
        placeholder="Your account currency"
        :taggable="true"
        :push-tags="true"
      )

      .p-2 Account
      textarea.shadow-lg.rounded-xl.p-2(
        v-model="newWallet.account" 
        type="text" 
        placeholder="Your account details"
        )

      .p-2 URL
      input.shadow-lg.rounded-xl.p-2(
        v-model="newWallet.url" 
        type="text" 
        placeholder="Link to the payment gateway"
        )
      .p-2 PREVIEW
      gift-wallet(:wallet="newWallet")
      button.button.col-span-2(@click="addWallet()") Add the wallet

</template>