import { reactive, watch, computed } from "vue";
import { useGun, user } from "./";
import GB from "grapheme-breaker-mjs";

export function useMates(pub) {
  if (!pub) {
    pub = user.pub;
  }
  const mates = reactive({});
  const gun = useGun();
  gun
    .user(pub)
    .get("mates")
    .map()
    .on((text, matePub) => {
      if (text) {
        mates[matePub] = {
          emoji: getFirstEmoji(text),
          text,
        };
        gun
          .user(matePub)
          .get("mates")
          .get(pub)
          .on((d) => {
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

export function getFirstEmoji(text) {
  if (!text || typeof text != "string") return;
  let em = GB.break(text)[0];
  if (isEmoji(em)) {
    return em;
  } else {
    return "👋";
  }
}

function isEmoji(text) {
  return /\p{Extended_Pictographic}/u.test(text);
}
