<script setup lang="ts">
import { derivePair, pass } from '#composables'
import { ref, reactive, watch } from 'vue'
import { createPassKey } from './usePassKeys'

const openDerivePair = ref()
const password = ref('')

const emit = defineEmits(['pair', 'login'])

const pair = ref()

const error = ref(false)

watch(pair, p => emit('pair', p))

watch(password, async () => {
    try {
        pair.value = await derivePair(password.value)
        error.value = false
    } catch (e) {
        error.value = e
    }
})

async function generatePK() {
    pair.value = await derivePair(JSON.stringify(await createPassKey()))
    emit('login')
}

</script>

<template lang="pug">
.flex.flex-col.gap-2.items-center.p-2.bg-light-700.dark-bg-dark-200.rounded-xl.shadow-lg.text-center.p-4.transition.duration-300ms.ease-in.border-3(:class="{ 'border-red': error, 'border-green': !error }")
    .flex.gap-1.items-center
        .i-la-fingerprint.text-2xl
        .text-xl Derive your keypair 
    button.button(@click.stop.prevent="generatePK()") PassKey
    input.p-2.text-lg(v-model="password" placeholder="Passphrase")
    .text-red(v-if="error") {{ error }}
</template>