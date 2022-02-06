import { SEA } from "..";

export async function issueCert({
  pair,
  tag = "word",
  users = "*",
  personal = false,
} = {}) {
  let path = { "*": `${tag}` };
  if (personal) {
    path["+"] = "*";
  }
  try {
    let cert = await SEA.certify(users, path, pair);
    return cert;
  } catch (e) {
    console.log("cert error: ", e);
  }
}

window.issueCert = issueCert;

export async function generateCerts({ pair, list = [] } = {}) {
  const all = {};
  for (let opt of list) {
    all[opt.tag] = await issueCert({ ...opt, pair });
  }
  return all;
}
