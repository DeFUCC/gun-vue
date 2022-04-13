import { useGun, currentRoom, hashObj, useColor } from '../';
import { ref, computed, reactive } from 'vue'

export const stressMark = '&#x301;'

export function renderWord({ text, stress } = {}) {
  if (!text) return;
  let str = text.slice(0, stress + 1) + stressMark + text.slice(stress + 1);
  return str[0].toUpperCase() + str.slice(1);
}

export function useWords() {
  const gun = useGun()
  const wordDb = gun.get('dict').get('#word')

  const search = ref('')
  const word = reactive({
    text: computed(() => {
      let clean = search.value.toLowerCase().matchAll(/\p{L}/gu, '')
      return Array.from(clean).map(el => el[0]).join('')
    }),
    stress: null
  })

  async function addWord() {
    const { hash, hashed } = await hashObj(word)
    wordDb.get(hash).put(hashed)
    search.value = ''
    word.stress = null
  }

  const words = reactive({})

  wordDb.map().once((d, k) => {
    let w = JSON.parse(d)
    if (d.includes(' ')) return
    words[k] = w
  })

  return { search, words, word, addWord }
}

export function useWord(hash) {
  const gun = useGun()

  const word = ref()

  gun.get('dict').get('#word').get(hash).once((d, k) => {
    word.value = JSON.parse(d)
  })
  return { word }
}