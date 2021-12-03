import { gun, SEA } from "./gun";
import { account } from "./account";

export function usePass() {
  const pass = reactive({
    input: "",
    show: false,
    min: 5,
    enc: {
      pass: "",
      pair: "",
    },
    dec: {
      pass: "",
      pair: "",
    },
    set() {
      setPassword(pass.input);
      pass.input = "";
    },
  });

  onMounted(() => {
    gun
      .user()
      .get("enc")
      .map()
      .on((d, k) => {
        pass.enc[k] = d;
      });
  });

  watchEffect(async () => {
    if (!pass.show) {
      pass.dec = {};
      return;
    }
    if (pass.enc.pass) {
      pass.dec.pass = await SEA.decrypt(pass.enc.pass, gun.user()._.sea);
    }
    if (pass.enc.pair) {
      pass.dec.pair = await SEA.decrypt(pass.enc.pair, pass.dec.pass);
    }
  });

  return { pass };
}

export async function hasPass(pub) {
  return await gun.get(`~${pub}`).get("pass").get("pair").then();
}

export async function logWithPass(pub, password) {
  let encPair = await gun.get(`~${pub}`).get("pass").get("pair").then();
  let pair = await SEA.decrypt(encPair, password);
  account.auth(pair);
}

export async function setPassword(text) {
  let encPair = await SEA.encrypt(gun.user()._.sea, text);
  let encPass = await SEA.encrypt(text, gun.user()._.sea);
  gun.user().get("enc").get("pair").put(encPair);
  gun.user().get("enc").get("pass").put(encPass);
}
