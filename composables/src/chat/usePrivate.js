/**
 * Basic private chat
 * @module PrivateChat
 */

import { reactive, computed } from "vue"
import { useAccount, useUser, useGun } from '..'


export function usePrivateChat(pub) {

  const gun = useGun();
  const { user } = useUser();
  const messages = reactive({});

  const myChat = gun.user().get('chat').get(pub)
  const yourChat = gun.user(pub).get('chat').get(user.pub)

  yourChat.map().on((d, k) => {
    messages[k] = {
      timestamp: k,
      author: pub,
      text: d
    }
  })

  myChat.map().on((d, k) => {
    messages[k] = {
      timestamp: k,
      author: user.pub,
      text: d
    }
  })

  function send(message) {
    if (!message) return;
    let now = Date.now();
    myChat.get(now).put(message)
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

  const yourChat = gun.user(pub).get('chat').get(user.pub)

  yourChat.map().on((d, k) => {
    messages[k] = d
  })

  const count = computed(() => {
    return Object.keys(messages).length
  })
  return count
}