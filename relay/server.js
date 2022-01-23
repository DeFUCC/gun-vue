import express from "express";
import Gun from "gun";
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
    console.log("----------");
    qr.generate(link);
    console.log("----------");
    return { app, db };
  },
};
