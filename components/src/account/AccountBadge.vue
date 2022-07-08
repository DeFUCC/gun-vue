<script setup>
import { ref, watchEffect } from 'vue'
import { useGun, useColor, selectedUser } from '@composables'

const props = defineProps({
  pub: { type: String, default: '' },
  showName: { type: Boolean, default: true },
  size: { type: Number, default: 30 },
  selectable: Boolean,
  vertical: Boolean
})

const name = ref('')

const colorDeep = useColor('deep')

const gun = useGun()

watchEffect(() => {
  gun.user(props.pub).get('profile').get('name').on(d => {
    name.value = d
  })
});

function select() {
  if (props.selectable) {
    selectedUser.pub = props.pub
  }
}
</script>

<template lang="pug">
.frame.p-2px.flex.items-center.rounded-full.bg-light-900.cursor-pointer.shadow.transition.duration-400.ease-in(
  :style="{ backgroundColor: colorDeep.hex(pub), flexDirection: vertical ? 'column' : 'row' }"
  @click="select()"
  :title="showName ? pub : name"
  )
  account-avatar(:pub="pub" :size="size")
  .mx-2.font-bold.text-sm.max-w-8ch.overflow-ellipsis.overflow-hidden.whitespace-nowrap(v-if="showName && name") {{ name }}
  .tip.mx-2.font-bold.text-sm.max-w-8ch.overflow-ellipsis.overflow-hidden.whitespace-nowrap.absolute.opacity-0.hover_opacity-100.transition-all.duration-300.ease-in.text-center.transform.translate-y-2.p-1.rounded-lg(
    v-else
    :style="{ transform: `translateY(${-size - 5}px) translateX(-50%)`, backgroundColor: colorDeep.hex(pub) }"
    v-if="name"
    ) {{ name }}
  slot
</template>

<style lang="postcss" scoped>
.frame:hover .tip {
  @apply opacity-100;
}
</style>