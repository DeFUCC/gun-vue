import relay from "./server.js";

relay.init({
  host: "localhost",
  store: false,
  path: "../demo/dist",
});
