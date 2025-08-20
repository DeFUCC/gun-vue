<script setup vapor>
import { ref, watch } from 'vue'
import { fs } from './ZipGitFS.js'
import git from 'isomorphic-git'
import FormTextEditor from '../form/FormTextEditor.vue'

const props = defineProps({
  path: { type: String, default: 'README.md' },
})

const emit = defineEmits(['updated'])

const content = ref('')
const status = ref('')
const loading = ref(true)

const load = async () => {
  try {
    content.value = await fs.readFile(props.path, { encoding: 'utf8' })
    status.value = await git.status({ fs, dir: '/', filepath: props.path })
  } catch (e) {
    content.value = ''
    status.value = ''
  } finally {
    loading.value = false
  }
}

watch(() => props.path, async path => {
  await load()
}, { immediate: true })


const save = async () => {
  loading.value = true
  try {
    await fs.writeFile(props.path, content.value)
    status.value = await git.status({ fs, dir: '/', filepath: props.path })
    emit('updated')
  } finally {
    loading.value = false
  }
}

const stage = async () => {
  loading.value = true
  try {
    await git.add({ fs, dir: '/', filepath: props.path })
    status.value = await git.status({ fs, dir: '/', filepath: props.path })
    emit('updated')
  } finally {
    loading.value = false
  }
}

</script>

<template lang='pug'>
.p-2.flex.flex-col.gap-4
  .flex.flex-wrap.gap-2.mb-2.items-baseline
    .text-lg {{ path }}
    .flex-1.op-60.text-xs {{ status }}
    button.button.bg-green-500(@click="save()", :disabled="loading") Save

    button.button.bg-yellow-500(@click="stage()", :disabled="loading") Stage
  FormTextEditor(v-model="content" editable)
</template>