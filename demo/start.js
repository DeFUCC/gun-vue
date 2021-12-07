var relay = require("@gun-vue/relay");

const { app, db } = relay.init(null, 8080, "dist");
