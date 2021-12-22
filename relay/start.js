import relay from "./server.js";

relay.init({
  host: "localhost",
  store: false,
  public: "../demo/dist",
});
