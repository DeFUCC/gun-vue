import { gun, sea } from "@store/db";

let presence;

export const account = reactive({
  is: null,
  pub: computed(() => account.is?.pub),
  profile: {},

  load() {
    account.is = gun.user().is;
    let presence = setInterval(() => {
      gun.user().get("presence").put(Date.now());
    }, 1500);
    console.info("Logged in as ", account.is.pub);
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
    clearInterval(presence);
    setTimeout(() => {
      if (is && !gun.user()._?.sea) {
        account.is = null;
        account.profile = {};
        console.info("User logged out");
      }
    }, 500);
  },

  updateProfile(field, data) {
    if (field && data !== undefined) {
      gun.user().get("profile").get(field).put(data);
    }
  },

  auth(pair, name, cb) {
    gun.user().auth(pair, async () => {
      if (name) {
        let hadName = await gun.user().get("profile").get("name").then();
        if (!hadName) {
          gun.user().get("profile").get("name").put(name);
        }
      }
      if (typeof cb == "function") cb();
    });
  },

  async hasPass(pub) {
    return await gun.get(`~${pub}`).get("pass").get("pair").then();
  },

  async logWithPass(pub, password) {
    let encPair = await gun.get(`~${pub}`).get("pass").get("pair").then();
    let pair = await sea.decrypt(encPair, password);
    participate(pair);
  },
});

gun.user().recall({ sessionStorage: true }, () => {
  account.load();
});

gun.on("auth", () => {
  account.load();
});
