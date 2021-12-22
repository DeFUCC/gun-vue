import { gun } from "./gun";
import { useSvgMouse } from "./mouse";
import { account } from "./account";

export function useSpace(name = "public") {
  const space = reactive({
    title: name,
    db: gun.get(name),
    my: {
      id: null,
      mouse: computed(() => ({ x: mouse.normX, y: mouse.normY })),
      pos: null,
    },
    guests: {},
  });

  gun
    .user()
    .get("space")
    .get(name)
    .get("pos")
    .on((pos) => {
      space.my.pos = pos;
    });

  const { area, mouse } = useSvgMouse();

  gun
    .get(name)
    .get("guests")
    .map()
    .once(function (acc, id) {
      if (acc == null) {
        return;
      }
      space.guests[id] = {
        blink: false,
        pub: "",
        pulse: 0,
        age: 0,
        pos: {
          x: 0,
          y: 0,
        },
      };

      space.guests[id].pub = id;
      space.guests[id].pulse = acc.pulse;
      if (account.pulse - acc.pulse > 5000) {
        this.put(null);
      }
      this.get("pulse").on((d) => {
        space.guests[id].pulse = d;
        space.guests[id].blink = !space.guests[id].blink;
      });
      this.get("space")
        .get(name)
        .get("pos")
        .map()
        .on((d, k) => {
          space.guests[id].pos[k] = d;
        });
    });

  async function join() {
    if (!gun.user().is) return;
    place();
    gun.get(name).get("guests").get(gun.user().is.pub).put(gun.user());
  }

  function place() {
    let pos = { x: mouse.normX, y: mouse.normY };
    gun.user().get("space").get(name).get("pos").put(pos);
  }

  return { space, area, join, place };
}
