/**
 * Basic public chat
 * @module Chat
 */

import { ref, reactive, computed, watch, nextTick, onMounted } from "vue";
import { useUser, ms, useGun, currentRoom } from "..";

export function useChat() {
  const gun = useGun();
  const currentTopic = ref("general");
  const topics = reactive({
    general: 0,
    news: 10,
    announcements: 30,
  });

  const { user } = useUser();

  const chatDb = computed(() =>
    gun.user(currentRoom.pub).get("chat/" + currentTopic.value)
  );

  const messages = computed(() => {
    const msgs = reactive({});
    chatDb.value.map().on((text, k) => {
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

  function send(message) {
    if (!message) return;
    let now = Date.now();
    chatDb.value
      .get(`${now}@${user.pub}`)
      .put(message, null, { opt: { cert: currentRoom.features.chat } });
  }
  gun
    .user(currentRoom.pub)
    .get("chat")
    .map()
    .on((d) => console.log(d));

  return {
    send,
    currentTopic,
    topics,
    messages,
  };
}
