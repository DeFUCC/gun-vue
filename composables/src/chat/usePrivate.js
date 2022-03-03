/**
 * Basic private chat
 * @module PrivateChat
 */

import { reactive, computed, ref } from "vue"
import { useAccount, useUser, useGun, SEA } from '..'


export function usePrivateChat(pub) {

  const gun = useGun();
  const { user } = useUser();
  const messages = reactive({});
  const epub = ref()

  gun.user(pub).get('epub').once(d => epub.value = d)


  gun.user(pub).get('chat').get(user.pub).map().on(async (d, k) => {
    if (d && d.startsWith('SEA')) {
      const secret = await SEA.secret(epub.value, user.pair())
      const work = await SEA.work(secret, k)
      const dec = await SEA.decrypt(d, work)
      if (!dec) return
      messages[k] = {
        timestamp: k,
        author: pub,
        text: dec
      }
    }
  })

  gun.user().get('chat').get(pub).map().on(async (d, k) => {
    if (d && d.startsWith('SEA')) {
      const secret = await SEA.secret(epub.value, user.pair())
      const work = await SEA.work(secret, k)
      const dec = await SEA.decrypt(d, work)
      if (!dec) return
      messages[k] = {
        timestamp: k,
        author: user.pub,
        text: dec
      }
    }
  })

  async function send(message) {
    if (!message) return;
    let now = Date.now();
    const secret = await SEA.secret(epub.value, user.pair())
    const work = await SEA.work(secret, now)
    const enc = await SEA.encrypt(message, work)
    console.log(enc)

    gun.user().get('chat').get(pub).get(now).put(enc)
  }

  return {
    send,
    messages,
  };
}

export function usePrivateChatCount(pub) {
  const gun = useGun();
  const { user } = useUser();
  const messages = reactive({});

  const available = ref(false)

  gun.user(pub).get('epub').on(d => available.value = d)

  gun.user(pub).get('chat').get(user.pub).map().on((d, k) => {
    if (d && !d.startsWith('SEA')) return
    messages[k] = d
  })

  const count = computed(() => {
    return Object.keys(messages).length
  })
  return { count, available }
}