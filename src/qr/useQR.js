import decodeQR from 'qr/decode.js';
import { Bitmap } from 'qr';

export function useQR() {
  return {
    processFile
  }
}

async function processFile(file) {

  if (!/image.*/.test(file.type)) {
    console.log("File is not an image");
    return null;
  }

  try {
    const dataUrl = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

    const img = new Image();
    await new Promise(resolve => {
      img.onload = resolve;
      img.src = dataUrl;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { width, height, data } = imageData;

    const bitmapData = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        row.push(gray < 128 ? 1 : 0); // 1 for dark, 0 for light
      }
      bitmapData.push(row);
    }

    const bitmap = new Bitmap({ width, height });
    bitmap.data = bitmapData;
    const result = decodeQR(bitmap.toImage());
    return result
  } catch (error) {
    console.error("Error processing QR code:", error);
    return null;
  }
}