import { useNow } from '@vueuse/core'
import { SEA } from 'gun'
import { reactive, computed } from 'vue'
import { useGun, useUser, hashObj } from '..'

import { giftPath } from '.'






export function useGifts() {
  const { user } = useUser()
  const gun = useGun()

  const my = reactive({})
  const proposed = reactive({})
  const gifts = reactive({})


  gun.get(giftPath).map().once(async (d, k) => {
    try {
      const obj = JSON.parse(d)

      obj.sent = await gun.user(obj.from).get(giftPath).get(k)
      obj.received = await gun.user(obj.to).get(giftPath).get(k)

      if (d.includes(user?.pub)) {
        my[k] = obj
      }

      if (obj.sent) {
        if (!obj.received)
          proposed[k] = obj
        else
          gifts[k] = obj
      }


    } catch (e) {
      // gifts[k] = d
    }
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