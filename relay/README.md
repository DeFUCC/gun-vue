![@gun-vue logo](https://raw.githubusercontent.com/DeFUCC/gun-vue/master/app/public/media/svg/relay.svg)

# Gun-Vue: Relay

A simple gun.js relay peer for Node.js.

It enables decentralized peer-to-peer web apps built with [gun.js](https://github.com/amark/gun) to connect and synchronize data.

This package is part of [**Gun-Vue: The Peer-to-Peer Web App Toolkit**](https://github.com/DeFUCC/gun-vue)

## Platforms

 Installs on any device or service that runs Node.js:

- **Cloud Platforms**
  - [Heroku](https://www.heroku.com)
  - [Glitch](https://www.glitch.com)
- **Desktop**
  - Linux
  - MacOS
  - Windows
- **Raspberry Pi**
  - [Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/) ([Tutorial](https://dev.to/bogdaaamn/run-your-nodejs-application-on-a-headless-raspberry-pi-4jnn))
  - [Alpine Linux](https://www.alpinelinux.org/)
- **Android** (via [F-Droid Termux](https://f-droid.org/en/packages/com.termux/))

---
### Installation

#### Requirements
 - [Node.js >=16.x](https://nodejs.org/)
 - [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Instructions

1. Create a new Node.js project:

```shell
npm init -y
```

2. Install the Gun-Vue: Relay package as a dependency:

```shell
npm i @gun-vue/relay
```

3. Open `package.json` and add:

```json
"scripts": {
    "start": "node start.js"
  }
```

4. Create a `start.js` script and add the following:

```js
import relay from "@gun-vue/relay";

relay.init();
```

5. Start your Gun-Vue: Relay:

```shell
node start.js
```

You will see the following message:

```
Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!
AXE relay enabled!
Server started at http://localhost:8765/gun
Multicast on 233.255.255.255:8765
```

**Your Gun-Vue: Relay is up and running!**

---
#### Options

The relay can be customized with an options object by updating `start.js` with the following:

```js
relay.init({
	host: "localhost", // Domain or IP address where your relay is hosted (no 'http://')
	port: 8765, // The port your relay will listen on (e.g., 8080)
	store: false, // Use 'true' to enable persistent storage on disk
	path: "public", // Folder to serve static files (e.g., your front-end build)
});
```

Alternatively, create a `.env` file and add the following defaults:

```
RELAY_HOST="localhost"
RELAY_STORE=false
RELAY_PORT=8765
RELAY_PATH="public"
RELAY_QR=false
```
