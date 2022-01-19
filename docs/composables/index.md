![](/media/svg/composables.svg)

## Composables

### How to install?

```shell
pnpm i @gun-vue/composables
```

### How to use?

```js
import { useUser } from "@gun-vue/composables";

const user = useUser();
```


## Modules

<dl>
<dt><a href="#module_Account">Account</a></dt>
<dd><p>Basic account management</p>
</dd>
<dt><a href="#module_Crypto">Crypto</a></dt>
<dd><p>SEA cryptography abstraction</p>
</dd>
<dt><a href="#module_Feeds">Feeds</a></dt>
<dd><p>Immutable hashed lists of data</p>
</dd>
<dt><a href="#module_File">File</a></dt>
<dd><p>File handling functions</p>
</dd>
<dt><a href="#module_Gun">Gun</a></dt>
<dd><p>Gun DB initialization and basic methods</p>
</dd>
<dt><a href="#module_Hash">Hash</a></dt>
<dd><p>Working with hashes</p>
</dd>
<dt><a href="#module_DataTree">DataTree</a></dt>
<dd><p>Reactive version of <code>gun-util</code> Date tree</p>
</dd>
<dt><a href="#module_Passphrase">Passphrase</a></dt>
<dd></dd>
<dt><a href="#module_Post">Post</a></dt>
<dd><p>Get and handle a particular post by it&#39;s tag and hash</p>
</dd>
<dt><a href="#module_Relay">Relay</a></dt>
<dd></dd>
<dt><a href="#module_User">User</a></dt>
<dd><p>Basic user management</p>
</dd>
<dt><a href="#module_Worker">Worker</a></dt>
<dd></dd>
<dt><a href="#module_useZip">useZip</a></dt>
<dd><p>Read and write zip files</p>
</dd>
</dl>

<a name="module_Account"></a>

## Account
Basic account management


