/**
 * Connections between accounts
 * @module useMates
 */

import { reactive, watch, ref, computed } from "vue";
import { useGun, user } from "..";
import GB from "grapheme-breaker-mjs";

/**
 * @typedef {reactive} useMates
 */

/**
 * Get a reactive list of the user's mates
 * @param {String} pub
 * @returns {useMates}
 */

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
    .once((text, matePub) => {
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

/**
 * Break the string into graphemes and return the first one if it's an emoji
 * @param {String} text
 * @returns {String} Emoji
 */

export function getFirstEmoji(text, def = "👋") {
  if (!text || typeof text != "string") return;
  let em = GB.break(text)[0];
  if (isEmoji(em)) {
    return em;
  } else {
    return def;
  }
}

/**
 * Check if the text has emojis
 * @param {String} text
 * @returns {Boolean}
 */

export function isEmoji(text) {
  return /\p{Extended_Pictographic}/u.test(text);
}

/**
 * @typedef {Object} useMate
 * @property {ref} emoji - change it in an input
 * @property {ref} isMate - reactive state of connection
 * @property {Function} toggleMate - toggle the link with current `emoji` ref
 */

/**
 * Make mates with some account by current user
 * @param {String} pub
 * @returns {useMate}
 */

export function useMate(pub) {
  const emoji = ref("👋");
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
