import { SEA } from "..";

import type { IPolicy, ISEAPair, LEX } from 'gun'

export interface CertOptions {
  pair: ISEAPair | { priv: string; pub: string; },
  tag: string,
  dot?: string,
  users?: string,
  personal?: boolean
}

export interface Policy {
  "*": string
  "."?: string
  "+"?: string
}

export async function issueCert({
  pair,
  tag = "word",
  dot = '',
  users = "*",
  personal = false,
}: CertOptions): Promise<string | void> {
  let policy: IPolicy = { "*": `${tag}` };
  if (dot) {
    policy["."] = dot as LEX;
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

export async function generateCerts({ pair, list = [] }: { pair: ISEAPair, list: CertOptions[] }): Promise<{ [key: string]: string | void }> {
  const all: { [k: string]: string | void } = {};
  for (let opt of list) {
    all[opt.tag] = await issueCert({ ...opt, pair });
  }
  return all;
}
