/**
 * A 2D-space
 * @module useSpace
 */

import { useGun } from "./useGun";
import { useSvgMouse } from "./useMouse";
import { user } from "./useUser";
import { hashText } from "./useHash";
import { logEvent } from "./useLog";
import { computed, reactive, watchEffect } from "vue";
import { getFirstEmoji } from ".";

/**
 * @typedef {Object} useSpace
 * @property {reactive} space
 * @property {ref} area
 * @property {Function} join
 * @property {Function} place
 */

/**
 *  A space to navigate with mouse clicks
 * @param {String} spaceName
 * @returns {useSpace}
 * @example
 * const {space, area, join, place} = useSpace()
 */

export function useSpace(spaceName = "public", TIMEOUT = 10000) {
  const gun = useGun();
  const space = reactive({
    title: spaceName,
    joined: false,
    db: gun.get(spaceName),
    my: {
      id: null,
      mouse: computed(() => ({ x: mouse.normX, y: mouse.normY })),
      pos: null,
    },
    guests: {},
    mates: {},
    links: {},
  });

  gun
    .user()
    .get(spaceName)
    .get("pos")
    .on((pos) => {
      space.my.pos = pos;
    });

  const { area, mouse } = useSvgMouse();

  async function join() {
    if (!gun.user().is) return;
    place();
    if (space.joined) return;
    const hash = await hashText(user.pub);
    // let already = await gun.get(spaceName).get("#guests").get(hash).then();
    // if (already) return;
    gun.get(spaceName).get("#guests").get(hash).put(user.pub);
    logEvent("guest", { event: "guest", space: spaceName, pub: user.pub });
    space.joined = true;
  }

  const allGuests = reactive({});
  const guests = computed(() => {
    const obj = {};
    for (let g in allGuests) {
      if (Date.now() - allGuests[g]?.pulse < TIMEOUT) {
        obj[g] = allGuests[g];
      }
    }
    return obj;
  });

  gun
    .get(spaceName)
    .get("#guests")
    .map()
    .once(async (pub, hash) => {
      if (pub == user.pub) {
        space.joined = true;
      }

      allGuests[pub] = {
        pub: pub,
        blink: false,
        pulse: 0,
        hasPos: false,
        pos: {
          x: 0,
          y: 0,
        },
      };

      gun
        .user(pub)
        .get("pulse")
        .on((d) => {
          allGuests[pub].pulse = d;
          allGuests[pub].blink = !allGuests[pub].blink;
        })
        .back()
        .get("mates")
        .map()
        .on((d, k) => {
          space.mates[pub] = space.mates[pub] || {};
          space.mates[pub][k] = d;
        })
        .back()
        .back()
        .get(spaceName)
        .get("pos")
        .map()
        .on((d, k) => {
          allGuests[pub].hasPos = true;
          allGuests[pub].pos[k] = d;
        });
    });

  watchEffect(() => {
    let arr = [];
    for (let pub1 in space.mates) {
      for (let pub2 in space.mates[pub1]) {
        if (space.mates[pub1][pub2]) {
          let g1 = guests.value?.[pub1];
          let g2 = guests.value?.[pub2];
          let age = Date.now() - g1?.pulse;
          if (g1 && g2 && g1?.hasPos && g2?.hasPos && age < TIMEOUT) {
            space.links[pub1 + pub2] = {
              presence: age,
              user: pub1,
              mate: pub2,
              emoji: getFirstEmoji(space.mates[pub1][pub2]),

              from: g1.pos,
              to: g2.pos,
            };
          }
        } else {
          delete space.links[pub1 + pub2];
        }
      }
    }
  });

  function place() {
    let pos = { x: mouse.normX, y: mouse.normY };
    gun.user().get(spaceName).get("pos").put(pos);
  }

  return { space, guests, area, join, place };
}
