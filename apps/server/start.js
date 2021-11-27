const port = 4200;
const appName = "test";

const express = require("express");
const Gun = require("gun");
const path = require("path");
const app = express();
app.use(express.static(path.resolve(__dirname, "..", "/dist")));
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../dist/index.html"))
);

const server = app.listen(port);

var gun = Gun({ file: false, radisk: false, web: server });

let pulse = setInterval(() => {
  gun.get(appName).get("relay").get("pulse").put(Date.now());
}, 500);

console.log("Server started on port " + port + " with /gun");
