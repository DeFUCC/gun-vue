/**
 * Basic public chat
 * @module useChat
 */

import { ref, reactive, computed } from "vue";
import slugify from "slugify";
import { useUser, useGun, currentRoom } from "..";
import { refDebounced } from '@vueuse/core'

export function useChat() {
  const gun = useGun();
  const { user } = useUser();

  const currentChat = ref("general");
  const chats = reactive({
    general: {},
  });

  const chatDb = gun.user(currentRoom.pub).get("chat");

  chatDb.map().on((d, k) => {
    const [title, author] = k.split("@");
    chats[title] = chats[title] || {};
    if (d) {
      chats[title][author] = d;
    } else {
      delete chats?.[title]?.[author];
    }
  });

  function addChat(title) {
    chatDb
      .get(`${slugify(title) || title}@${user.pub}`)
      .put(true, null, { opt: { cert: currentRoom.features.chat } });
  }

  const topicDb = computed(() =>
    gun.user(currentRoom.pub).get("chat/" + currentChat.value)
  );

  const messages = computed(() => {
    const msgs = reactive({});
    topicDb.value.map().on((text, k) => {
      const timestamp = k.substring(0, 13);
      const author = k.substring(14);
      msgs[k] = {
        timestamp,
        author,
        text,
      };
    });
    return msgs;
  });

  const messageList = computed(() => Object.values(messages.value || {}))
  const debList = refDebounced(messageList)
  const sorted = computed(() => debList.value.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1))


  function send(message) {
    if (!message) return;
    let now = Date.now();
    topicDb.value
      .get(`${now}@${user.pub}`)
      .put(message, null, { opt: { cert: currentRoom.features.chat } });
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
