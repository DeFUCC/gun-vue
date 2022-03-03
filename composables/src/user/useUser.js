/**
 * Basic user management
 * @module useUser
 * */

import { gun, useGun } from "..";
import { useColor } from "../ui";
import { computed, reactive, ref } from "vue";
import ms from "ms";

const colorDeep = useColor("deep");

export const selectedUser = reactive({
  pub: null,
});

/**
 * @typedef {Object} Account - the user account interface
 * @property {ref} pub - The pub key used to build the account
 * @property {computed} color - The user account color derived from the pub key
 * @property {Object} profile - An object with all the `gun.user().get('profile')` data
 * @property {Number} pulse - latest timestamp from the user. It's emitted every second. Offline timeout is set to 10 seconds.
 * @property {Boolean} blink - A boolean that toggles on every timestamp received
 * @property {Sting} lastSeen - Shows 'online' if recent pulse is less then 10s ago or a human readable time string
 * @property {gun} db - `gun.user(pub)` ref to query any additional user data
 * @example
 * {
 * "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc",
 * "color": "#f55c3d",
 * "profile": {
 *    "name": "Accord",
 *    "Message": "Use your imagination!",
 *    "Money": "$ 20000000000"
 * },
 * "pulse": 1642077216809,
 * "lastSeen": "online",
 * "blink": true
 * }
 */

/**
 * @typedef {Object} User - An interface to the current gun user
 * @property {Boolean} initiated - `true` if useUser has been run at least once
 * @property {Object} is - Reactive `gun.user().is`
 * @property {String} pub - Current user public key
 * @property {String} color - a HEX color for the given pub
 * @property {Number} pulse - Last received pulse timestamp
 * @property {Number} pulser - An id for pulse `setInterval`
 * @property {Boolean} blink - Toggles with every pulse received
 * @property {Object} db - `gun.user()` reference
 * @property {Object} safe - safe account indicators
 * @property {Function} pair - use `user.pair()` to get curent user key pair
 * @example
 * { 
 *  "initiated": true, 
 *  "is": { 
 *    "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc", 
 *    "epub": "wAvPlMAg4jvUvK4sPpVyF1CAWnRCMu1YpHnoDrVDg-o.l79QDmdPCLEiO0F_WkB3zYLpJt-lANtyhNmHSM4bTes", 
 *    "alias": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc" 
 *  }, 
 *  "name": "Accord", 
 *  "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc", 
 *  "color": "#f55c3d", 
 *  "pulse": 1642708061615, 
 *  "pulser": 12, 
 *  "blink": false, 
 *  "safe": { 
 *    "saved": true, 
 *    "password": null, 
 *    "enc": "SEA{\"ct\":\"E+6GViU9dTuidruOCNAoBITE+AlGNRgiABplSbL5fh4v1P+fhF33MuBwKd3ssBNi2kJ1sCzvS/YLmzivECA5ARZPGVbgXTSj8AE9kCz0Ac/8ushlsfBNdt8s3+a3OPVxMIevnT01uqcgr75Zp4TugIg/YuB5WltA9RHsgWEMlo+X+tRGaqG5rfw4sAmTSV0P8evMgM9rN/Un5t/WeDbvIPNXqZEmtxwAhMUZwOJWZckNZmNwpxnelFO0BwmauWfzkXuqGeSxNhMeaZi+VoRDMUvTjT68DLBnVoOhFhcdco+RW8AJfktZHZ4GF2IzFnQmTGpUd2LfvIY/Yn1eNJH7iQ5w41ChiYB/zhgQCOc5ur51PV6swAuN595vUNn7+0J1JRSNGzW2V/4j4YR4IEsAoqOtdn2Y21ga/CFdrE0=\",\"iv\":\"LtODTV+LBzhWHqUcptUO\",\"s\":\"XCL9Uj1YlPcV\"}", 
 *  "pass": "SEA{\"ct\":\"8wNClMx/ebfou+gGWdf+bbx0TAgc9RU=\",\"iv\":\"NPgHkI+Ke+i/mw+3chlr\",\"s\":\"3VzGv06Y4fQ+\"}" 
 *  } 
 * }

 */

