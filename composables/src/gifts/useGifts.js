import { useNow } from '@vueuse/core'
import { SEA } from 'gun'
import { reactive, computed } from 'vue'
import { useGun, useUser, hashObj, currentRoom } from '..'

import { giftPath } from '.'

export function useGifts() {
  const { user } = useUser()
  const gun = useGun()

  const my = reactive({})
  const proposed = reactive({})
  const gifts = reactive({})

  gun.user(currentRoom.pub).get('gifts').map().once((data, key) => {
    gun.get(giftPath).get(key.slice(0, -88)).once((d, k) => {
      try {
        const obj = JSON.parse(d)
        gifts[k] = obj
      } catch (e) {
        // gifts[k] = d
      }
    })
  })

  return { my, proposed, gifts }
}


export function useMyGifts() {
  const { user } = useUser()
  const gun = useGun()
  const gifts = reactive({})
  const from = reactive({})
  const to = reactive({})
  gun.user().get(giftPath).map().on((d, hash) => {
    gun.get(giftPath).get(hash).once(d => {
      try {
        d = JSON.parse(d)
      } catch { }
      if (d.from == user.pub) {
        from[hash] = { ...d, sent: true }
      }
      if (d.to == user.pub) {
        to[hash] = { ...d, sent: true, received: true }
      }
      gifts[hash] = d
    })

  })
  return { gifts, to, from }
}