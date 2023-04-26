import Gun from 'gun';

const window = {
  crypto: self.crypto,
  TextEncoder: self.TextEncoder,
  TextDecoder: self.TextDecoder,
  WebSocket: self.WebSocket,
  Gun,
}

export { Gun };
export { default as SEA } from 'gun/sea.js';

