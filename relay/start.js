import relay from "./server.js";
import 'dotenv/config'

relay.init({
  showQr: false,
  store: true,
  host: process.env.RELAY_HOST
});

