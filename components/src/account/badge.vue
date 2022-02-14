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
.p-2px.flex.items-center.rounded-full.bg-light-900.cursor-pointer.shadow.transition.duration-400.ease-in(
  :style="{ backgroundColor: colorDeep.hex(pub), flexDirection: vertical ? 'column' : 'row' }"
  @click="select()"
  )
  account-avatar(:pub="pub" :size="size")
  .mx-2.font-bold.text-sm.max-w-8ch.overflow-ellipsis.overflow-hidden.whitespace-nowrap(v-if="showName && name") {{ name }}
  slot
</template>