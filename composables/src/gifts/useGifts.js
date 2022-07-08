import { useNow } from '@vueuse/core'
import { SEA } from 'gun'
import { reactive, computed } from 'vue'
import { useGun, useUser, hashObj } from '..'

export const giftPath = "#gifts2023"


export function useGift() {
  const { user } = useUser()
  const gift = reactive({
    from: computed(() => user?.pub),
    to: '',
    qn: 0,
    ql: '',
    wish: '',
    date: useNow()
  })

  const gun = useGun()

  async function propose() {

    const { hash, hashed } = await hashObj(gift)

    gun.get(giftPath).get(hash).put(hashed)

    gun.user().get(giftPath).get(hash).put(true)

  }

  return { gift, propose }

}

export async function acceptGift(hash) {
  const { user } = useUser()
  user.db.get(giftPath).get(hash).put(true)
}



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

