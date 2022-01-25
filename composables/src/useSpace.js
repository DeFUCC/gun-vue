/**
 * A 2D-space
 * @module useSpace
 * @todo draggable handles https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o
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
 * @property {reactive} space The main object
 * @property {reactive} guests Active guests
 * @property {reactive} links Links between active guests
 * @property {ref} width Width of the plane
 * @property {ref} height Height of the plane
 * @property {ref} area The SVG element for mouse events capture
 * @property {Function} join Join the space with the current user
 */

/**
 *  A space to navigate with mouse clicks
 * @param {String} spaceName
 * @returns {useSpace}
 * @example
 * const { space, plane, links, width, height, guests, area, join } = useSpace({
 * TIMEOUT: 10000,
 * spaceName: 'Space title'
 * })
 */

export function useSpace({
  spaceName = "public",
  TIMEOUT = 10000,
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
  });

  const plane = ref();
  const allGuests = reactive({});
  const mates = reactive({});
  const links = reactive({});

  const guests = computed(() => {
    const obj = {};
    for (let g in allGuests) {
      if (Date.now() - allGuests[g]?.pulse < TIMEOUT) {
        obj[g] = allGuests[g];
      }
    }
    return obj;
  });

  const { width, height } = useElementBounding(plane);

  const { area, mouse } = useSvgMouse();

  gun
    .user()
    .get(spaceName)
    .get("pos")
    .on((pos) => {
      space.my.pos = pos;
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
          mates[pub] = mates[pub] || {};
          mates[pub][k] = d;
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

  const seeds = {}; //random seeds to scatter the arrows a little - depends on the `randomness` option

  watchEffect(() => {
    for (let pub1 in mates) {
      seeds[pub1] = seeds[pub1] || {};

      for (let pub2 in mates[pub1]) {
        let seed = (seeds[pub1][pub2] =
          seeds[pub1][pub2] || Math.random() * randomness);

        if (mates[pub1][pub2]) {
          const linkData = mates[pub1][pub2];
          let g1 = allGuests[pub1];
          let g2 = allGuests[pub2];
          let age = Date.now() * 2 - g1?.pulse - g2?.pulse;
          if (g1 && g2 && g1?.hasPos && g2?.hasPos && age < TIMEOUT) {
            links[pub1 + pub2] = {
              user: pub1,
              mate: pub2,
              emoji: getFirstEmoji(linkData),
              from: g1.pos,
              to: g2.pos,
              arrow: generateArrow(g1.pos, g2.pos, seed),
            };
          }
        } else {
          delete links[pub1 + pub2];
        }
      }
    }
  });

  function generateArrow(pos1, pos2, seed = 0) {
    let arrowArray = getArrow(
      pos1.x * width.value,
      pos1.y * height.value,
      pos2.x * width.value,
      pos2.y * height.value,
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
    return arrow;
  }

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

  function place() {
    let pos = { x: mouse.normX, y: mouse.normY };
    gun.user().get(spaceName).get("pos").put(pos);
  }

  return { space, guests, links, plane, width, height, area, join };
}
