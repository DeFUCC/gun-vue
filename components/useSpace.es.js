import { useGun, user, currentRoom } from "./useDraw.es.js";
import { useMousePressed, reactive, onMounted, useMouseInElement, watch, onBeforeUnmount, ref, useElementBounding, useClamp, computed, watchEffect, getArrow } from "./vendor.es.js";
import { getFirstEmoji } from "./useMates.es.js";
function useSvgMouse(area = ref(null)) {
  const { pressed } = useMousePressed();
  const mouse = reactive({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
    pressed,
    inside: false
  });
  onMounted(() => {
    document.addEventListener("mousemove", getCursorPosition);
    const { isOutside } = useMouseInElement(area);
    watch(isOutside, (out) => {
      mouse.inside = !out;
    });
  });
  onBeforeUnmount(() => {
    document.removeEventListener("mousemove", getCursorPosition);
  });
  function getCursorPosition(event, rect = area.value) {
    const svgElement = rect.closest("svg");
    if (!svgElement)
      return;
    var svgPoint = svgElement.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    let correct = svgPoint.matrixTransform(svgElement.getScreenCTM().inverse());
    {
      mouse.x = correct.x;
      mouse.y = correct.y;
    }
  }
  return {
    area,
    mouse
  };
}
function useSpace({
  TIMEOUT = 1e4,
  randomness = 0.1
} = {}) {
  const plane = ref();
  const { area, mouse } = useSvgMouse(plane);
  const { width, height } = useElementBounding(plane);
  const position = reactive([0, 0]);
  const zoom = useClamp(1, 0.5, 2);
  const gun = useGun();
  const space = reactive({
    title: "space",
    joined: false,
    db: computed(() => gun.user(currentRoom.pub).get("space")),
    cert: computed(() => {
      var _a;
      return (_a = currentRoom.features) == null ? void 0 : _a.space;
    }),
    my: {
      mouse: computed(() => ({ x: mouse.x, y: mouse.y })),
      pos: null
    }
  });
  async function join() {
    space.joined = true;
  }
  function place({ x = mouse.x, y = mouse.y } = {}) {
    var _a;
    if (!user.pub)
      return;
    if (!space.joined)
      join();
    position[0] = x;
    position[1] = y;
    space.db.get(user.pub).get("pos").put(JSON.stringify({ x, y }), null, {
      opt: { cert: (_a = currentRoom.features) == null ? void 0 : _a.space }
    });
  }
  const allGuests = reactive({});
  const mates = reactive({});
  const links = reactive({});
  const guests = computed(() => {
    var _a;
    const obj = {};
    for (let g in allGuests) {
      if (Date.now() - ((_a = allGuests[g]) == null ? void 0 : _a.pulse) < TIMEOUT) {
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
      pub,
      blink: false,
      pulse: 0,
      hasPos: false,
      pos: {
        x: 0,
        y: 0
      }
    };
    space.db.get(pub).get("pos").on((d, k) => {
      allGuests[pub].hasPos = true;
      allGuests[pub].pos = typeof d == "string" ? JSON.parse(d) : d;
    });
    gun.user(pub).get("pulse").on((d) => {
      allGuests[pub].pulse = d;
      allGuests[pub].blink = !allGuests[pub].blink;
    }).back().get("mates").map().on((d, k) => {
      mates[pub] = mates[pub] || {};
      mates[pub][k] = d;
    });
    space.db.get(pub).get("draw").on((d) => {
      if (!d)
        return;
      allGuests[pub].draw = d;
    });
  });
  const seeds = {};
  watchEffect(() => {
    for (let pub1 in mates) {
      seeds[pub1] = seeds[pub1] || {};
      for (let pub2 in mates[pub1]) {
        let seed = seeds[pub1][pub2] = seeds[pub1][pub2] || Math.random() * randomness;
        if (mates[pub1][pub2]) {
          const linkData = mates[pub1][pub2];
          let g1 = allGuests[pub1];
          let g2 = allGuests[pub2];
          let age = Date.now() * 2 - (g1 == null ? void 0 : g1.pulse) - (g2 == null ? void 0 : g2.pulse);
          if (g1 && g2 && (g1 == null ? void 0 : g1.hasPos) && (g2 == null ? void 0 : g2.hasPos) && age < TIMEOUT) {
            links[pub1 + pub2] = {
              user: pub1,
              mate: pub2,
              emoji: getFirstEmoji(linkData),
              from: g1.pos,
              to: g2.pos,
              arrow: generateArrow(g1.pos, g2.pos, seed)
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
    allGuests,
    guests,
    guestCount,
    links,
    plane,
    width,
    height,
    position,
    zoom,
    area,
    join,
    place
  };
}
function generateArrow(pos1, pos2, seed = 0) {
  let arrowArray = getArrow(pos1.x, pos1.y, pos2.x, pos2.y, {
    padEnd: 20,
    padStart: 10
  });
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
    as
  };
  return arrow;
}
export { useSpace, useSvgMouse };
