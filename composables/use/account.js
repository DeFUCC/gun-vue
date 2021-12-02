import { gun, SEA } from "./db";
import { reactive, computed } from "vue";

export const account = reactive({
  is: null,
  pub: computed(() => account.is?.pub),
  profile: {},
  pair: null,
  name: null,
  presence: null,

  graph() {
    return gun.user();
  },

  async generate() {
    account.pair = await SEA.pair();
  },

  init() {
    account.is = gun.user().is;
    account.presence = setInterval(() => {
      gun.user().get("presence").put(Date.now());
    }, 1500);
    account.loadProfile();
  },

  loadProfile() {
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
    gun.user().leave();
    clearInterval(account.presence);
    setTimeout(() => {
      if (is && !gun.user()._?.sea) {
        account.is = null;
        account.profile = {};
        console.info("User logged out");
      }
    }, 500);
  },

  auth(pair = account.pair) {
    if (!pair) return console.log("No pair to auth");
    gun.user().auth(pair, async () => {});
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
