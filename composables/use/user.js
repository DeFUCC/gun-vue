/**
 * Basic user management
 * @module User
 * */

import { gun, SEA } from "./gun";
import { color } from "./color";

/**
 * @typedef User - An interface to the current gun user
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
 */

export const user = reactive({
  initiated: false,
  is: null,
  name: "",
  pub: computed(() => user?.is?.pub),
  color: computed(() => (user.pub ? color.deep.hex(user.pub) : "gray")),
  pulse: 0,
  pulser: null,
  blink: false,
  db: gun.user(),
  safe: {
    saved: null,
    password: null,
  },
  pair() {
    return gun.user()._.sea;
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
 */

export function useUser() {
  if (!user.is) {
    gun.user().recall({ sessionStorage: true }, () => {
      console.log("user was recalled");
      init();
    });

    gun.on("auth", () => {
      init();
      console.log("user authenticated");
    });
  }

  return { user, auth, leave };
}

function init() {
  if (user.initiated) return;
  user.is = gun.user().is;
  if (user.pulser) {
    clearInterval(user.pulser);
  }
  user.pulser = setInterval(() => {
    gun.user().get("pulse").put(Date.now());
  }, 1000);

  gun
    .user()
    .get("pulse")
    .on((d) => {
      user.blink = !user.blink;
      user.pulse = d;
    })
    .back()
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
 */

export async function auth(pair, cb = () => {}) {
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
 * Update a profile field
 * @param {String} field
 * @param {Any} data
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
