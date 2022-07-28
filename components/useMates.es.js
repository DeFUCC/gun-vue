import { reactive, GB, ref } from "./vendor.es.js";
import { user, useGun } from "./useDraw.es.js";
function useMates(pub) {
  if (!pub) {
    pub = user.pub;
  }
  const mates = reactive({});
  const gun = useGun();
  gun.user(pub).get("mates").map().once((text, matePub) => {
    if (text) {
      mates[matePub] = {
        emoji: getFirstEmoji(text),
        text
      };
      gun.user(matePub).get("mates").get(pub).on((d) => {
        if (d) {
          mates[matePub].back = getFirstEmoji(d);
        } else {
          delete mates[matePub].back;
        }
      });
    } else {
      delete mates[matePub];
    }
  });
  return mates;
}
function getFirstEmoji(text, def = "\u{1F44B}") {
  if (!text || typeof text != "string")
    return;
  let em = GB.break(text)[0];
  if (isEmoji(em)) {
    return em;
  } else {
    return def;
  }
}
function isEmoji(text) {
  return /\p{Extended_Pictographic}/u.test(text);
}
function useMate(pub) {
  const emoji = ref("\u{1F44B}");
  const isMate = ref(false);
  const dbMate = user.db.get("mates").get(pub);
  dbMate.on((d) => {
    isMate.value = getFirstEmoji(d);
  });
  function toggleMate() {
    dbMate.put(isMate.value ? false : getFirstEmoji(emoji.value));
  }
  return { emoji, isMate, toggleMate };
}
export { getFirstEmoji, isEmoji, useMate, useMates };
