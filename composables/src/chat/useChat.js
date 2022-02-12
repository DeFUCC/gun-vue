/**
 * Basic public chat
 * @module Chat
 */

import { ref, reactive, watch, nextTick, onMounted } from "vue";
import { useUser, ms, useGun, currentRoom } from "..";

export function useChat() {
  const gun = useGun();
  const chatDb = gun.user(currentRoom.pub).get("chat");
  const { user } = useUser();
  const message = ref("");

  function send() {
    if (!message.value) return;
    let now = Date.now();
    chatDb
      .get(`${now}@${user.pub}`)
      .put(message.value, null, { opt: { cert: currentRoom.features.chat } });
    message.value = "";
  }

  const messages = reactive({});
  const chatWindow = ref();

  chatDb.map().on((text, k) => {
    const timestamp = k.substring(0, 13);
    const author = k.substring(14);
    messages[k] = {
      timestamp,
      author,
      text,
    };
  });

  onMounted(() => {
    watch(messages, () => {
      nextTick(() => {
        chatWindow.value.scrollTo(0, chatWindow.value.scrollHeight);
      });
    });
  });

  return {
    send,
    message,
    messages,
    chatWindow,
  };
}
