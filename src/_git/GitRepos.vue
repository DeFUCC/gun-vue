<script setup>
import { ref, computed, watch, reactive, onUnmounted } from 'vue'

import { useUser } from '../../composables/useUser';
import { db, dbInitialized } from './useDB.js';
import { ulid } from 'ulid';
import { liveQuery } from 'dexie';
import UiLayer from '../UiLayer.vue';
import { useTimeAgo } from '@vueuse/core';

const props = defineProps({
  id: { type: String, default: '' }
})

const emit = defineEmits(['repo'])

const commitMessage = ref('')

const newRepoName = ref('')

const repos = reactive([]);

const { user } = useUser();

let sub

watch(dbInitialized, async (inited) => {
  if (inited) {
    sub = liveQuery(() => db.repos.toArray()).subscribe({
      next(repoArray) {
        repos.splice(0, repos.length, ...repoArray);
        if (!props.id) emit('repo', repos?.[0]?.id)
      }
    })
  } else {
    repos.splice(0, repos.length);
  }
}, { immediate: true });

onUnmounted(() => {
  sub?.unsubscribe()
})

async function createNewRepository(name = `New Repo ${new Date().toLocaleTimeString()}`) {
  const date = new Date()
  const id = await db.repos.add({
    id: ulid(),
    name: name,
    data: null,
    createdAt: date,
    updatedAt: date,
  });
  emit('repo', id)
};

async function clearRepository(id) {
  if (window.confirm('Are you sure you want to delete this repository? This action cannot be undone.')) {
    await db.repos.delete(id);
    if (props.id === id) { emit('repo', repos?.[0]?.id) }
  }
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const adding = ref(false)


</script>

<template lang="pug">
.flex.flex-col.gap-2.p-4

  .flex.gap-2.w-full.overflow-x-scroll(style="scrollbar-width: thin; scrollbar-color: transparent transparent;" )
    .p-4.button.cursor-pointer.flex.flex-col.relative(
      style="flex: 1 0 180px"
      v-for="repo in repos" :key="repo.id" 
      @click="emit('repo', repo.id)" 
      :class="{ active: repo.id == id }"
      ) 
        .text-lg {{ repo.name }} 

        .text-xs Created {{ useTimeAgo(repo?.createdAt) }} 
        .text-xs Updated {{ useTimeAgo(repo?.updatedAt) }} 

        .text-xs.font-mono() {{ formatBytes(repo?.data?.size || 0) }} 

        button.button.hover-op-100.transition.op-50.text-red-400.absolute.top-2.right-2(@click="clearRepository(repo.id)")
          .i-lucide-trash-2
    button.button.flex-1.sticky.right-0(@click="adding = !adding")
      .i-lucide-plus 
      .p-0 Add

  UiLayer(v-model="adding")
    .p-4.flex.gap-4.flex.flex-col
      .text-2xl Create a new Repo
      input.p-2(v-model="newRepoName" placeholder="Repo name")
      button.button.bg-green-500(@click="createNewRepository(newRepoName); adding = false" :disabled="!newRepoName") New Repo
 
</template>

<style lang="postcss" scoped>
.active {
  @apply sticky left-0 right-0 z-100
}
</style>
