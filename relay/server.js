function init(url = "etogun.glitch.me") {
  var port = 4200;
  var express = require("express");
  var Gun = require("gun");
  var path = require("path");
  var os = require("os");

  var app = express();
  //app.use(Gun.serve);
  app.use(express.static(__dirname + "/public"));
  app.use("public", express.static(path.join(__dirname, "public")));
  app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
  var server = app.listen(port);

  const gun = Gun({ file: false, radisk: false, web: server });

  const relay = gun.get(url);
  relay.get("started").put(Date.now());

  relay.get("host").put(os.hostname());

  let pulse = setInterval(() => {
    relay.get("pulse").put(Date.now());
  }, 500);

  console.log("Server started on port " + port + " with /gun");
}

module.exports.init = init;

init();
