import { useGun, currentRoom, hashText, useColor } from '../';
import { ref, computed, reactive } from 'vue'

export const stressMark = '&#x301;'

export function renderWord({ text, stress } = {}) {
  if (!text) return;
  let str = text.slice(0, stress + 1) + stressMark + text.slice(stress + 1);
  return str[0].toUpperCase() + str.slice(1);
}

export function letterFilter(str) {
  let clean = str.toLowerCase().matchAll(/\p{L}/gu, '')
  return Array.from(clean).map(el => el[0]).join('')
}

export function useWords() {
  const gun = useGun()
  const wordDb = gun.get('dict').get('#word')

  const search = ref('')
  const word = computed(() => letterFilter(search.value))



  async function addWord() {
    const hash = await hashText(word.value)
    wordDb.get(hash).put(word.value)
    search.value = ''
  }

  const words = reactive({})

  wordDb.map().once((d, k) => {
    if (d.includes(' ')) return
    words[k] = d
  })

  return { search, words, word, addWord }
}

export function useWord(hash) {
  const gun = useGun()

  const word = ref()

  gun.get('dict').get('#word').get(hash).once((d, k) => {
    word.value = letterFilter(d)
  })
  return { word }
}