export const user = reactive({
  initiated: false,
  auth: false,
  is: null,
  name: "",
  pub: computed(() => user?.is?.pub),
  color: computed(() => (user.pub ? colorDeep.hex(user.pub) : "gray")),
  pulse: 0,
  pulser: null,
  blink: false,
  safe: {
    saved: null,
    password: null,
  },
  pair() {
    return gun?.user?.()?._?.sea;
  },
});

/**
 * @typedef useUser
 * @property {User} user - the user interface
 * @property {Function} auth - auth with a pair
 * @property {Function} leave - log out
 */

/**
 * Get access to current logged in user
 * @returns {useUser}
 * @example
 * import { useUser } from '@gun-vue/composables'
 *
 * const { user, auth, leave } = useUser()
 */

export function useUser() {
  const gun = useGun();
  user.db = gun.user();

  if (!user.initiated) {
    gun.user().recall({ sessionStorage: true }, () => {
      console.log("user was recalled");
    });

    gun.on("auth", () => {
      init();
      console.log("user authenticated");
    });
  }
  user.initiated = true;

  return { user, auth, leave };
}

function init() {
  user.is = gun.user().is;
  if (user.pulser) {
    clearInterval(user.pulser);
  }
  user.pulser = setInterval(() => {
    gun.user().get("pulse").put(Date.now());
  }, 1000);

  gun.user().get('epub').put(user.is.epub)

  gun
    .user()
    .get("pulse")
    .on((d) => {
      user.blink = !user.blink;
      user.pulse = d;
    })

  gun.user()
    .get("safe")
    .map()
    .on((d, k) => {
      user.safe[k] = d;
    });

  gun
    .user()
    .get("profile")
    .get("name")
    .on((d) => (user.name = d));

  user.initiated = true;
}

/**
 * Authenticate with a SEA key pair
 * @param {Object} pair
 * @example
 * import { auth, SEA } from '@gun-vue/composables'
 *
 * async function login() {
 *    const pair = await SEA.pair()
 *    auth(pair)
 * }
 */

export async function auth(pair, cb = () => { }) {
  if (!isPair(pair)) {
    // pair = await SEA.pair();
    console.log("incorrect pair", pair);
    return;
  }
  gun.user().auth(pair, async () => {
    cb();
    console.log("user is authenticated");
  });
}

/**
 * Log out the user
 * @example
 * import { leave } from '@gun-vue/composables'
 *
 * leave()
 **/

export function leave() {
  let is = !!user.is?.pub;
  user.initiated = false;
  clearInterval(user.pulser);
  gun.user().leave();
  setTimeout(() => {
    if (is && !user.pair()) {
      user.is = null;
      console.info("User logged out");
    }
  }, 500);
}

export function isMine(soul) {
  if (!soul) return;
  return soul.slice(1, 88) == user.pub;
}

/**
 * Add a field to the User profile
 * @param {String} name
 * @example
 * import { addProfileField } from '@gun-vue/composables'
 *
 * addProfileField( 'city' )
 */

export function addProfileField(title) {
  gun.user().get("profile").get(title).put("");
}

/**
 * Update a profile field
 * @param {String} field
 * @param {Any} data
 * @example
 * import { updateProfile } from '@gun-vue/composables'
 *
 * updateProfile( 'city', 'Moscow' )
 */

export function updateProfile(field, data) {
  if (field && data !== undefined) {
    gun.user().get("profile").get(field).put(data);
  }
}

/**
 * Check if the object is a proper SEA pair
 * @param {Object} pair - an object to check
 * @returns {Boolean}
 */

export function isPair(pair) {
  return (
    pair &&
    typeof pair == "object" &&
    pair.pub &&
    pair.epub &&
    pair.priv &&
    pair.epriv
  );
}
