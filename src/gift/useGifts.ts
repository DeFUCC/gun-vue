/**
 * Gift economy
 * @module Gifts
 * @group Gift economy
 * */


import { reactive, computed } from 'vue'
import { useGun, useUser, currentRoom } from '../composables'

import { giftPath } from './composables'
import type { Gift } from './useGift'

export interface GiftList { [key: string]: Gift }

export function useGifts() {

  const gun = useGun()

  const gifts: GiftList = reactive({})

  gun.user(currentRoom.pub).get(giftPath).map().once((data, key) => {
    gun.get('#' + giftPath).get(key.slice(0, -88)).once((d, k) => {
      try {
        const obj = JSON.parse(d)
        gifts[k] = obj
      } catch (e) {
        // gifts[k] = d
      }
    })
  })

  return { gifts }
}


export function useMyGifts() {
  const { user } = useUser()
  const gun = useGun()
  const gifts: GiftList = reactive({})
  const from: GiftList = reactive({})
  const to: GiftList = reactive({})

  gun.user().get(giftPath).map().on((d, hash) => {
    gun.get('#' + giftPath).get(hash).once(d => {
      try {
        d = JSON.parse(d)
        gifts[hash] = d
        if (d.from == user.pub) {
          from[hash] = d
        }
        if (d.to == user.pub) {
          to[hash] = d
        }
      } catch (e) {
        console.log(e)
      }
    })
  })

  const newGifts: GiftList = reactive({})

  gun.user(currentRoom.pub).get(giftPath).map().once(async (d, path) => {
    let hash = path.slice(0, -88)
    gun.get('#' + giftPath).get(hash).once(async (d) => {
      try {
        d = JSON.parse(d)
        if (d.to == user.pub) {
          let has = await gun.user().get(giftPath).get(hash).then()
          if (!has) {
            newGifts[hash] = d
          }
        }
      } catch (e) {
        console.log(e)
      }
    })
  })


  return { gifts, from, to, newGifts }
}

export function useProjectGifts(path: string) {
  const pub = path.slice(-87)
  const gun = useGun()
  const gifts = reactive({})

  gun.user(pub).get(giftPath).map().once((d, hash) => {
    gun.get('#' + giftPath).get(hash).once(d => {
      try {
        d = JSON.parse(d)
        if (d.project == path) {
          gifts[hash] = { ...d, state: {} }

          gun.user(d.from).get(giftPath).get(hash).on(data => { gifts[hash].state.from = data })
          gun.user(d.to).get(giftPath).get(hash).on(data => { gifts[hash].state.to = data })
        }

      } catch (e) {
        console.log(e)
      }
    })
  })



  const collections = computed(() => {
    let collections = {}
    for (let hash in gifts) {
      let gift = gifts[hash]
      collections[gift.ql] = collections[gift.ql] || { list: {}, sum: 0, from: {} }
      collections[gift.ql].list[hash] = gift
    }

    for (let q in collections) {
      collections[q].sum = 0
      collections[q].from = {}

      for (let hash in collections[q].list) {

        let colG = collections[q].list[hash]
        if (!(colG.state.from && colG.state.to)) continue
        collections[q].sum += Number(colG.qn)
        collections[q].from[colG.from] = collections[q].from[colG.from] || 0
        collections[q].from[colG.from] += Number(colG.qn)
      }

    }
    return collections
  })



  return { gifts, collections }
}