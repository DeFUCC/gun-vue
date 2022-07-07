import { reactive, computed } from 'vue'
import { useGun, useUser, hashObj } from '@composables'

const prefix = "gifts2022"


export function useGift() {
  const { user } = useUser()
  const gift = reactive({
    from: computed(() => user?.pub),
    to: '',
    qn: 0,
    ql: '',
    wish: ''
  })
  const gun = useGun()

  async function propose() {
    const { hashed, hash } = await hashObj(gift)

    gun.get('#' + prefix).get(hash).put(hashed)

    gun.user().get(prefix).get(hash).put(true)


  }

  return { gift, propose }

}


export function useGifts() {
  const gun = useGun()

  const gifts = reactive({})

  gun.get('#' + prefix).map().on((d, k) => {
    try {
      gifts[k] = JSON.parse(d)
    } catch (e) {
      // gifts[k] = d
    }
  })

  function del(hash) {
    console.log('del')
    gun.user().get(prefix).get(hash).put(null)
  }
  return { gifts, del }
}

