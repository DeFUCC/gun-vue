### How to run a relay

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
Server started at http://localhost:8765/gun
Multicast on 233.255.255.255:8765
```

### You've got your Gun relay up and running!
