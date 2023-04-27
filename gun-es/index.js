
import Gun from 'gun';
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/rindexed";
import "gun/lib/webrtc";

const window = window || { Gun }
self.Gun = globalThis.Gun = Gun
import { default as SEA } from 'gun/sea.js';


export { Gun, SEA };


