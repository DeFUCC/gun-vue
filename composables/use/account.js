import { gun, SEA } from "./gun";
import { reactive, computed } from "vue";

export const account = reactive({
  initiated: false,
  is: null,
  pub: computed(() => account.is?.pub),
  profile: {},
  pair: null,
  name: null,
  pulse: 0,
  pulser: null,
  blink: false,
  gun() {
    return gun.user();
  },

  init() {
    if (account.initiated) return;
    account.is = gun.user().is;
    if (account.pulser) {
      clearInterval(account.pulser);
    }
    account.pulser = setInterval(() => {
      gun.user().get("pulse").put(Date.now());
    }, 1000);

    account.loadProfile();
    account.initiated = true;
  },

  loadProfile() {
    gun
      .user()
      .get("pulse")
      .on((d) => {
        account.blink = !account.blink;
        account.pulse = d;
      });
    gun
      .user()
      .get("profile")
      .map()
      .on((data, key) => {
        account.profile[key] = data;
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
  watch(account.profile, (profile) => {
    for (let record in profile) {
      gun.user().get("profile").get(record).put(profile[record]);
    }
  });

  gun.user().recall({ sessionStorage: true }, () => {
    account.init();
  });

  gun.on("auth", () => {
    account.init();
  });

  return account;
}
