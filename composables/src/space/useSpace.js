/**
 * A 2D-space
 * @module useSpace
 */

import { useGun } from "../gun";
import { useSvgMouse } from "../ui";
import { user, useAccount } from "../user";
import { computed, ref, reactive, watchEffect } from "vue";
import { getFirstEmoji, currentRoom } from "..";
import { getArrow } from "curved-arrows";
import { useElementBounding } from "@vueuse/core";

/**
 * @typedef {Object} useSpace
 * @property {reactive} space The main object
 * @property {reactive} guests Active guests
 * @property {reactive} links Links between active guests
 * @property {ref} plane The SVG element
 * @property {ref} area The rect element for mouse events capture
 * @property {ref} width Width of the plane
 * @property {ref} height Height of the plane
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
  spaceName = "space",
  TIMEOUT = 10000,
  randomness = 0.1,
} = {}) {
  const { area, mouse } = useSvgMouse();
  const plane = ref();
  const { width, height } = useElementBounding(plane);

  const gun = useGun();

  const space = reactive({
    title: spaceName,
    joined: false,
    db: computed(() => {
      return gun.user(currentRoom.pub).get(spaceName);
    }),
    cert: computed(() => {
      return currentRoom.features?.space;
    }),
    my: {
      mouse: computed(() => ({ x: mouse.normX, y: mouse.normY })),
      pos: null,
    },
  });

  async function join() {
    space.joined = true;
  }

  function place({ x = mouse.normX, y = mouse.normY } = {}) {
    if (!user.pub) return;
    if (!space.joined) join();
    space.db.get(user.pub).put(JSON.stringify({ x, y }), null, {
      opt: { cert: currentRoom.features?.space },
    });
  }

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

  const guestCount = computed(() => Object.keys(guests.value).length);

  space.db.get(user.pub).on((pos) => {
    space.my.pos = typeof pos == "string" ? JSON.parse(pos) : pos;
  });

  space.db.map().once(async (pos, pub) => {
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

    space.db.get(pub).on((d, k) => {
      allGuests[pub].hasPos = true;
      allGuests[pub].pos = typeof d == "string" ? JSON.parse(d) : d;
    });

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
              arrow: generateArrow(
                g1.pos,
                g2.pos,
                seed,
                width.value,
                height.value
              ),
            };
          }
        } else {
          delete links[pub1 + pub2];
        }
      }
    }
  });
  return {
    space,
    guests,
    guestCount,
    links,
    plane,
    width,
    height,
    area,
    join,
    place,
  };
}

function generateArrow(pos1, pos2, seed = 0, width, height) {
  let arrowArray = getArrow(
    pos1.x * width,
    pos1.y * height,
    pos2.x * width,
    pos2.y * height,
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

/**
 * @todo draggable handles https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o
 */
