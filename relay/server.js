var express = require("express");
var Gun = require("gun");
var path = require("path");

const relay = {
  initiated: false,

  init(host = "localhost", port = 4200) {
    if (relay.initiated) return;
    relay.initiated = true;
    var app = express();
    app.use(express.static("public"));
    var server = app.listen(port);

    const gun = Gun({ file: false, radisk: false, web: server });

    const db = gun.get(host);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    let pulse = setInterval(() => {
      db.get("pulse").put(Date.now());
    }, 500);

    console.log("Server started at " + host + ":" + port + "/gun");
  },
};

module.exports = relay;
