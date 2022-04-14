import { ref, reactive, computed, watch } from 'vue'
import { useGun, currentRoom, useUser } from '../'


export const dictLink = reactive({
  word: null,
  def: null
})

watch(dictLink, () => {
  if (dictLink.word && dictLink.def) {
    linkDict(dictLink)
  }
})

async function linkDict({ word, def } = {}) {

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
  dictLink.word = null
  dictLink.def = null
}

export function useLinks(hash) {
  const gun = useGun()
  const links = reactive({})
  gun
    .user(currentRoom.pub)
    .get('dict')
    .map()
    .on((data, key) => {
      let index = key.indexOf(hash);
      if (index == -1) return;
      let from = key.slice(0, 44);
      let to = key.slice(45, 89);
      let author = key.slice(-87);
      let linked = from == hash ? to : from

      links[linked] = links[linked] || {}
      if (data) {
        links[linked][author] = data
      } else {
        delete links?.[linked]?.[author]
      }


    })
  return links
}