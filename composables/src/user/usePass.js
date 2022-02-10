/**
 * Manage user's password and credentials
 * @module usePass
 */

import { computed, reactive, watchEffect } from "vue";
import { gun, useGun, SEA, auth, isPair, user } from "..";
import base32 from "base32";

/**
 * @typedef {reactive} Pass
 * @property {Object} safe
 * @property {Object} dec
 */

export const pass = reactive({
  input: "",
  show: false,
  safePair: false,
  minLength: 5,
  safe: {},
  dec: {},
  links: {
    pass: computed(() => {
      return genLink(pass.safe?.enc);
    }),
    pair: computed(() => {
      return genLink(JSON.stringify(user.pair()));
    }),
  },

  set() {
    setPass(pass.input);
    pass.input = "";
    pass.show = false;
  },
});

function genLink(text = "") {
  let base = base32.encode(text);
  return window.location.origin + window.location.pathname + "#/auth/" + base;
}

export function parseLink(link) {
  let index = link.indexOf("#/auth/");
  let base = link.substr(index + 7);
  return base32.decode(base);
}

let initiated = false;

/**
 * Manage password of a user
 * @returns {usePass}
 */

export function usePass() {
  if (!initiated) {
    const gun = useGun();
    gun
      .user()
      .get("safe")
      .map()
      .on((d, k) => {
        pass.safe[k] = d;
      });

    watchEffect(async () => {
      if (!pass.show) {
        pass.dec = {};
        return;
      }
      if (pass?.show && pass?.safe?.pass) {
        pass.dec.pass = await SEA.decrypt(pass.safe.pass, user.pair());
        pass.input = pass.dec.pass;
      }
      if (pass.show && pass?.safe?.enc) {
        pass.dec.pair = await SEA.decrypt(pass.safe.enc, pass.dec.pass);
      }
    });
  }
  initiated = true;

  return { pass, setPass, logWithPass };
}

/**
 * @typedef {Object} usePass
 * @property {Pass} pass - the reactive password object
 * @property {Function} setPass
 * @property {Function} logWithPass
 */

export async function hasPass(pub) {
  return await gun.get(`~${pub}`).get("safe").get("enc").then();
}

async function logWithPass(pub, passphrase) {
  let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
  let pair = await SEA.decrypt(encPair, passphrase);
  auth(pair);
}

async function setPass(text) {
  let encPair = await SEA.encrypt(user.pair(), text);
  let encPass = await SEA.encrypt(text, user.pair());
  user.db.get("safe").get("enc").put(encPair);
  user.db.get("safe").get("pass").put(encPass);
}

export function usePassLink(data, passPhrase) {
  if (!data) return;
  const decoded = base32.decode(data);
  if (decoded.substring(0, 3) == "SEA") {
    if (passPhrase) {
      logEncPass(decoded, passPhrase);
    }
    return "encrypted";
  } else {
    try {
      let d = JSON.parse(decoded);
      if (isPair(d)) {
        auth(d);
      }
      return "success";
    } catch (e) {
      return "incorrect link";
    }
  }
}

async function logEncPass(encPair, passphrase) {
  let pair = await SEA.decrypt(encPair, passphrase);
  auth(pair);
}
