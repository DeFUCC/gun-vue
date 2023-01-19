/**
 * Basic public chat
 * @module useChat
 */

import { ref, reactive, computed, ComputedRef } from "vue";
import slugify from "slugify";
import { useUser, useGun, currentRoom } from "..";
import { refDebounced } from '@vueuse/core'

export interface Message {
  timestamp: string | number
  author?: string
  text: string
}

export function useChat() {
  const gun = useGun();
  const { user } = useUser();

  const currentChat = ref("general");
  const chats: { [key: string]: { [key: string]: string } } = reactive({
    general: {},
  });

  const chatDb = gun.user(currentRoom.pub).get("chat");

  chatDb.map().on((d: string, k: string) => {
    const [title, author] = k.split("@");
    chats[title] = chats[title] || {};
    if (d) {
      chats[title][author] = d;
    } else {
      delete chats?.[title]?.[author];
    }
  });

  function addChat(title: string) {
    chatDb
      .get(`${slugify(title) || title}@${user.pub}`)
      .put(true, undefined, { opt: { cert: currentRoom.features.chat } });
  }

  const topicDb = computed(() =>
    gun.user(currentRoom.pub).get("chat/" + currentChat.value)
  );

  const messages: ComputedRef<{ [key: string]: Message }> = computed(() => {
    const msgs: { [k: string]: Message } = reactive({});
    topicDb.value.map().on((text, k) => {
      const timestamp = k.substring(0, 13);
      const author = k.substring(14);
      const message: Message = {
        timestamp,
        author,
        text,
      };
      msgs[k] = message
    });
    return msgs;
  });

  const messageList = computed(() => Object.values(messages.value || {}))
  const debList = refDebounced(messageList)
  const sorted = computed(() => debList.value.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1))


  function send(message: string) {
    if (!message) return;
    let now = Date.now();
    topicDb.value
      .get(`${now}@${user.pub}`)
      .put(message, undefined, { opt: { cert: currentRoom.features.chat } });
  }

  return {
    send,
    addChat,
    currentChat,
    chats,
    messages,
    sorted
  };
}
