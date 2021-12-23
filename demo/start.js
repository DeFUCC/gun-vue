var relay = require("@gun-vue/relay");

relay.init({
  host: "localhost",
  store: false,
  public: "dist",
});
