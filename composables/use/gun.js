/**
 * Gun DB initialization and basic methods
 * @module Gun
 */

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

/** Established Gun instance for database operations */
export const gun = Gun({ peers, localStorage: false });
/** Secondary Gun instance for key management */
export const gun2 = Gun({ peers, localStorage: false });

/** SEA library */
export { SEA };
/** Function to get a soul for any given node */
export const soul = Gun.node.soul;
/** Function to generate a random UUID */
export const genUuid = Gun.text.random;
