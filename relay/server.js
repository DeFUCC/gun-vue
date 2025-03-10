import express from "express";
import Gun from "gun";
import qr from "qrcode-terminal";
import ip from "ip";
import 'dotenv/config'
import setSelfAdjustingInterval from 'self-adjusting-interval';

/* global process */

const formatOutput = (label, value, color = '\x1b[0m') => {
  const pad = ' '.repeat(20 - label.length);
  return `${color}${label}${pad}: ${value}\x1b[0m`;
}

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
    console.log('\x1b[36m=== GUN-VUE RELAY SERVER ===\x1b[0m\n');

    var app = express();

    // Explicit root route handling
    app.get('/', (req, res) => {
      if (process?.sea?.isSea) {
        res.sendFile('index.html', { root: process.sea.getAsset(path) });
      } else {
        res.sendFile('index.html', { root: path });
      }
    });

    // Serve static files for other routes
    if (process?.sea?.isSea) {
      app.use(express.static(process.sea.getAsset(path)));
    } else {
      app.use(express.static(path));
    }

    let currentPort = parseInt(port);
    while (!(await testPort(currentPort))) {
      console.log(formatOutput('Port in use', `${currentPort}, trying next...`, '\x1b[33m'));
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
    const extLink = "https://" + host
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
      console.log(formatOutput('Connection opened', `(active: ${activeWires})`, '\x1b[32m'));
    });

    gun.on("bye", () => {
      activeWires -= 1;
      db.get("activeWires").put(activeWires);
      console.log(formatOutput('Connection closed', `(active: ${activeWires})`, '\x1b[33m'));
    });

    db.get("host").put(host);
    db.get("port").put(port);
    db.get("link").put(link);
    db.get("extLink").put(extLink);
    db.get("store").put(store);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    console.log(formatOutput('Internal URL', link + '/', '\x1b[32m'));
    console.log(formatOutput('External URL', extLink + '/', '\x1b[32m'));
    console.log(formatOutput('Gun peer', link + '/gun', '\x1b[32m'));
    console.log(formatOutput('Storage', store ? 'enabled' : 'disabled', store ? '\x1b[32m' : '\x1b[33m'));

    if (showQr != false) {
      console.log('\n\x1b[36m=== QR CODE ===\x1b[0m');
      qr.generate(link, { small: true });
      console.log('\x1b[36m===============\x1b[0m\n');
    }

    return { app, db };
  },
};
