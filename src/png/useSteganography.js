import { ref } from 'vue'

export function useSteganography() {
  const error = ref(null)

  // Fibonacci hash function for better pixel distribution
  function getPixelPosition(index, width, height, seed = 2166136261) {
    const phi = (Math.sqrt(5) + 1) / 2 // golden ratio
    const hash = (seed + index * phi) % 1
    return Math.floor(hash * width * height)
  }

  async function processImage(source) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(ctx.getImageData(0, 0, canvas.width, canvas.height))
      }
      img.onerror = reject
      img.src = source instanceof File ? URL.createObjectURL(source) : source
    })
  }

  function embedData(imageData, data) {
    try {
      const message = JSON.stringify(data)
      const bytes = new TextEncoder().encode(message)
      const length = bytes.length
      const maxBytes = Math.floor((imageData.width * imageData.height - 2) / 2)

      if (length > maxBytes) {
        throw new Error(`Message too large (${length} > ${maxBytes} bytes)`)
      }

      const result = new Uint8ClampedArray(imageData.data)
      const seed = imageData.width * imageData.height // Use dimensions as seed

      // Store length using scattered pixels
      const lengthPos1 = getPixelPosition(0, imageData.width, imageData.height, seed) * 4 + 3
      const lengthPos2 = getPixelPosition(1, imageData.width, imageData.height, seed) * 4 + 3
      result[lengthPos1] = (length >> 8) & 0xFF
      result[lengthPos2] = length & 0xFF

      // Store data bytes in scattered positions
      for (let i = 0; i < length; i++) {
        const byte = bytes[i]
        const pos1 = getPixelPosition(i * 2 + 2, imageData.width, imageData.height, seed) * 4 + 3
        const pos2 = getPixelPosition(i * 2 + 3, imageData.width, imageData.height, seed) * 4 + 3
        result[pos1] = (result[pos1] & 0xF0) | ((byte >> 4) & 0x0F)
        result[pos2] = (result[pos2] & 0xF0) | (byte & 0x0F)
      }

      return new ImageData(result, imageData.width, imageData.height)
    } catch (e) {
      throw new Error('Embedding failed: ' + e.message)
    }
  }

  function extractData(imageData) {
    try {
      const data = new Uint8Array(imageData.data.buffer)
      const seed = imageData.width * imageData.height

      // Get length from scattered pixels
      const lengthPos1 = getPixelPosition(0, imageData.width, imageData.height, seed) * 4 + 3
      const lengthPos2 = getPixelPosition(1, imageData.width, imageData.height, seed) * 4 + 3
      const length = (data[lengthPos1] << 8) | data[lengthPos2]

      if (length <= 0 || length > (imageData.width * imageData.height - 2) / 2) {
        throw new Error('Invalid data length')
      }

      // Extract bytes from scattered positions
      const bytes = new Uint8Array(length)
      for (let i = 0; i < length; i++) {
        const pos1 = getPixelPosition(i * 2 + 2, imageData.width, imageData.height, seed) * 4 + 3
        const pos2 = getPixelPosition(i * 2 + 3, imageData.width, imageData.height, seed) * 4 + 3
        bytes[i] = ((data[pos1] & 0x0F) << 4) | (data[pos2] & 0x0F)
      }

      const text = new TextDecoder().decode(bytes)
      return JSON.parse(text)
    } catch (e) {
      throw new Error('Extraction failed: ' + e.message)
    }
  }

  async function embedInBase64(base64Image, data) {
    try {
      const imageData = await processImage(base64Image)
      const embedded = embedData(imageData, data)
      const canvas = document.createElement('canvas')
      canvas.width = embedded.width
      canvas.height = embedded.height
      const ctx = canvas.getContext('2d')
      ctx.putImageData(embedded, 0, 0)
      return canvas.toDataURL('image/png')
    } catch (e) {
      error.value = e.message
      return null
    }
  }

  async function extractFromFile(file) {
    try {
      const imageData = await processImage(file)
      return extractData(imageData)
    } catch (e) {
      error.value = e.message
      return null
    }
  }

  return {
    error,
    embedInBase64,
    extractFromFile
  }
}
