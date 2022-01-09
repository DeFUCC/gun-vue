import { gun } from "./gun";
import { useSvgMouse } from "./mouse";
import { user } from "./user";
import { hashText } from "./hash";
import { logEvent } from "./log";

export function useSpace(spaceName = "public") {
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

  watch(
    () => space.mates,
    (mates) => {
      let arr = [];
      for (let pub1 in mates) {
        for (let pub2 in mates[pub1]) {
          if (mates[pub1][pub2]) {
            if (space.guests?.[pub1]?.hasPos && space.guests?.[pub2]?.hasPos) {
              space.links[pub1 + pub2] = {
                presence: Date.now() - space.guests[pub1].pulse,
                user: pub1,
                mate: pub2,
                from: space.guests[pub1].pos,
                to: space.guests[pub2].pos,
              };
            }
          }
        }
      }
    },
    { immediate: true, deep: true }
  );

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
    let already = await gun.get(spaceName).get("#guests").get(hash).then();
    if (already) return;
    gun.get(spaceName).get("#guests").get(hash).put(user.pub);
    logEvent("guest", { event: "guest", space: spaceName, pub: user.pub });
    space.joined = true;
  }

  gun
    .get(spaceName)
    .get("#guests")
    .map()
    .once(async (pub, hash) => {
      if (pub == user.pub) {
        space.joined = true;
      }

      space.guests[pub] = {
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
          space.guests[pub].pulse = d;
          space.guests[pub].blink = !space.guests[pub].blink;
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
          space.guests[pub].hasPos = true;
          space.guests[pub].pos[k] = d;
        });
    });

  function place() {
    let pos = { x: mouse.normX, y: mouse.normY };
    gun.user().get(spaceName).get("pos").put(pos);
  }

  return { space, area, join, place };
}
