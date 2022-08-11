<script setup>
import { useUser, useProject, updateProjectField, useMd, useProjectGifts } from '#composables';
import { toRef, ref, computed, watchEffect } from 'vue'
import InkMde from 'ink-mde/vue'

const emit = defineEmits(['gift'])

const props = defineProps({
  path: { type: String, default: '' },
})

const { user } = useUser()

const md = useMd()

const { project } = useProject(toRef(props, 'path'))

const editable = computed(() => props.path.includes(user.pub))

const editing = ref(false)

const text = ref('')

watchEffect(() => {
  text.value = project.value.text
})

const { gifts, collections } = useProjectGifts(props.path)


</script>

<template lang='pug'>
.flex.flex-col
  .p-2.relative(:style="{ background: `url(${project.cover}) center`, backgroundColor: project.color }")

    input.absolute.top-4.right-4(
      type="color" 
      :value="project.color" 
      @input="updateProjectField(path.slice(0, -88), 'color', $event.target.value)" 
      v-if="editable"
      )

    form-picture(@update="updateProjectField(path.slice(0, -88), 'cover', $event)" v-if="editable")


    form-title(
      :text="project.title" 
      :editable="editable" 
      @update="updateProjectField(path.slice(0, -88), 'title', $event)")

    account-badge.absolute.bottom-4.right-4(:pub="path.slice(-87)")

  .flex.flex-col.gap-2.m-2.bg-light-200.p-2.rounded-xl.shadow.relative
    la-pen.cursor-pointer.text-2xl.absolute.top-2.right-2.z-2(@click="editing = !editing" v-if="editable")
    .p-2.markdown-body(v-html="md.render(text || '')" v-if="!editing || !editable")
    InkMde(v-else :modelValue="text" @update:modelValue="updateProjectField(path.slice(0, -88), 'text', $event)")

  //- pre.p-4.my-4.text-xs.overflow-scroll {{ project }}
  .text-xl.my-4.p-4.flex.items-center() 
    .font-bold Project funding
    .flex-1
    template(v-if="!project.funding")
      button.button(v-if="path.includes(user.pub)" @click="updateProjectField(path.slice(0, -88), 'funding', true)") Enable Funding
      .text-xs(v-else) Funding not yet enabled by the author
    gift-button(v-if="project.funding" :gift="{ project: path, to: path.slice(-87) }" @sent="$emit('gift', $event)")
  .p-2.flex.flex-col.gap-4(v-if="project.funding")

    .flex.flex-col.gap-2.p-2.bg-dark-50.rounded-xl.bg-opacity-10.shadow-xl(v-for="(ql, qlName ) in collections" :key="ql")
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
          @click="$emit('open', hash)"
          v-for="(gift, hash) in ql.list" 
          :key="hash"
          :hash="hash"
          v-show="gift.from == user.pub || gift.to == user.pub"
          )
</template>