### Relay pptions

You can use customize your server with an options object:

```js
relay.init({
	host: "localhost", // A host name used by the server to publish it's state to the graph. Set your peer URL without a protocol, like  'relay.some-site.com'
	port: 8765, // Gun server port. You may use a more standard 8080.
	store: false, // Put true if you want to have Gun store data on disk.
	path: "public", // A public directory to expose your app with the build in express server. Insert a path like '../app/dist'
});
```

The options may be also set with `.env` file. The defaults are:

```
RELAY_HOST="localhost"
RELAY_STORE=false
RELAY_PORT=8765
RELAY_PATH="public"
RELAY_QR=false
```
