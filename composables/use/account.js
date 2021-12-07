/**
 * Basic account management
 * @module Account
 * */

import { gun, SEA } from "./gun";
import { reactive, computed } from "vue";
import { downloadText } from "./file";

/**
 * @typedef {Reactive} account - A reactive object to handle current user account
 * @property {Boolean} initiated - used to determine if we already initiated the account
 * @property {Object} is - the reactive gun.user().is property, containing the public keys of a logged in user
 * @property {String} pub - user's public key computed from the `account.is.pub`
 * @property {Object} profile - user profile – the key-value store for any user account data
 * @property {Number} pulse - recent timestamp of the user
 * @property {Number} pulser - the id of a setInterval, that's driving the pulse
 * @property {Boolean} blink - changes on every timestamp message and makes the status indicator blink if user is online
 * @property {Object} space - the private gun.user().get('space') graph for application data
 * @property {Object} user - gun.user() instance
 */

export const account = reactive({
  initiated: false,
  is: null,
  pub: computed(() => account?.is?.pub),
  profile: { name: "no name" },
  pulse: 0,
  pulser: null,
  blink: false,
  space: gun.user().get("space"),
  user: gun.user(),

  init() {
    if (account.initiated) return;
    account.is = gun.user().is;
    if (account.pulser) {
      clearInterval(account.pulser);
    }
    account.pulser = setInterval(() => {
      gun.user().get("pulse").put(Date.now());
    }, 1000);

    loadProfile();
    account.initiated = true;
  },

  updateProfile(field, data) {
    if (field && data !== undefined) {
      gun.user().get("profile").get(field).put(data);
    }
  },

  find(alias, cb) {
    gun.get("~@" + alias).once((val) => {
      cb(val);
    });
  },
  logout() {
    let is = !!account.is?.pub;
    account.initiated = false;
    clearInterval(account.pulser);
    gun.user().leave();
    setTimeout(() => {
      if (is && !gun.user()._?.sea) {
        account.is = null;
        account.profile = {};
        console.info("User logged out");
      }
    }, 500);
  },

  async auth(pair) {
    console.log(pair);
    if (!pair || !pair.pub || !pair.priv) {
      pair = await SEA.pair();
      console.log("new account created");
    }
    gun.user().auth(pair, async () => {
      console.log("account is authenticated");
    });
  },

  async hasPass(pub) {
    return await gun.get(`~${pub}`).get("pass").get("pair").then();
  },

  async logWithPass(pub, password) {
    let encPair = await gun.get(`~${pub}`).get("pass").get("pair").then();
    let pair = await SEA.decrypt(encPair, password);
  },

  isMine(soul) {
    if (!soul) return;
    return soul.slice(1, 88) == user.pub;
  },
});

export function useAccount() {
  gun.user().recall({ sessionStorage: true }, () => {
    console.log("user was recalled");
    account.init();
  });

  gun.on("auth", () => {
    account.init();
    console.log("user authenticated");
  });

  return account;
}

/**
 * Download full keypair as a json file
 * @param {Object} pair - a SEA keypair. If not set – the current user keypair is downloaded
 */
export function downloadUserPair(pair) {
  if (!pair || !pair?.pub) {
    pair = gun.user()._.sea;
  }
  pair = JSON.stringify(pair);
  downloadText(pair, "application/json", account.profile.name + ".json");
}

function loadProfile() {
  gun
    .user()
    .get("pulse")
    .on((d) => {
      account.blink = !account.blink;
      account.pulse = d;
    })
    .back()
    .get("profile")
    .map()
    .on((data, key) => {
      account.profile[key] = data;
    });
}
