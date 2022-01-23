import express from "express";
import Gun from "gun";
import "zenbase";
import qr from "qrcode-terminal";
import ip from "ip";

export default {
  initiated: false,
  init({ host, store = false, port = 4200, path = "public" } = {}) {
    if (this.initiated) return;
    this.initiated = true;

    if (!host) host = ip.address();

    var app = express();
    var server = app.listen(port);

    const gun = Gun({
      file: "store",
      radisk: store,
      web: server,
      secret: "gun-vue-demo",
      portal: "https://siasky.net",
      debug: false,
      until: 2 * 1000,
    });
    app.use(express.static(path));
    const db = gun.get(host);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    let pulse = setInterval(() => {
      db.get("pulse").put(Date.now());
    }, 500);
    let link = "http://" + host + ":" + port;
    console.log("Server started at " + link + "/gun");
    qr.generate(link);
    return { app, db };
  },
};
