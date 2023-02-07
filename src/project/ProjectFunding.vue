<script setup>
import { useUser, useProject, useMd, useProjectGifts } from '#composables';

const props = defineProps({
  path: { type: String, default: '' },
  enabled: { type: Boolean, default: false },
})

const emit = defineEmits(['enable', 'gift', 'open'])

const { gifts, collections } = useProjectGifts(props.path)

const { user } = useUser()
</script>

<template lang="pug">
.flex.flex-col
  .text-xl.my-4.p-2.flex.items-center
    .font-bold Project funding
    .flex-1
    template(v-if="!enabled")
      button.button(
        v-if="path.includes(user.pub)" 
        @click="$emit('enable')"
        ) Enable Funding
      .text-xs(v-else) Funding not yet enabled by the author
    gift-button(
      v-else 
      :gift="{ project: path, to: path.slice(-87) }" 
      @sent="$emit('gift', $event)"
      )

  .p-2.flex.flex-col.gap-4(v-if="enabled")
    .flex.flex-col.gap-2.p-2.bg-dark-50.rounded-xl.bg-opacity-10.shadow-xl(
      v-for="(ql, qlName ) in collections" 
      :key="ql"
      )
      .p-2.w-full.flex.items-center.gap-2
        .text-xl.font-bold {{ ql.sum }} 
        .text-xl {{ qlName }}
        .opacity-50 by
        .flex.flex-wrap.gap-2 
          account-badge(
            v-for="(sum, pub) in ql.from" 
            :key="sum" 
            :pub="pub"
            ) 
            .mr-2 {{ sum }} {{ qlName }}

      template(v-if="collections?.[qlName]?.from?.[user.pub] || path.includes(user.pub)")
        gift-card.cursor-pointer(
          v-for="(gift, hash) in ql.list"
          v-show="gift.from == user.pub || gift.to == user.pub" 
          :key="hash"
          :hash="hash"
          @click="$emit('open', hash)"
          )
</template>