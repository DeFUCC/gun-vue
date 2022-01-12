![@gun-vue logo](https://raw.githubusercontent.com/DeFUCC/gun-vue/master/_public/media/svg/relay.svg)

# Simple Gun relay peer

A one liner gun js server to run in a free tier js hosting like www.glitch.com, www.heroku.com or others

## How to use

1. Install the package `npm i @gun-vue/relay`
2. Import it and initiate.

```js
import relay from "@gun-vue/relay";

relay.init();
```

3. You've got your Gun relay running!

## Options

You can use customize your server with an options object:

```js
relay.init({
  host: "localhost", // it's used to name the pulse timestamp of the server. Set your peer ule without a protocol, like  'relay.some-site.com'
  port: 4200, // gun server port. You may use a more standard 8080.
  store: false, // put true if you want to have Gun store data on disk.
  path: "public", // a public directory to expose your app with the express server. Insert a path like '../demo/dist'
});
```
