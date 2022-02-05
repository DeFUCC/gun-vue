import { SEA } from "..";

export async function issueCert({
  tag = "word",
  pair,
  users = "*",
  hashed = false,
  personal = false,
} = {}) {
  let path = { "*": `${hashed ? "#" : ""}${tag}` };
  if (personal) {
    path["+"] = "*";
  }
  try {
    let cert = await SEA.certify(users, path, pair);
    console.log(cert);
    return cert;
  } catch (e) {
    console.log("cert error: ", e);
  }
}

window.issueCert = issueCert;
