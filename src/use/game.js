import { db, sea } from "@db/db";
import { useSvgMouse } from "@use/mouse";

export function useGame() {
  const { svg, area, mouse } = useSvgMouse();

  const me = reactive({
    pair: null,
    num: null,
    pub: null,
    x: computed(() => mouse.normX),
    y: computed(() => mouse.normY),
  });

  const players = reactive({
    next: 0,
    max: 10,
    list: {},
  });

  db.get("playersNext").on((d) => (players.next = d));
  db.get("players")
    .map()
    .on((d, k) => {
      if (d == null) return;
      players.list[k] = { ...d };
    });

  async function join() {
    me.pair = await sea.pair();
    me.pub = me.pair.pub;
    me.num = players.next % players.max;

    const myRec = db.get("players").get(me.num);

    watch(mouse, (m) => {
      myRec.put({ x: m.normX, y: 1 - m.normY });
    });

    setInterval(() => {
      myRec.get("pulse").put(Date.now());
    }, 500);

    let player = {
      pub: me.pair.pub,
      pulse: Date.now(),
      x: mouse.normX,
      y: 1 - mouse.normY,
    };

    myRec.put(player);
    db.get("playersNext").put(me.num + 1);
  }

  return { svg, area, players, me, join };
}
