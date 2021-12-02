import Gun from "gun/gun";
import SEA from "gun/sea.js";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
// import 'gun/lib/webrtc'
import "gun/nts";

export const peers = ["https://etogun.glitch.me/gun"];
export const gun = Gun({ peers, localStorage: false });

export let db;
export { SEA, Gun };
export const soul = Gun.node.soul;

export function useDb(path = "gunvue", debug = false) {
  db = gun.get(path);

  if (debug) {
    window.gun = gun; //for debugging
    window.sea = SEA; //for debugging
  }

  return { gun, db };
}
