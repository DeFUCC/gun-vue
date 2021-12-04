import { gun, SEA } from "./gun";

export async function getShortHash(text) {
  return await SEA.work(text, appPath, null, { name: "SHA-1", encode: "hex" });
}

export async function hashObj(obj) {
  let text = JSON.stringify(obj);
  let hash = await SEA.work(text, null, null, { name: "SHA-256" });
  return { text, hash };
}

export async function addHashedPersonal(tag, obj, pub) {
  let certificate = await gun.get(`~${pub}`).get("cert").get(tag).then();
  console.log(certificate);
  const { text, hash } = await hashObj(obj);

  gun
    .get(`~${pub}`)
    .get(`#${tag}`)
    .get(`${hash}#${account.is.pub}`)
    .put(
      text,
      () => {
        if (linkFrom.value) {
          link({ hash, tag, data: obj });
        }
      },
      { opt: { cert: certificate } }
    );
}

// Buffer -> Base64 String -> Url Safe Base64 String
export function safeHash(unsafe) {
  if (!unsafe) return;
  const encode_regex = /[\+=\/]/g;
  return unsafe.replace(encode_regex, encodeChar);
}

function encodeChar(c) {
  switch (c) {
    case "+":
      return "-";
    case "=":
      return ".";
    case "/":
      return "_";
  }
}

// Url Safe Base64 String -> Base64 String -> Buffer
export function unsafeHash(safe) {
  if (!safe) return;
  const decode_regex = /[\._\-]/g;
  return safe.replace(decode_regex, decodeChar);
}

function decodeChar(c) {
  switch (c) {
    case "-":
      return "+";
    case ".":
      return "=";
    case "_":
      return "/";
  }
}

export function safeJSONParse(input, def) {
  // Convert null to empty object
  if (!input) {
    return def || {};
  } else if (Object.prototype.toString.call(input) === "[object Object]") {
    return input;
  }
  try {
    return JSON.parse(input);
  } catch (e) {
    return def || {};
  }
}
