import { useGun, currentRoom, hashText, useUser, useColor } from '../';
import { ref, computed, reactive } from 'vue'
import Fuse from "fuse.js";

export const stressMark = '&#x301;'

export function renderWord({ text, stress } = {}) {
  if (!text) return;
  let str = text.slice(0, stress + 1) + stressMark + text.slice(stress + 1);
  return str[0].toUpperCase() + str.slice(1);
}

export function letterFilter(str) {
  if (!str) return ''
  let clean = str.toLowerCase().matchAll(/\p{L}/gu, '')
  return Array.from(clean).map(el => el[0]).join('')
}

export function useWords() {
  const gun = useGun()
  const { user } = useUser()
  const wordDb = gun.get('dict').get('#word')

  const input = ref('')
  const word = computed(() => letterFilter(input.value))



  async function addWord() {
    const hash = await hashText(word.value)
    wordDb.get(hash).put(word.value)
    // gun
    //   .user(currentRoom.pub)
    //   .get('dict')
    //   .get(`${hash}@${user.pub}`)
    //   .put(true, null, { opt: { cert: currentRoom.features?.dict } });
    input.value = ''
  }

  const words = reactive({})

  wordDb.map().once((d, k) => {
    if (d.includes(' ')) return
    words[k] = d
  })

  const fuse = computed(() => {
    let arr = Object.entries(words).map(entry => {
      return { text: entry[1], hash: entry[0] }
    })
    return new Fuse(arr, {
      keys: ['text'],
      includeScore: true
    })
  })

  const found = computed(() => fuse.value.search(input.value))

  return { input, found, words, word, addWord }
}

export function useWord(hash) {
  const gun = useGun()

  const word = ref()

  gun.get('dict').get('#word').get(hash).once((d, k) => {
    word.value = letterFilter(d)
  })
  return { word }
}