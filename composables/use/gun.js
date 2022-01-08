/**
 * Gun DB initialization and basic methods
 * @module Gun
 */

import Gun from "gun/gun";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
// import "gun/lib/webrtc";
import "gun/nts";

export const peers = ["https://etogun.glitch.me/gun"];
// export const peers = ["http://192.168.1.100:4200/gun"];
// export const peers = ["http://localhost:4200/gun"];

/** Established Gun instance for database operations */
export const gun = Gun({
  peers,
  localStorage: false,
});

/** Secondary Gun instance for key management */
export const gun2 = Gun({ peers, localStorage: false });

/**
 * SEA library
 * @constant SEA
 */
export { default as SEA } from "gun/sea.js";

/**
 * **Get a soul for any given node**
 * A wrapper for `Gun.node.soul`
 * @function soul
 */
export const soul = Gun?.node?.soul;

/**
 * **Generate a random UUID**
 * A wrapper for `Gun.text.random`
 * @function genUUID
 */
export const genUUID = Gun?.text?.random;

// A putPriv chain extension as noted by @amark
GUN.chain.putPriv = function (data, cb, opt) {
  var ref = this;
  (async function () {
    ref.put(await SEA.encrypt(data, ref.back(-1).user().pair()), cb, opt);
  })();
  return ref;
};
