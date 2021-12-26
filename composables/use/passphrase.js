import { gun, SEA } from "./gun";
import { auth, user } from "./user";

export const pass = reactive({
  input: "",
  show: false,
  minLength: 5,
  safe: {},
  dec: {},
  set() {
    setPassphrase(pass.input);
    pass.input = "";
    pass.show = false;
  },
});

export function usePassphrase() {
  onMounted(() => {
    gun
      .user()
      .get("safe")
      .map()
      .on((d, k) => {
        pass.safe[k] = d;
      });
  });

  watchEffect(async () => {
    if (!pass.show) {
      pass.dec = {};
      return;
    }
    if (pass.show && pass.safe?.pass) {
      pass.dec.pass = await SEA.decrypt(pass.safe.pass, user.pair());
      pass.input = pass.dec.pass;
    }
    if (pass.show && pass.safe?.enc) {
      pass.dec.pair = await SEA.decrypt(pass.safe.enc, pass.dec.pass);
    }
  });

  return { pass };
}

export async function hasPass(pub) {
  return await gun.get(`~${pub}`).get("safe").get("enc").then();
}

export async function logWithPass(pub, passphrase) {
  let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
  let pair = await SEA.decrypt(encPair, passphrase);
  auth(pair);
}

export async function setPassphrase(text) {
  let encPair = await SEA.encrypt(user.pair(), text);
  let encPass = await SEA.encrypt(text, user.pair());
  gun.user().get("safe").get("enc").put(encPair);
  gun.user().get("safe").get("pass").put(encPass);
}
