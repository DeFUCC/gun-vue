<script setup lang="ts">
import { pass } from '#composables'
import { ref, reactive, watch } from 'vue'
import { createPassKey } from './usePassKeys'
import derivePair from '@gun-vue/gun-es/derive'

const openDerivePair = ref()
const password = ref('')
const extra = ref('')

const emit = defineEmits(['pair', 'login'])

const pair = ref()

const error = ref(false)

watch([password, extra], async ([p, e]) => {
    try {
        if (!p) return
        pair.value = await derivePair(password.value, extra.value)
        error.value = false
        emit('pair', pair.value)
    } catch (e) {
        error.value = e
    }
})

</script>

<template lang="pug">
.flex.flex-col.gap-2.items-center.p-2.bg-light-700.dark-bg-dark-200.rounded-xl.shadow-lg.text-center.p-4.transition.duration-300ms.ease-in.border-3(:class="{ 'border-red': error, 'border-green': !error }")
    .flex.gap-1.items-center
        .i-la-fingerprint.text-2xl
        .text-xl Derive your keypair 
    input.p-2.text-lg(v-model="password" placeholder="Passphrase")
    input.p-2.text-lg(v-model="extra" placeholder="Extra entropy")
    .text-red(v-if="error") {{ error }}
</template>