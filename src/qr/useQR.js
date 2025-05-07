import decodeQR from 'qr/decode.js';
import { Bitmap } from 'qr'; // Assuming this is from a library like 
export function useQR() {
  return {
    processFile
  };
}

async function processFile(file) {

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