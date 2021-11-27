import { db, sea } from "@store/db";
import { useSvgMouse } from "@use/mouse";

export function useGame() {
  const { svg, area, mouse } = useSvgMouse();

  const my = reactive({
    pair: null,
    num: null,
    pub: null,
    x: computed(() => mouse.normX),
    y: computed(() => 1 - mouse.normY),
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
    my.pair = await sea.pair();
    my.pub = my.pair.pub;
    my.num = players.next % players.max;

    const myRec = db.get("players").get(my.num);

    watch(mouse, (m) => {
      myRec.put({ x: m.normX, y: 1 - m.normY });
    });

    setInterval(() => {
      myRec.get("pulse").put(Date.now());
    }, 500);

    let player = {
      pub: my.pair.pub,
      pulse: Date.now(),
      x: mouse.normX,
      y: 1 - mouse.normY,
    };

    myRec.put(player);
    db.get("playersNext").put(my.num + 1);
  }

  return { svg, area, players, my, join };
}
