/**
 * Basic private chat
 * @module PrivateChat
 */

import { ref, reactive, computed } from "vue";
import { useUser, useGun, currentRoom } from "..";


export function usePrivateChat(pub) {
  const gun = useGun();
  const { user } = useUser();

  const messages = reactive({});


  const chatDb = gun.user(currentRoom.pub).get("chat");

  chatDb.map().on((d, k) => {
    const [title, author] = k.split("@");
    if (d) {
      chat[author] = d;
    } else {
      delete chat?.[author];
    }
  });
  
  topicDb.value.map().on((text, k) => {
    const timestamp = k.substring(0, 13);
    const author = k.substring(14);
    messages[k] = {
      timestamp,
      author,
      text,
    };
  });

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
  };
}