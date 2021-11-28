const config = {
  appPath: "test",
  peers: ["https://etogun.glitch.me/gun" /*"http://localhost:4200/gun"*/],
};

import { reactive } from "vue";

import Gun from "gun/gun";
import SEA from "gun/sea.js";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
// import 'gun/lib/webrtc'
import "gun/nts";

export let gun, appPath, db;
export { SEA };
export const soul = Gun.node.soul;

const relay = reactive({
  pulse: 0,
  peers: null,
  path: null,
});

export function useDb(
  path = "gunvue",
  peers = ["https://etogun.glitch.me/gun"],
  debug = false
) {
  gun = Gun({ peers, localStorage: false });

  db = gun.get(path);

  if (debug) {
    window.gun = gun; //for debugging
    window.sea = SEA; //for debugging
  }

  relay.peers = peers;
  relay.path = path;

  db.get("relay")
    .get("pulse")
    .on((d) => {
      relay.pulse = d;
    });

  return { gun, db, relay };
}
