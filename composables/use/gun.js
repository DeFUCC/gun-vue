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
export const gun2 = Gun({ peers, localStorage: false });

export { SEA, Gun };
export const soul = Gun.node.soul;
