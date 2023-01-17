import { SEA } from "..";

import type { ISEAPair } from 'gun'

export interface CertOptions {
  pair: ISEAPair,
  tag: string,
  dot: string,
  users: string,
  personal: boolean
}

export async function issueCert({
  pair,
  tag = "word",
  dot = '',
  users = "*",
  personal = false,
}: CertOptions): Promise<string | void> {
  let policy = { "*": `${tag}` };
  if (dot) {
    policy["."] = dot;
  }
  if (personal) {
    policy["+"] = "*";
  }
  try {
    let cert = await SEA.certify(users, policy, pair);
    return cert;
  } catch (e) {
    console.log("cert error: ", e);
  }
}

export async function generateCerts({ pair, list = [] }: { pair: ISEAPair, list: CertOptions[] }): Promise<{ [key: string]: string }> {
  const all = {};
  for (let opt of list) {
    all[opt.tag] = await issueCert({ ...opt, pair });
  }
  return all;
}
