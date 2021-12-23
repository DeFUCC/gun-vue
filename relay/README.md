![@gun-vue logo](https://raw.githubusercontent.com/davay42/gun-vue/master/demo/public/gun-vue-logo.svg)

# Simple Gun relay peer

A one liner gun js server to run in a free tier js hosting like www.glitch.com, www.heroku.com or others

## How to use

1. Install the package `npm i @gun-vue/relay`
2. Import it and initiate.

```
import relay from "@gun-vue/relay";

relay.init();
```

3. You've got your Gun relay running!

## Options

You can use customize your server with an options object:

```
relay.init({
  host: "your.relay.url", // it's used to name the pulse timestamp of the server. Default is 'localhost'
  port: 4000, // gun server port
  store: false, // put true if you want to have Gun store data on disk
  public: "../demo/dist", // a public dir to expose your app with the express server
})

```
