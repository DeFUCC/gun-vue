import { useGun, hashObj, } from '../';
import { reactive } from 'vue'
import { useStorage } from '@vueuse/core';


export function useDefs() {
  const gun = useGun()

  const def = reactive({
    text: '',
    lang: useStorage('dict-lang', 'en'),
    part: 'noun'
  })

  async function addDef() {
    const { hash, hashed } = await hashObj(def)
    gun.get('dict').get('#def').get(hash).put(hashed)
    def.text = ''
    def.part = null
  }

  const defs = reactive({})

  gun.get('dict').get('#def').map().once((d, k) => {
    defs[k] = JSON.parse(d)
  })
  return { def, addDef, defs }
}


