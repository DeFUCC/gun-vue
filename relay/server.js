import express from "express";
import Gun from "gun";
import qr from "qrcode-terminal";
import ip from "ip";
import 'dotenv/config'
import setSelfAdjustingInterval from 'self-adjusting-interval';

/* global process */

const testPort = (port) => {
  return new Promise((resolve, reject) => {
    const server = express().listen(port, () => {
      server.close(() => resolve(true));
    }).on('error', () => resolve(false));
  });
};

export default {
  initiated: false,
  async init(config = {}) {
    if (this.initiated) return;
    this.initiated = true;

    let {
      host = process.env.RELAY_HOST || ip.address(),
      store = process.env.RELAY_STORE || false,
      port = process.env.RELAY_PORT || 8765,
      path = process.env.RELAY_PATH || "public",
      showQr = process.env.RELAY_QR || false
    } = config;

    console.clear();
    console.log('=== GUN-VUE RELAY SERVER ===\n');

    var app = express();

    // Explicit root route handling
    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: path });
    });

    app.use(express.static(path));

    let currentPort = parseInt(port);
    while (!(await testPort(currentPort))) {
      console.log(`Port ${currentPort} in use, trying next...`);
      currentPort++;
    }

    var server = app.listen(currentPort);
    port = currentPort; // Update port for later use

    const gun = Gun({
      super: false,
      file: "store",
      radisk: store,
      web: server,
    });

    const link = "http://" + host + (port ? ":" + port : "");
    const extLink = "https://" + host;
    let totalConnections = 0;
    let activeWires = 0;

    const db = gun.get('relays').get(host);

    setSelfAdjustingInterval(() => {
      db.get("pulse").put(Date.now());
    }, 500);

    gun.on("hi", () => {
      totalConnections += 1;
      db.get("totalConnections").put(totalConnections);
      activeWires += 1;
      db.get("activeWires").put(activeWires);
      console.log(`Connection opened (active: ${activeWires})`);
    });

    gun.on("bye", () => {
      activeWires -= 1;
      db.get("activeWires").put(activeWires);
      console.log(`Connection closed (active: ${activeWires})`);
    });

    db.get("host").put(host);
    db.get("port").put(port);
    db.get("link").put(link);
    db.get("ext-ink").put(extLink);
    db.get("store").put(store);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    console.log(`Internal URL: ${link}/`);
    console.log(`External URL: ${extLink}/`);
    console.log(`Gun peer: ${link}/gun`);
    console.log(`Storage: ${store ? 'enabled' : 'disabled'}`);

    if (showQr != false) {
      console.log('\n=== QR CODE ===');
      qr.generate(link, { small: true });
      console.log('===============\n');
    }

    return { app, db };
  },
};