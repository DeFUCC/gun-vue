import { extractFromFile } from "gun-avatar"
import derivePair from '@gun-vue/gun-es/derive'
import { validateMnemonic, mnemonicToEntropy, entropyToMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

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
      result = await processQR(file)
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


export async function processQR(file) {

  if (!file || typeof file.type !== 'string' || !file.type.startsWith('image/')) {
    console.warn("Invalid file or file type is not an image. Received:", file ? file.type : file);
    return null;
  }

  try {

    const imageBitmap = await createImageBitmap(file);
    const { width, height } = imageBitmap;

    const canvas = typeof OffscreenCanvas !== 'undefined'
      ? new OffscreenCanvas(width, height)
      : document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D context from canvas.");
      imageBitmap.close();
      return null;
    }

    ctx.drawImage(imageBitmap, 0, 0);
    imageBitmap.close();

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    const binaryBitmap = new Array(height);
    const binarizationThreshold = 128;

    for (let y = 0; y < height; y++) {
      const row = new Array(width);
      const yOffset = y * width * 4;
      for (let x = 0; x < width; x++) {
        const pixelOffset = yOffset + x * 4;
        const r = pixels[pixelOffset];
        const g = pixels[pixelOffset + 1];
        const b = pixels[pixelOffset + 2];

        const gray = 0.299 * r + 0.587 * g + 0.114 * b;

        row[x] = gray < binarizationThreshold ? 1 : 0;
      }
      binaryBitmap[y] = row;
    }

    const qrLibBitmap = new Bitmap({ width, height });
    qrLibBitmap.data = binaryBitmap;

    return decodeQR(qrLibBitmap.toImage());

  } catch (error) {
    console.error("Error processing QR code:", error);
    return null;
  }
}