* [Account](#module_Account)
    * _static_
        * [.useAccount(pub)](#module_Account.useAccount) ⇒ <code>Account</code>
    * _inner_
        * [~Account](#module_Account..Account) : <code>Object</code>

<a name="module_Account.useAccount"></a>

### Account.useAccount(pub) ⇒ <code>Account</code>
Load and handle user's account by a public key

**Kind**: static method of [<code>Account</code>](#module_Account)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>pub</td><td><code>ref</code></td><td><p>The public key of a user as a string or a ref</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
import { useAccount } from '@gun-vue/composables'

const pub = 'XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc'

const { account } = useAccount(pub)
```
<a name="module_Account..Account"></a>

### Account~Account : <code>Object</code>
the user account interface

**Kind**: inner typedef of [<code>Account</code>](#module_Account)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>pub</td><td><code>Ref</code></td><td><p>The pub key used to build the account</p>
</td>
    </tr><tr>
    <td>color</td><td><code>Computed</code></td><td><p>The user account color derived from the pub key</p>
</td>
    </tr><tr>
    <td>profile</td><td><code>Object</code></td><td><p>An object with all the <code>gun.user().get(&#39;profile&#39;)</code> data</p>
</td>
    </tr><tr>
    <td>pulse</td><td><code>Number</code></td><td><p>latest timestamp from the user. It&#39;s emitted every second. Offline timeout is set to 10 seconds.</p>
</td>
    </tr><tr>
    <td>blink</td><td><code>Boolean</code></td><td><p>A boolean that toggles on every timestamp received</p>
</td>
    </tr><tr>
    <td>lastSeen</td><td><code>Sting</code></td><td><p>Shows &#39;online&#39; if recent pulse is less then 10s ago or a human readable time string</p>
</td>
    </tr><tr>
    <td>db</td><td><code>gun</code></td><td><p><code>gun.user(pub)</code> ref to query any additional user data</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
{
"pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc",
"color": "#f55c3d",
"profile": {
   "name": "Accord",
   "Message": "Use your imagination!",
   "Money": "$ 20000000000"
},
"pulse": 1642077216809,
"lastSeen": "online",
"blink": true
}
```
<a name="module_Crypto"></a>

## Crypto
SEA cryptography abstraction


* [Crypto](#module_Crypto)
    * _static_
        * [.encFor(data, sender, receiver)](#module_Crypto.encFor) ⇒ <code>String</code>
        * [.decFrom(data, sender, receiver)](#module_Crypto.decFrom) ⇒ <code>String</code>
    * _inner_
        * [~Entity](#module_Crypto..Entity) : <code>Object</code>

<a name="module_Crypto.encFor"></a>

### Crypto.encFor(data, sender, receiver) ⇒ <code>String</code>
Encrypt data for one receiver entity
1. Generates encryption secret using bob's epub and current user pair
2. Enctypts data with this secret

**Kind**: static method of [<code>Crypto</code>](#module_Crypto)  
**Returns**: <code>String</code> - Encrypted data string to be sent  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>data</td><td><code>String</code></td><td><p>Stringified data to be encrypted</p>
</td>
    </tr><tr>
    <td>sender</td><td><code>Entity</code></td><td><p>An object with <code>pub</code> and <code>epub</code> strings - the user.is object of the reciever&#39;s account</p>
</td>
    </tr><tr>
    <td>receiver</td><td><code>SEAPair</code></td><td><p>SEA Pair of the sender – <code>epriv</code> key will be used to encrypt the data</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Crypto.decFrom"></a>

### Crypto.decFrom(data, sender, receiver) ⇒ <code>String</code>
Decrypt a private message from an entity
1. Generates secret using senders `epub` and current user pair
2. Decrypts the data with this secret

**Kind**: static method of [<code>Crypto</code>](#module_Crypto)  
**Returns**: <code>String</code> - Decrypted data  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>data</td><td><code>String</code></td><td><p>Encrypted private data</p>
</td>
    </tr><tr>
    <td>sender</td><td><code>Entity</code></td><td><p>An object with <code>pub</code> and <code>epub</code> strings - the user.is object of the sender&#39;s account</p>
</td>
    </tr><tr>
    <td>receiver</td><td><code>SEAPair</code></td><td><p>SEA Pair of the receiver – <code>epriv</code> key will be used to encrypt the data</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Crypto..Entity"></a>

### Crypto~Entity : <code>Object</code>
**Kind**: inner typedef of [<code>Crypto</code>](#module_Crypto)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>pub</td><td><code>String</code></td><td><p>the public key</p>
</td>
    </tr><tr>
    <td>epub</td><td><code>String</code></td><td><p>the elliplic encryption epub</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Feeds"></a>

## Feeds
Immutable hashed lists of data


* [Feeds](#module_Feeds)
    * _static_
        * [.useFeeds()](#module_Feeds.useFeeds) ⇒ <code>useFeeds</code>
        * [.useFeed(tag)](#module_Feeds.useFeed) ⇒ <code>useFeed</code>
        * [.exportFeed(tag, posts)](#module_Feeds.exportFeed)
        * [.exportFeedZip(tag, posts)](#module_Feeds.exportFeedZip)
        * [.importFeedZip(tag, files)](#module_Feeds.importFeedZip)
        * [.importFeed(tag, event)](#module_Feeds.importFeed)
    * _inner_
        * [~useFeeds](#module_Feeds..useFeeds)
        * [~useFeed](#module_Feeds..useFeed)

<a name="module_Feeds.useFeeds"></a>

### Feeds.useFeeds() ⇒ <code>useFeeds</code>
Toolkit to deal with the available tags

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  
<a name="module_Feeds.useFeed"></a>

### Feeds.useFeed(tag) ⇒ <code>useFeed</code>
Use a list of immutable data from a #tag

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tag</td><td><code>ref</code></td><td><p>A vue ref to watch - generated from props by <code>toRef(props,&#39;tag&#39;)</code></p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Feeds.exportFeed"></a>

### Feeds.exportFeed(tag, posts)
Export the feed as a Markdown .md file

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tag</td><td><code>String</code></td>
    </tr><tr>
    <td>posts</td><td><code>Object</code></td>
    </tr>  </tbody>
</table>

<a name="module_Feeds.exportFeedZip"></a>

### Feeds.exportFeedZip(tag, posts)
Export a list of posts as a zip file

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tag</td><td><code>String</code></td><td><p>Name of the tag</p>
</td>
    </tr><tr>
    <td>posts</td><td><code>Object</code></td><td><p>Posts to export</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
import {exportFeedZip} from '@gun-vue/components'
exportFeedZip('myTag',posts)
```
<a name="module_Feeds.importFeedZip"></a>

### Feeds.importFeedZip(tag, files)
Upload zip files and add all the MD files from it to the tag

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tag</td><td><code>String</code></td><td><p>a tag to add the posts to</p>
</td>
    </tr><tr>
    <td>files</td><td><code>FileList</code></td><td><p>File list from the input <code>@change</code> event</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```html
<input type="file" @change="importFeedZip( 'myTag', $event.target.files )" />
```
<a name="module_Feeds.importFeed"></a>

### Feeds.importFeed(tag, event)
Import feed from a markdown file

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tag</td><td><code>String</code></td><td></td>
    </tr><tr>
    <td>event</td><td><code>Event</code></td><td><p>the event from the file input</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Feeds..useFeeds"></a>

### Feeds~useFeeds
**Kind**: inner typedef of [<code>Feeds</code>](#module_Feeds)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>search</td><td><code>ref</code></td><td><p>a ref to bind to an input element</p>
</td>
    </tr><tr>
    <td>slug</td><td><code>computed</code></td><td><p>a slugified search query - url safe verion to be used as a tag</p>
</td>
    </tr><tr>
    <td>tags</td><td><code>Tags</code></td><td><p>the object to handle all the tags</p>
</td>
    </tr><tr>
    <td>addTag</td><td><code>function</code></td><td><p>add a slug tag to the list</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Feeds..useFeed"></a>

### Feeds~useFeed
**Kind**: inner typedef of [<code>Feeds</code>](#module_Feeds)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>list</td><td><code>reactive</code></td><td><p>the reactive list of hashed data</p>
</td>
    </tr><tr>
    <td>addToTag</td><td><code>function</code></td><td><p>stringifies an object and puts it into an immutable #tag graph</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_File"></a>

## File
File handling functions


* [File](#module_File)
    * _static_
        * [.createMd(md)](#module_File.createMd) ⇒
        * [.parseMd(file)](#module_File.parseMd) ⇒ <code>Md</code>
        * [.downloadFile(text, fileType, fileName)](#module_File.downloadFile)
        * [.uploadText(event, callback)](#module_File.uploadText)
        * [.usePictureUpload(Options)](#module_File.usePictureUpload) ⇒ <code>PictureUploadData</code>
    * _inner_
        * [~PictureUploadOptions](#module_File..PictureUploadOptions) : <code>Object</code>
        * [~PictureUploadData](#module_File..PictureUploadData) : <code>Object</code>

<a name="module_File.createMd"></a>

### File.createMd(md) ⇒
Create markdown with frontmatter

**Kind**: static method of [<code>File</code>](#module_File)  
**Returns**: Markdown file ready to download  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>md</td><td><code>Object</code></td><td><p>frontmatter,content</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_File.parseMd"></a>

### File.parseMd(file) ⇒ <code>Md</code>
Parse text content of a markdown file into an object

**Kind**: static method of [<code>File</code>](#module_File)  
**Returns**: <code>Md</code> - - An object with md frontmatter and content  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>file</td><td><code>String</code></td><td><p>Text form of an uploaded file</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_File.downloadFile"></a>

### File.downloadFile(text, fileType, fileName)
A method to download any text as a file

**Kind**: static method of [<code>File</code>](#module_File)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>text</td><td><code>String</code></td><td><p>the text to download</p>
</td>
    </tr><tr>
    <td>fileType</td><td><code>String</code></td><td><p>the file type like &quot;application/json&quot;</p>
</td>
    </tr><tr>
    <td>fileName</td><td><code>String</code></td><td><p>the full file name like &quot;myKey.json&quot;</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_File.uploadText"></a>

### File.uploadText(event, callback)
Upload and parse JSON keypair

**Kind**: static method of [<code>File</code>](#module_File)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>event</td><td><code>Event</code></td><td><p><code>$event</code> from the <code>@change</code> handler</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>a function to handle the loaded file from the reader</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_File.usePictureUpload"></a>

### File.usePictureUpload(Options) ⇒ <code>PictureUploadData</code>
Process an uploaded picture by rendering in into a canvas with given size. Returns a base64 encoded image to be stored and displayed as `img.src`

**Kind**: static method of [<code>File</code>](#module_File)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>Options</td><td><code>PictureUploadOptions</code></td><td><p>uploader options</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const src = ref(null)

const {state, handleUpload} = usePictureUpload({
 preserveRatio: true,
})

watch(()=>state.output, file => src.value = file.content)
```
<a name="module_File..PictureUploadOptions"></a>

### File~PictureUploadOptions : <code>Object</code>
**Kind**: inner typedef of [<code>File</code>](#module_File)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>preserveRatio</td><td><code>Boolean</code></td><td><p>should we preserve the original picture aspect ratio? Default: <code>false</code></p>
</td>
    </tr><tr>
    <td>picSize</td><td><code>Number</code></td><td><p>width of the rendered picture</p>
</td>
    </tr><tr>
    <td>maxSize</td><td><code>Number</code></td><td><p>maximum size of an uploaded picture</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_File..PictureUploadData"></a>

### File~PictureUploadData : <code>Object</code>
**Kind**: inner typedef of [<code>File</code>](#module_File)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>reactive</code></td><td><p>a reactive object with the state of the upload</p>
</td>
    </tr><tr>
    <td>handleUpload</td><td><code>function</code></td><td><p>handler function to use with <code>@change=&quot;handleUpload&quot;</code> on an <code>&lt;input type=&quot;file&quot;&gt;</code> element</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Gun"></a>

## Gun
Gun DB initialization and basic methods


* [Gun](#module_Gun)
    * _static_
        * [.gun](#module_Gun.gun)
        * [.gun2](#module_Gun.gun2)
    * _inner_
        * [~SEA](#module_Gun..SEA)
        * [~soul()](#module_Gun..soul)
        * [~genUUID()](#module_Gun..genUUID)

<a name="module_Gun.gun"></a>

### Gun.gun
Established Gun instance for database operations

**Kind**: static property of [<code>Gun</code>](#module_Gun)  
<a name="module_Gun.gun2"></a>

### Gun.gun2
Secondary Gun instance for key management

**Kind**: static property of [<code>Gun</code>](#module_Gun)  
<a name="module_Gun..SEA"></a>

### Gun~SEA
SEA library

**Kind**: inner constant of [<code>Gun</code>](#module_Gun)  
<a name="module_Gun..soul"></a>

### Gun~soul()
**Get a soul for any given node**
A wrapper for `Gun.node.soul`

**Kind**: inner method of [<code>Gun</code>](#module_Gun)  
<a name="module_Gun..genUUID"></a>

### Gun~genUUID()
**Generate a random UUID**
A wrapper for `Gun.text.random`

**Kind**: inner method of [<code>Gun</code>](#module_Gun)  
<a name="module_Hash"></a>

## Hash
Working with hashes

<a name="module_Hash.getShortHash"></a>

### Hash.getShortHash(text, seed) ⇒ <code>String</code>
Calculate a hex hash for any string data

**Kind**: static method of [<code>Hash</code>](#module_Hash)  
**Returns**: <code>String</code> - The hex encoded SHA-1 hash  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>text</td><td><code>String</code></td>
    </tr><tr>
    <td>seed</td><td><code>String</code></td>
    </tr>  </tbody>
</table>

<a name="module_DataTree"></a>

## DataTree
Reactive version of `gun-util` Date tree

<a name="module_Passphrase"></a>

## Passphrase
<a name="module_Post"></a>

## Post
Get and handle a particular post by it's tag and hash


* [Post](#module_Post)
    * _static_
        * [.useTagPost(tag, hash)](#module_Post.useTagPost) ⇒ <code>Post</code>
    * _inner_
        * [~Post](#module_Post..Post) : <code>Object</code>

<a name="module_Post.useTagPost"></a>

### Post.useTagPost(tag, hash) ⇒ <code>Post</code>
**Kind**: static method of [<code>Post</code>](#module_Post)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tag</td><td><code>String</code></td>
    </tr><tr>
    <td>hash</td><td><code>String</code></td>
    </tr>  </tbody>
</table>

<a name="module_Post..Post"></a>

### Post~Post : <code>Object</code>
**Kind**: inner typedef of [<code>Post</code>](#module_Post)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>empty</td><td><code>Boolean</code></td><td><p>whether the post has contents</p>
</td>
    </tr><tr>
    <td>tag</td><td><code>String</code></td><td><p>the tag under which the post was published</p>
</td>
    </tr><tr>
    <td>hash</td><td><code>String</code></td><td><p>the hash of the contents</p>
</td>
    </tr><tr>
    <td>data</td><td><code>Object</code></td><td><p>the contents of the post</p>
</td>
    </tr><tr>
    <td>download</td><td><code>function</code></td><td><p>use this function to download the post as a Markdown file</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Relay"></a>

## Relay

* [Relay](#module_Relay)
    * _static_
        * [.useRelay(host)](#module_Relay.useRelay) ⇒ <code>Relay</code>
    * _inner_
        * [~Relay](#module_Relay..Relay) : <code>reactive</code>

<a name="module_Relay.useRelay"></a>

### Relay.useRelay(host) ⇒ <code>Relay</code>
Peer server status monitor

**Kind**: static method of [<code>Relay</code>](#module_Relay)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>host</td><td><code>URL</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
const relay = useRelay()
```
<a name="module_Relay..Relay"></a>

### Relay~Relay : <code>reactive</code>
Peer server status reactive object

**Kind**: inner typedef of [<code>Relay</code>](#module_Relay)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>host</td><td><code>String</code></td><td><p>the current peer server URL</p>
</td>
    </tr><tr>
    <td>status</td><td><code>String</code></td><td><p>current connection status</p>
</td>
    </tr><tr>
    <td>started</td><td><code>Number</code></td><td><p>the timestamp of server started current session</p>
</td>
    </tr><tr>
    <td>pulse</td><td><code>Number</code></td><td><p>last received timestamp</p>
</td>
    </tr><tr>
    <td>lag</td><td><code>Number</code></td><td><p>drift of the timestamp in ms</p>
</td>
    </tr><tr>
    <td>diff</td><td><code>Number</code></td><td><p>age of the session in ms</p>
</td>
    </tr><tr>
    <td>age</td><td><code>String</code></td><td><p>age of the session in human readable format</p>
</td>
    </tr><tr>
    <td>blink</td><td><code>Boolean</code></td><td><p>a Boolean toggled every time the new pulse comes to drive animations</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_User"></a>

## User
Basic user management


* [User](#module_User)
    * _static_
        * [.useUser()](#module_User.useUser) ⇒ <code>useUser</code>
        * [.auth(pair)](#module_User.auth)
        * [.leave()](#module_User.leave)
        * [.updateProfile(field, data)](#module_User.updateProfile)
        * [.isPair(pair)](#module_User.isPair) ⇒ <code>Boolean</code>
    * _inner_
        * [~User](#module_User..User)
        * [~useUser](#module_User..useUser)

<a name="module_User.useUser"></a>

### User.useUser() ⇒ <code>useUser</code>
Get access to current logged in user

**Kind**: static method of [<code>User</code>](#module_User)  
<a name="module_User.auth"></a>

### User.auth(pair)
Authenticate with a SEA key pair

**Kind**: static method of [<code>User</code>](#module_User)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>pair</td><td><code>Object</code></td>
    </tr>  </tbody>
</table>

<a name="module_User.leave"></a>

### User.leave()
Log out the user

**Kind**: static method of [<code>User</code>](#module_User)  
<a name="module_User.updateProfile"></a>

### User.updateProfile(field, data)
Update a profile field

**Kind**: static method of [<code>User</code>](#module_User)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>field</td><td><code>String</code></td>
    </tr><tr>
    <td>data</td><td><code>Any</code></td>
    </tr>  </tbody>
</table>

<a name="module_User.isPair"></a>

### User.isPair(pair) ⇒ <code>Boolean</code>
Check if the object is a proper SEA pair

**Kind**: static method of [<code>User</code>](#module_User)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>pair</td><td><code>Object</code></td><td><p>an object to check</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_User..User"></a>

### User~User
**Kind**: inner typedef of [<code>User</code>](#module_User)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>initiated</td><td><code>Boolean</code></td><td><p><code>true</code> if useUser has been run at least once</p>
</td>
    </tr><tr>
    <td>is</td><td><code>Object</code></td><td><p>Reactive <code>gun.user().is</code></p>
</td>
    </tr><tr>
    <td>pub</td><td><code>String</code></td><td><p>Current user public key</p>
</td>
    </tr><tr>
    <td>color</td><td><code>String</code></td><td><p>a HEX color for the given pub</p>
</td>
    </tr><tr>
    <td>pulse</td><td><code>Number</code></td><td><p>Last received pulse timestamp</p>
</td>
    </tr><tr>
    <td>pulser</td><td><code>Number</code></td><td><p>An id for pulse <code>setInterval</code></p>
</td>
    </tr><tr>
    <td>blink</td><td><code>Boolean</code></td><td><p>Toggles with every pulse received</p>
</td>
    </tr><tr>
    <td>db</td><td><code>Object</code></td><td><p><code>gun.user()</code> reference</p>
</td>
    </tr><tr>
    <td>safe</td><td><code>Object</code></td><td><p>safe account indicators</p>
</td>
    </tr><tr>
    <td>pair</td><td><code>function</code></td><td><p>use <code>user.pair()</code> to get curent user key pair</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_User..useUser"></a>

### User~useUser
**Kind**: inner typedef of [<code>User</code>](#module_User)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>user</td><td><code>User</code></td><td><p>the user interface</p>
</td>
    </tr><tr>
    <td>auth</td><td><code>function</code></td><td><p>auth with a pair</p>
</td>
    </tr><tr>
    <td>leave</td><td><code>function</code></td><td><p>log out</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_Worker"></a>

## Worker

* [Worker](#module_Worker)
    * _static_
        * [.newWorker](#module_Worker.newWorker)
    * _inner_
        * [~sortByDate(e)](#module_Worker..sortByDate)

<a name="module_Worker.newWorker"></a>

### Worker.newWorker
Create a new worker for a function
It should contain a `postMessage` method to reply to any incoming `postMessage` from the main script

**Kind**: static constant of [<code>Worker</code>](#module_Worker)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>funcObj</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="module_Worker..sortByDate"></a>

### Worker~sortByDate(e)
Example sorter function for a dated list object

**Kind**: inner method of [<code>Worker</code>](#module_Worker)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>e</td><td><code>Object</code></td><td><p>the worker post event with a <code>data</code> object with a list of records to sort by the date keys</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_useZip"></a>

## useZip
Read and write zip files


* [useZip](#module_useZip)
    * _static_
        * [.useZip()](#module_useZip.useZip) ⇒ <code>useZip</code>
    * _inner_
        * [~useZip](#module_useZip..useZip)

<a name="module_useZip.useZip"></a>

### useZip.useZip() ⇒ <code>useZip</code>
Zip file creation toolbox

**Kind**: static method of [<code>useZip</code>](#module_useZip)  
<a name="module_useZip..useZip"></a>

### useZip~useZip
**Kind**: inner typedef of [<code>useZip</code>](#module_useZip)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>zip</td><td><code>JSZip</code></td><td><p>a JSZip instance</p>
</td>
    </tr><tr>
    <td>zipPost</td><td><code>function</code></td><td><p>treats a post with md contents and cover and icon images and adds them to the zip</p>
</td>
    </tr><tr>
    <td>addMd</td><td><code>function</code></td><td><p>add a MD file to the zip</p>
</td>
    </tr><tr>
    <td>addFile</td><td><code>function</code></td><td><p>add a binary file to the zip</p>
</td>
    </tr><tr>
    <td>downloadZip</td><td><code>function</code></td><td><p>initiate the download of the zip file</p>
</td>
    </tr>  </tbody>
</table>

