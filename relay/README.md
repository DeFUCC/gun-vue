### A simple Gun DB relay peer

A one liner gun js server easy to run on any free tier nodejs cloud like **[Glitch.com](https://glitch.com/~etogun)**, www.heroku.com or others, on a private VPS server or any other device like RaspberryPi or simply an Android phone.

![@gun-vue logo](https://raw.githubusercontent.com/DeFUCC/gun-vue/master/app/public/media/svg/relay.svg)

### Run in a cloud for free

There's a plenty of cloud providers with free tiers suitable to the needs of running a Gun relay node.

- **[Remix a Glitch project now](https://glitch.com/~etogun)**

> More links to be added here later.

### Run on any device

All you need to run a Gun relay is a `NodeJS >=16.x` environment with `npm` package manager to import and run the script. It's already up and running in major clouds, but you may need to **[install NodeJS](https://nodejs.org/en/)** on your computer, or **[configure a RaspberryPi](https://dev.to/bogdaaamn/run-your-nodejs-application-on-a-headless-raspberry-pi-4jnn)**.

- **Computer**

  Open your terminal and check the version of Node with `node -v`. You may need to **[Install NodeJS](https://nodejs.org/en/)** or [update it](https://github.com/nvm-sh/nvm).

- **Android device**

  You can easily run NodeJS apps on an Android phone with **[Termux](https://f-droid.org/en/packages/com.termux/)** app. Consider installing it from **[F-Droid](https://f-droid.org)** to get the fresh and stable version.

- **RaspberryPi**

  Flash your image and **[configure your Pi](https://dev.to/bogdaaamn/run-your-nodejs-application-on-a-headless-raspberry-pi-4jnn)** to run a local Gun server

### How to use

1. Run this in the command line and follow the steps to create a new NodeJS project

```shell
npm init
```

2. Then install the package as a dependency

```shell
npm i @gun-vue/relay
```

3. Add this line to the generated `package.json` file

```json
"scripts": {
    "start": "node start.js"
  }
```

3. Create a `start.js` script and edit it as follows:
4. Import the `relay` and initiate it.

```js
import relay from "@gun-vue/relay";

relay.init();
```

5. Save the `start.js` and run it.

```shell
node start.js
```

You'll see the message from the relay server running with it's address to use as a Gun peer in your app:

```
Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!
AXE relay enabled!
Server started at http://localhost:4200/gun
Multicast on 233.255.255.255:8765
```

### You've got your Gun relay up and running!

### Options

You can use customize your server with an options object:

```js
relay.init({
  host: "localhost", // A host name used by the server to publish it's state to the graph. Set your peer URL without a protocol, like  'relay.some-site.com'
  port: 4200, // Gun server port. You may use a more standard 8080.
  store: false, // Put true if you want to have Gun store data on disk.
  path: "public", // A public directory to expose your app with the build in express server. Insert a path like '../app/dist'
});
```

The options may be also set with `.env` file. The defaults are:

```
RELAY_HOST="localhost"
RELAY_STORE=false
RELAY_PORT=4200
RELAY_PATH="public"
RELAY_QR=false
```
