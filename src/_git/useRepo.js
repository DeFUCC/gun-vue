// Polyfill Buffer for browser (required for isomorphic-git in Vite/webpack)
import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !window.Buffer) { window.Buffer = Buffer }

import git from 'isomorphic-git'
import http from "isomorphic-git/http/web";
import { onMounted, ref, reactive, watch, computed } from 'vue';
import { asyncComputed } from '@vueuse/core';
import { ulid } from 'ulid';

import { useUser } from '../../composables/useUser.js';
import { db, dbInitialized } from './useDB.js'
import { ZipGitFS, fs } from './ZipGitFS.js'

export const isLoaded = ref(false)

export function useRepo(idRef) {

  const { user } = useUser();

  const currentId = ref('')
  const name = ref('')
  const files = ref([])
  const allFiles = ref([])
  const commitHistory = ref([])

  const currentBranch = ref('main')
  const branches = ref([])
  const tags = ref([])

  watch(idRef, load, { immediate: true })

  async function load(id) {
    if (!db) return;
    isLoaded.value = false;
    const repoData = await db.repos.get(id);
    currentId.value = id
    name.value = repoData.name;
    const password = await SEA.work(user.pub, user?.pair(), null, { name: "SHA-256" })
    new ZipGitFS(repoData.data, { password })
    await fs.ready
    await git.init({ fs, dir: '/', defaultBranch: 'main' })
    let ulidValue = await git.getConfig({ fs, dir: '/', path: 'intelligraphs.ulid', });
    if (!ulidValue) {
      ulidValue = repoData.id || ulid();
      await git.setConfig({ fs, dir: '/', path: 'intelligraphs.ulid', value: ulidValue });
      await git.setConfig({ fs, dir: '/', path: 'intelligraphs.pub', value: user.pub });
      await save()
    }
    await refreshState()
    isLoaded.value = true;
  }

  async function save() {
    const password = await SEA.work(user.pub, user?.pair(), null, { name: "SHA-256" })
    const data = await fs.exportZip({ password, level: 9 });
    await db.repos.update(currentId.value, { data, updatedAt: new Date(), });
  }

  async function hasCommits() {
    try {
      const branches = await git.listBranches({ fs, dir: '/' })
      return branches.length > 0
    } catch (e) {
      return false
    }
  }

  async function refreshState() {
    try {
      branches.value = await git.listBranches({ fs, dir: '/' })
      files.value = await git.listFiles({ fs, dir: '/' })
      tags.value = await git.listTags({ fs, dir: '/' })
      allFiles.value = Array.from(fs.entries.entries())
        .filter(([_, entry]) => !entry.directory && !entry.symlink && !entry.filename.startsWith('.git/'))
        .map(([filename]) => filename);

      if (await hasCommits()) {
        commitHistory.value = await git.log({ fs, dir: '/', depth: 50 })
        currentBranch.value = await git.currentBranch({ fs, dir: '/', fullname: false })
      } else {
        commitHistory.value = []
        currentBranch.value = 'main'
      }
    } catch (e) {
      console.error('Error refreshing repo state:', e)
      branches.value = []
      files.value = []
      tags.value = []
      commitHistory.value = []
      currentBranch.value = 'main'
    }
  }

  async function commit(message = "No message", name = 'anonymous', email = 'anonymous@example.com') {
    try {
      await git.commit({ fs, dir: '/', message, author: { name, email } })
      await save()
      await refreshState()
    } catch (e) {
      console.error('Failed to commit:', e)
    }
  }

  async function download(filename) {
    const password = window.prompt('Zip file password')
    const blob = await fs.exportZip({ password, level: 9 })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    Object.assign(a, { href: url, download: `${filename}.vault.zip` })
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function addFile(file) {
    const path = file.webkitRelativePath || file.name;
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(path, new Uint8Array(arrayBuffer));
    await save();
    await refreshState();
  }

  return { fs, save, refreshState, commit, load, download, isLoaded, name, files, allFiles, commitHistory, currentBranch, branches, tags, addFile }
}
