import { ref } from 'vue'
import extract from 'png-chunks-extract'
import encode from 'png-chunks-encode'
import text from 'png-chunk-text'

// "png-chunks-extract": "1.0.0",
//   "png-chunks-encode": "1.0.0",
//     "png-chunk-text": "1.0.0",

export function usePNGChunks() {
  const error = ref(null)

  async function embedInBase64(base64Image, data) {
    try {
      // Convert base64 to array buffer
      const response = await fetch(base64Image)
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      // Extract chunks and add new text chunk
      const chunks = extract(buffer)
      chunks.splice(-1, 0, text.encode('message', JSON.stringify(data)))

      // Encode chunks back to PNG
      const newBuffer = encode(chunks)
      const newBlob = new Blob([newBuffer], { type: 'image/png' })
      return URL.createObjectURL(newBlob)
    } catch (e) {
      error.value = e.message
      return null
    }
  }

  async function extractFromFile(file) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const chunks = extract(buffer)
      const textChunks = chunks
        .filter(chunk => chunk.name === 'tEXt')
        .map(chunk => text.decode(chunk.data))

      const messageChunk = textChunks.find(chunk => chunk.keyword === 'message')
      return messageChunk ? JSON.parse(messageChunk.text) : null
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
