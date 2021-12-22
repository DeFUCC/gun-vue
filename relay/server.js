import express from "express";
import Gun from "gun";
// require("zenbase/src/index.js");

export default {
  initiated: false,
  init({
    host = "localhost",
    store = false,
    port = 4200,
    path = "public",
  } = {}) {
    if (this.initiated) return;
    this.initiated = true;
    var app = express();
    var server = app.listen(port);

    const gun = Gun({
      file: "store",
      radisk: store,
      web: server,
      // secret: "gun-vue-demo",
      // portal: "https://siasky.net",
      // debug: true,
      // until: 2 * 1000,
    });
    app.use(express.static(path));
    const db = gun.get(host);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    let pulse = setInterval(() => {
      db.get("pulse").put(Date.now());
    }, 500);

    console.log("Server started at " + host + ":" + port + "/gun");

    return { app, db };
  },
};
