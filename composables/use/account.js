/**
 * Basic account management
 * @module Account
 * */

import { gun, SEA } from "./gun";
import { reactive, computed } from "vue";
import { color } from "./color";

/**
 * @typedef {Reactive} Account - A reactive object to handle current user account
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
  color: computed(() => (account.pub ? color.deep.hex(account.pub) : "gray")),
  profile: {},
  pulse: 0,
  pulser: null,
  blink: false,
  user: gun.user(),
});

/**
 * Gives access to the gun user account
 * @typedef {Object} useAccount - User access system
 * @property {Account} account - the reactive user object
 * @property {function} auth - log in
 * @property {Function} leave - log out
 */

/**
 * Account system access
 * @returns {useAccount}
 */
export function useAccount() {
  if (!account.is) {
    gun.user().recall({ sessionStorage: true }, () => {
      console.log("user was recalled");
      init();
    });

    gun.on("auth", () => {
      init();
      console.log("user authenticated");
    });
  }

  return { account, auth, leave };
}

/**
 * Authenticate with a SEA key pair
 * @param {Object} pair
 */

async function auth(pair) {
  if (!pair || !pair.pub || !pair.priv) {
    pair = await SEA.pair();
    console.log("new account created");
  }
  gun.user().auth(pair, async () => {
    console.log("account is authenticated");
  });
}

function init() {
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

function updateProfile(field, data) {
  if (field && data !== undefined) {
    gun.user().get("profile").get(field).put(data);
  }
}

/**
 * Log out the user and rest the account object
 */

function leave() {
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
}

export async function findByAlias(alias) {
  return await gun.get("~@" + alias).then();
}

async function hasPass(pub) {
  return await gun.get(`~${pub}`).get("pass").get("pair").then();
}

async function getFromPass(pub, password) {
  let encPair = await gun.get(`~${pub}`).get("pass").get("pair").then();
  return await SEA.decrypt(encPair, password);
}

function isMine(soul) {
  if (!soul) return;
  return soul.slice(1, 88) == account.pub;
}
