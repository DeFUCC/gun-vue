<script setup vapor>
import { onMounted, ref, reactive, watch, computed } from 'vue';
import GitMD from './GitMD.vue';
import GitImage from './GitImage.vue';
import { useRepo } from './useRepo.js'
import git from 'isomorphic-git'
import { fs } from './ZipGitFS';


const props = defineProps({
  id: { type: String, default: '' }
})

const { save, refreshState, commit, load, download, allFiles, mergeFromZip, isLoaded, name, files, commitHistory, currentBranch, branches, tags, addFile } = useRepo(() => props.id)

const commitMessage = ref('')
const currentFile = ref('README.md')

function uploadFile(event) {
  const input = event.target;
  const files = input.files;
  if (!files || files.length === 0) return;
  Promise.all(Array.from(files).map(file => addFile(file)))

}

async function stage(filepath) {
  await git.add({ fs, dir: '/', filepath })
  await git.status({ fs, dir: '/', filepath })
  save()
}

</script>

<template lang="pug">
.flex.flex-col.gap-2.p-2.max-w-55ch.bg-light-700.dark-bg-dark-300.mx-auto.w-full
  .flex.gap-8
  .flex.flex-col.gap-4
    .flex.items-center.gap-2.w-full
      h4.font-bold.text-md Files
      label.button()
        .i-lucide-upload 
        span Upload 
        input.hidden(type="file" @change="uploadFile" multiple) 
        // webkitdirectory
      .flex-auto
      span File:
      input.p-1.flex-1.max-w-30(type="text" v-model="currentFile")

    .flex.flex-wrap.gap-2(v-if="allFiles.length > 0")
      button.button.text-xs.border-b-1(v-for="f in allFiles", :key="f"
      :style="{ borderColor: files.find(file => file == f) ? 'green' : 'red' }"
      @click="currentFile = f") {{ f }}
    p.text-sm.opacity-70(v-else) No files in repository


.flex.flex-col.gap-2.p-2.max-w-55ch.bg-light-700.dark-bg-dark-300.mx-auto.w-full(v-if="isLoaded && currentFile.endsWith('.md')")
  GitMD(:path="currentFile"  @updated="save()")

.flex.flex-col.gap-2.p-2.max-w-55ch.bg-light-700.dark-bg-dark-300.mx-auto.w-full(v-else-if="isLoaded && ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].some(ext => currentFile.toLowerCase().endsWith(ext))")
  GitImage(:path="currentFile")

.flex.flex-col.gap-2.p-2.max-w-55ch.bg-light-700.dark-bg-dark-300.mx-auto.w-full(v-else-if="isLoaded") 
  .text-sm {{ currentFile }}
  button.button.bg-green(@click="stage(currentFile)" v-if="!files.find(file => file == currentFile)") STAGE


.flex.flex-col.gap-2.p-2.max-w-55ch.bg-light-700.dark-bg-dark-300.mx-auto.w-full

  section.flex.flex-wrap.gap-2
    h2.text-xl.font-bold {{ name }}
    .flex-1
    button.button.bg-green(@click="save()") Save
    button.button(@click="download(id)")
      .i-lucide-download
      .p-0 Download


  .p-2.flex.flex-wrap.gap-2
    input.p-2.flex-1(v-model="commitMessage" placeholder="Commit message")
    button.button.bg-orange-300(@click="commit(commitMessage, user?.name, user?.name + '@example.com'); commitMessage = ''", :disabled="!isLoaded") Commit
  .p-2
    h3.text-lg.font-bold Commit History
    .flex.flex-col.gap-1(v-if="commitHistory.length > 0")
      .p-0(v-for="commit in commitHistory", :key="commit.oid")
        span.font-mono.text-sm {{ commit.oid.substring(0, 7) }}
        |  {{ commit.commit.message }}
        span.text-xs.opacity-70.ml-2 {{ new Date(commit.commit.author.timestamp * 1000).toLocaleString() }}
    p.text-sm.opacity-70(v-else) No commits yet

</template>