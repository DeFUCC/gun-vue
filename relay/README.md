# Gun-Vue: Relay

<img src="https://raw.githubusercontent.com/DeFUCC/gun-vue/master/app/public/media/svg/relay.svg" alt="@gun-vue relay logo" width="400" />

[GitHub (/relay)](https://github.com/DeFUCC/gun-vue/tree/master/relay) •
[npm](https://www.npmjs.com/package/@gun-vue/relay) •
[Docs](https://gun-vue.js.org/packages/relay.html)
<br><br>
A simple [Gun](https://github.com/amark/gun) relay peer in Node.js.

This package is part of [**Gun-Vue: The Peer-to-Peer Web App Toolkit**](https://github.com/DeFUCC/gun-vue)

## How to Install

### Requirements

- [Node.js >=16.x](https://nodejs.org/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Instructions

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

4. Create a `start.js` script and add:

```js
import relay from "@gun-vue/relay";

relay.init();
```

5. Test the relay:

```shell
node start.js
```

```
Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!
AXE relay enabled!
Server started at http://localhost:4200/gun
Multicast on 233.255.255.255:8765
```

### Options

The relay can be customized with an options object by updating `start.js`:

```js
relay.init({
	host: "localhost", // Domain or IP address where your relay is hosted (no 'http://')
	port: 4200, // The port your relay will listen on (e.g., 8080)
	store: false, // Use 'true' to enable persistent storage on disk
	path: "public", // Folder to serve static files (e.g., your front-end build)
        showQr: "false", // Render a QR Code Link to the server
});
```

Alternatively, create a `.env` file and add the following defaults:

```
RELAY_HOST="localhost"
RELAY_STORE=false
RELAY_PORT=4200
RELAY_PATH="public"
RELAY_QR=false
```
