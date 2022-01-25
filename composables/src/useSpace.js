/**
 * A 2D-space
 * @module useSpace
 */

import { useGun } from "./useGun";
import { useSvgMouse } from "./useMouse";
import { user } from "./useUser";
import { hashText } from "./useHash";
import { logEvent } from "./useLog";
import { computed, ref, reactive, watchEffect } from "vue";
import { getFirstEmoji } from ".";
import { getArrow } from "curved-arrows";
import { useElementBounding } from "@vueuse/core";

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

export function useSpace({
  spaceName = "public",
  TIMEOUT = 10000,
  pad = 50,
  randomness = 0.1,
} = {}) {
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
    arrows: {},
  });

  const plane = ref();

  const { width, height } = useElementBounding(plane);

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

  const seeds = {};

  watchEffect(() => {
    for (let pub1 in space.mates) {
      seeds[pub1] = seeds[pub1] || {};

      for (let pub2 in space.mates[pub1]) {
        let seed = (seeds[pub1][pub2] =
          seeds[pub1][pub2] || Math.random() * randomness);

        if (space.mates[pub1][pub2]) {
          const linkData = space.mates[pub1][pub2];
          let g1 = allGuests[pub1];
          let g2 = allGuests[pub2];
          let age = Date.now() * 2 - g1?.pulse - g2?.pulse;
          if (g1 && g2 && g1?.hasPos && g2?.hasPos && age < TIMEOUT) {
            let arrowArray = getArrow(
              g1.pos.x * width.value,
              g1.pos.y * height.value,
              g2.pos.x * width.value,
              g2.pos.y * height.value,
              {
                padEnd: 20,
                padStart: 10,
              }
            );
            const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae, as] = arrowArray;
            let arrow = {
              sx,
              sy,
              c1x: c1x * (1 - seed + 2 * seed),
              c1y: c1y * (1 - seed + 2 * seed),
              c2x: c2x * (1 - seed + 2 * seed),
              c2y: c2y * (1 - seed + 2 * seed),
              ex,
              ey,
              ae,
              as,
            };

            space.links[pub1 + pub2] = {
              user: pub1,
              mate: pub2,
              emoji: getFirstEmoji(linkData),
              from: g1.pos,
              to: g2.pos,
              arrow,
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

  return { space, guests, plane, width, height, area, join, place };
}
