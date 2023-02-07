/**
 * Gift economy
 * @module Gift
 * @group Gift economy
 * */

import { giftPath } from './composables'
import { useUser } from '../user/composables'
import { reactive, computed, ref, watch } from 'vue'
import { hashObj } from '../crypto/composables'
import { useNow } from '@vueuse/core'
import { useGun } from '../gun/composables'
import { computedAsync } from '@vueuse/core'
import { currentRoom } from '../room/composables'

export interface Gift {
  from?: string
  to?: string
  qn?: number
  ql?: string
  wish?: string
  project?: string
  room?: string
  date?: number
}

export function useGift(hash: string) {
  const gun = useGun()
  const gift: Gift = reactive({})
  const state = reactive({
    from: false,
    to: false,
    complete: computed(() => state.from && state.to),
    status: computed(() => state.from ? state.to ? 'complete' : 'proposed' : 'canceled')
  })
  gun.get('#' + giftPath).get(hash).once((d, k) => {
    try {

      Object.assign(gift, JSON.parse(d))
      console.log
      gun.user(gift.from).get(giftPath).get(k).on(d => { state.from = d })

      gun.user(gift.to).get(giftPath).get(k).on(d => { state.to = d })

    } catch (e) {
      // gifts[k] = d
    }

  })
  return { gift, state }
}


export async function giftState(hash: string, state = true) {
  const { user } = useUser()
  user.db.get(giftPath).get(hash).put(state)
}


export function useNewGift(giftConf: Gift) {
  const { user } = useUser()

  const { now, pause } = useNow({ interval: 1000, controls: true })

  const gift: Gift = reactive({
    from: computed(() => user?.pub),
    to: '',
    qn: null,
    ql: null,
    wish: '',
    project: '',
    date: computed(() => now.value.getTime()),
    room: computed(() => currentRoom.pub)
  })

  const cleanGift = computed(() => {
    let g = removeEmptyKeys(gift)
    g.qn = Number(g.qn)
    return g
  })

  const required = ['from', 'to', 'qn', 'ql']

  const valid = computed(() => {
    const isFilled = required.reduce((acc, val) => {
      return acc && gift[val]
    }, true)
    return isFilled
  })

  watch(gift, g => {
    if (g.project) {
      gift.to = g.project.slice(-87)
    }
  })

  const hash = computedAsync(async () => {
    const { hash } = await hashObj(cleanGift.value)
    return hash
  })

  const proposed = ref(false)

  Object.assign(gift, giftConf)

  const gun = useGun()

  async function propose() {

    const { hash, hashed } = await hashObj(cleanGift.value)
    console.log(hash, hashed)

    gun.get('#' + giftPath).get(hash).put(hashed)

    gun.user().get(giftPath).get(hash).put('proposed', () => {
      pause()
      proposed.value = true
    })

    if (currentRoom.features?.gifts) {

      gun
        .user(currentRoom.pub)
        .get(giftPath)
        .get(`${hash}@${user.pub}`)
        .put(
          true,
          () => {
            console.log(`gift ${hash} published`)
          },
          {
            opt: { cert: currentRoom.features.gifts }
          }
        )
    }

  }

  return { gift, cleanGift, valid, propose, proposed, hash }

}

export function removeEmptyKeys(obj: object) {
  return Object.entries(obj)
    .filter(([_, v]) => { _; return !!v })
    .reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? removeEmptyKeys(v) : v }),
      {}
    );
}