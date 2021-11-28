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

export const gun = Gun({ peers: config.peers, localStorage: false });
export const sea = SEA;
window.gun = gun; //for debugging
window.sea = SEA; //for debugging

export const appPath = config.appPath;
export const db = gun.get(appPath);
export const soul = Gun.node.soul;

export function useRelay() {
  const relay = reactive({
    pulse: 0,
  });

  db.get("relay")
    .get("pulse")
    .on((d) => {
      relay.pulse = d;
    });
  return relay;
}
