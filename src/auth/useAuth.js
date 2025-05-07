import { extractFromFile } from "gun-avatar"
import derivePair from '@gun-vue/gun-es/derive'
import { validateMnemonic, mnemonicToEntropy, entropyToMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

import { useQR } from '../composables'

const auth_url = "#/auth/"

export function genLink(text = "") {
  let base = encodeURIComponent(text);
  return window.location.origin + window.location.pathname + auth_url + base;
}

export async function parseKey(p) {
  if (!p) return false
  if (typeof p == 'string') {
    if (p.includes(auth_url)) {
      p = decodeURIComponent(link.substring(link.indexOf(auth_url) + auth_url.length))
    }
    if (p.substring(0, 3) == 'SEA') {
      return ''
    }
    if (validateMnemonic(p.trim(), wordlist)) {
      const entropy = mnemonicToEntropy(p.trim(), wordlist)
      p = await derivePair(btoa(String.fromCharCode(...entropy)))
    }
    if (typeof p == 'string') {
      p = JSON.parse(p)
    }
  }

  if (p?.pub && p?.priv) {
    return p
  } else {
    return null
  }
}


export async function handleAuthFile(file, pair) {
  if (!file) return false
  const type = file.type.toLowerCase()
  let result = null
  try {
    if (type === 'application/json' || file.name.endsWith('.webkey')) {
      result = await uploadText(file)
    } else if (type === 'image/png' || type === 'image/svg+xml') {
      const data = await extractFromFile(file)
      if (data?.content) result = data.content
    } else if (type.startsWith('image/')) {
      const { processFile } = useQR()
      result = await processFile(file)
    }
  } catch (e) {
    console.error('Failed to extract auth data from file:', e)
  }

  return result
}

async function uploadText(file) {
  if (!file || file.size > 20_000_000) {
    console.error("File is missing or too big");
    return;
  }
  return await new Promise((res, rej) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => res(reader.result),
      onerror: rej
    });
    reader.readAsText(file);
  });
};