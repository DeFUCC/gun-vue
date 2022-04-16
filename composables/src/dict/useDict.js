/**
 * @module Dictionary
 */

import Fuse from "fuse.js";
import { ref, reactive, computed, watch } from 'vue'
import { useStorage } from '@vueuse/core';

import { useGun, currentRoom, hashText, useUser, useColor, hashObj } from '..';


export const dictRecord = reactive({
  word: null,
  def: null
})

export const dictLang = useStorage('dict-lang', 'en')

watch(dictRecord, () => {
  if (dictRecord.word && dictRecord.def) {
    addRecord(dictRecord)
  }
})

/**
 * Use filtrable words list
 * @returns {useWords}
 */

export function useWords() {
  const gun = useGun()
  const { user } = useUser()

  const input = ref('')
  const word = computed(() => letterFilter(input.value))

  async function addWord() {
    const hash = await hashText(word.value)
    gun.get('dict').get('#word').get(hash).put(word.value)
    dictRecord.word = hash
    // gun
    //   .user(currentRoom.pub)
    //   .get('dict')
    //   .get(`${hash}@${user.pub}`)
    //   .put(true, null, { opt: { cert: currentRoom.features?.dict } });
    input.value = ''
  }

  const linked = reactive({})

  gun.user(currentRoom.pub).get('dict').map().on(async (d, k) => {
    if (!d) return
    let hash = k.slice(0, 44);
    let defHash = k.slice(45, 89);
    let def = await gun.get('dict').get('#def').get(defHash).then()
    if (!def) return
    try {
      def = JSON.parse(def)
    } catch (e) {
      console.log(e, def)
      return
    }
    if (def?.lang != dictLang.value) return
    linked[hash] = linked[hash] || await gun.get('dict').get('#word').get(hash).then()
  })

  const words = reactive({})

  gun.get('dict').get('#word').map().once((d, k) => {
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

  return { input, found, words, linked, word, addWord }
}




export function useWord(hash) {
  const gun = useGun()

  const word = ref()

  gun.get('dict').get('#word').get(hash).once((d, k) => {
    word.value = letterFilter(d)
  })
  return { word }
}


/**
 * Dictionary definitions browser
 * @returns {useDefs}
 */

export function useDefs() {
  const gun = useGun()

  const def = reactive({
    text: '',
    lang: dictLang,
    part: 'noun'
  })

  async function addDef() {
    const { hash, hashed } = await hashObj(def)
    gun.get('dict').get('#def').get(hash).put(hashed)
    dictRecord.def = hash
    def.text = ''
    def.part = null
  }

  const linked = reactive({})

  gun.user(currentRoom.pub).get('dict').map().on(async (d, k) => {
    if (!d) return

    let hash = k.slice(45, 89);
    let record = await gun.get('dict').get('#def').get(hash).then()
    if (!record) return
    try {
      record = JSON.parse(record)
      if (record?.lang != dictLang.value) return
      linked[hash] = linked[hash] || record
    } catch (e) {
      console.log(e, record)
    }

  })


  const defs = reactive({})

  gun.get('dict').get('#def').map().once((d, k) => {
    defs[k] = JSON.parse(d)
  })

  const fuse = computed(() => {
    let defList = []
    for (let hash in defs) {
      defList.push({ hash, ...defs[hash] })
    }
    return new Fuse(defList, {
      keys: ['text'],
      includeScore: true
    })
  })

  const found = computed(() => fuse.value.search(def.text))

  return { def, addDef, defs, found, linked }
}



async function addRecord({ word, def } = {}) {

  const gun = useGun()
  const { user } = useUser();
  let already = await gun
    .user(currentRoom.pub)
    .get('dict')
    .get(`${word}:${def}@${user.pub}`).then()

  gun
    .user(currentRoom.pub)
    .get('dict')
    .get(`${word}:${def}@${user.pub}`)
    .put(!already, null, { opt: { cert: currentRoom.features?.dict } });
  dictRecord.word = null
  dictRecord.def = null
}

export function useDictRecordsFor(hash) {
  const gun = useGun()
  const links = reactive({})
  gun
    .user(currentRoom.pub)
    .get('dict')
    .map()
    .on((data, key) => {
      let index = key.indexOf(hash);
      if (index == -1) return;
      const { from, to, author } = parseHashLink(key)
      let linked = from == hash ? to : from

      links[linked] = links[linked] || {}
      if (data) {
        links[linked][author] = data
      } else {
        delete links?.[linked]?.[author]
        if (Object.keys(links?.[linked]).length == 0) {
          delete links?.[linked]
        }
      }
    })
  return links
}

export function useDictRecordsBy(pub) {
  const gun = useGun()
  const records = reactive({})
  gun
    .user(currentRoom.pub)
    .get('dict')
    .map()
    .on((data, key) => {
      const { from, to, author } = parseHashLink(key)
      if (author != pub) return

      records[from] = records[from] || {}
      if (data) {
        records[from][to] = data
      } else {
        delete records?.[from]?.[to]
        if (Object.keys(records[from]).length == 0) {
          delete records?.[from]
        }
      }
    })
  return records
}

export function useDictAuthors() {
  const gun = useGun()
  const authors = reactive({})
  gun
    .user(currentRoom.pub)
    .get('dict')
    .map()
    .once(async (data, key) => {
      const { from, to, author } = parseHashLink(key)
      authors[author] = authors[author] || {}
      authors[author][from] = authors[author][from] || {}
      authors[author][from][to] = data
    })
  return authors
}

export function useDictLangs() {
  const gun = useGun()
  const langs = reactive({})
  gun
    .user(currentRoom.pub)
    .get('dict')
    .map()
    .once(async (data, key) => {


      let hash = key.slice(45, 89);
      let def = await gun.get('dict').get('#def').get(hash).then()
      if (!def) return
      try {
        def = JSON.parse(def)
      } catch (e) {
        console.log(def, e)
      }
      if (!def?.lang) return
      langs[def?.lang] = langs[def?.lang] || 0
      langs[def?.lang]++
    })
  return langs
}


export function parseHashLink(link) {
  return {
    from: link.slice(0, 44),
    to: link.slice(45, 89),
    author: link.slice(-87),
  }
}


export function renderStress({ text, stress } = {}) {
  const stressMark = '&#x301;'
  if (!text) return;
  let str = text.slice(0, stress + 1) + stressMark + text.slice(stress + 1);
  return str[0].toUpperCase() + str.slice(1);
}

export function letterFilter(str) {
  if (!str) return ''
  let clean = str.toLowerCase().matchAll(/\p{L}/gu, '')
  return Array.from(clean).map(el => el[0]).join('')
}