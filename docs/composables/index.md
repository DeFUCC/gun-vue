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
<dt><a href="#module_useAccount">useAccount</a></dt>
<dd><p>Basic account management</p>
</dd>
<dt><a href="#module_useColor">useColor</a></dt>
<dd><p>Deterministic colors derived from oub keys, hashes or any other string data</p>
</dd>
<dt><a href="#module_useCrypto">useCrypto</a></dt>
<dd><p>SEA cryptography abstraction</p>
</dd>
<dt><a href="#module_useFeed">useFeed</a></dt>
<dd><p>Immutable hashed lists of data</p>
</dd>
<dt><a href="#module_useFile">useFile</a></dt>
<dd><p>File handling functions</p>
</dd>
<dt><a href="#module_useGun">useGun</a></dt>
<dd><p>Gun DB initialization and basic methods</p>
</dd>
<dt><a href="#module_useHash">useHash</a></dt>
<dd><p>Working with hashes</p>
</dd>
<dt><a href="#module_useLog">useLog</a></dt>
<dd><p>Reactive version of <code>gun-util</code> Date tree</p>
</dd>
<dt><a href="#module_useMd">useMd</a></dt>
<dd><p>Handle Markdown files</p>
</dd>
<dt><a href="#module_useMouse">useMouse</a></dt>
<dd><p>Handle mouse movement inside an SVG</p>
</dd>
<dt><a href="#module_usePass">usePass</a></dt>
<dd><p>Manage user&#39;s password and credentials</p>
</dd>
<dt><a href="#module_usePost">usePost</a></dt>
<dd><p>Get and handle a particular post by it&#39;s tag and hash</p>
</dd>
<dt><a href="#module_useRelay">useRelay</a></dt>
<dd><p>Relay connection management</p>
</dd>
<dt><a href="#module_useSpace">useSpace</a></dt>
<dd><p>2D space for meetings</p>
</dd>
<dt><a href="#module_useUser">useUser</a></dt>
<dd><p>Basic user management</p>
</dd>
<dt><a href="#module_useWorker">useWorker</a></dt>
<dd><p>Worker wrapper for heavy functions</p>
</dd>
<dt><a href="#module_useZip">useZip</a></dt>
<dd><p>Read and write zip files</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#useSpace">useSpace</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_useAccount"></a>

## useAccount
Basic account management


* [useAccount](#module_useAccount)
    * _static_
        * [.useAccount(pub)](#module_useAccount.useAccount) ⇒ <code>Account</code>
    * _inner_
        * [~Account](#module_useAccount..Account) : <code>Object</code>

<a name="module_useAccount.useAccount"></a>

### useAccount.useAccount(pub) ⇒ <code>Account</code>
Load and handle user's account by a public key

**Kind**: static method of [<code>useAccount</code>](#module_useAccount)  
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
<a name="module_useAccount..Account"></a>

### useAccount~Account : <code>Object</code>
the user account interface

**Kind**: inner typedef of [<code>useAccount</code>](#module_useAccount)  
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
<hr />

<a name="module_useColor"></a>

## useColor
Deterministic colors derived from oub keys, hashes or any other string data

<a name="module_useColor.useColor"></a>

### useColor.useColor(palette) ⇒ <code>ColorHash</code>
Get a color generator of a certain palette

**Kind**: static method of [<code>useColor</code>](#module_useColor)  
**Returns**: <code>ColorHash</code> - Color-Hash instance  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>palette</td><td><code>&#x27;light&#x27;</code> | <code>&#x27;regular&#x27;</code> | <code>&#x27;deep&#x27;</code> | <code>&#x27;dark&#x27;</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
import {useColor} from '@gun-vue/composables'
const colorDeep = useColor('deep')
const color = colorDeep.hex('any text data')
```
<hr />

<a name="module_useCrypto"></a>

## useCrypto
SEA cryptography abstraction


* [useCrypto](#module_useCrypto)
    * _static_
        * [.encFor(data, sender, receiver)](#module_useCrypto.encFor) ⇒ <code>String</code>
        * [.decFrom(data, sender, receiver)](#module_useCrypto.decFrom) ⇒ <code>String</code>
    * _inner_
        * [~Entity](#module_useCrypto..Entity) : <code>Object</code>

<a name="module_useCrypto.encFor"></a>

### useCrypto.encFor(data, sender, receiver) ⇒ <code>String</code>
Encrypt data for one receiver entity
1. Generates encryption secret using bob's epub and current user pair
2. Enctypts data with this secret

**Kind**: static method of [<code>useCrypto</code>](#module_useCrypto)  
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

<a name="module_useCrypto.decFrom"></a>

### useCrypto.decFrom(data, sender, receiver) ⇒ <code>String</code>
Decrypt a private message from an entity
1. Generates secret using senders `epub` and current user pair
2. Decrypts the data with this secret

**Kind**: static method of [<code>useCrypto</code>](#module_useCrypto)  
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

<a name="module_useCrypto..Entity"></a>

### useCrypto~Entity : <code>Object</code>
**Kind**: inner typedef of [<code>useCrypto</code>](#module_useCrypto)  
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

<hr />

<a name="module_useFeed"></a>

## useFeed
Immutable hashed lists of data


* [useFeed](#module_useFeed)
    * _static_
        * [.useFeeds()](#module_useFeed.useFeeds) ⇒ <code>useFeeds</code>
        * [.useFeed(tag, options)](#module_useFeed.useFeed) ⇒ <code>useFeed</code>
        * [.exportFeed(tag, posts)](#module_useFeed.exportFeed)
        * [.downloadFeed(tag, posts)](#module_useFeed.downloadFeed)
        * [.uploadFeed(tag, files)](#module_useFeed.uploadFeed)
    * _inner_
        * [~useFeeds](#module_useFeed..useFeeds)
        * [~useFeed](#module_useFeed..useFeed)

<a name="module_useFeed.useFeeds"></a>

### useFeed.useFeeds() ⇒ <code>useFeeds</code>
Toolkit to deal with the available tags

**Kind**: static method of [<code>useFeed</code>](#module_useFeed)  
<a name="module_useFeed.useFeed"></a>

### useFeed.useFeed(tag, options) ⇒ <code>useFeed</code>
Use a list of immutable data from a #tag

**Kind**: static method of [<code>useFeed</code>](#module_useFeed)  
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
    </tr><tr>
    <td>options</td><td><code>Object</code></td><td><p>Options for the feed</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_useFeed.exportFeed"></a>

### useFeed.exportFeed(tag, posts)
Export the feed as a Markdown .md file

**Kind**: static method of [<code>useFeed</code>](#module_useFeed)  
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

<a name="module_useFeed.downloadFeed"></a>

### useFeed.downloadFeed(tag, posts)
Export a list of posts as a zip file

**Kind**: static method of [<code>useFeed</code>](#module_useFeed)  
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
import {downloadFeed} from '@gun-vue/components'
downloadFeed('myTag',posts)
```
<a name="module_useFeed.uploadFeed"></a>

### useFeed.uploadFeed(tag, files)
Upload zip files and add all the MD files from it to the tag

**Kind**: static method of [<code>useFeed</code>](#module_useFeed)  
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
<input type="file" @change="uploadFeed( 'myTag', $event.target.files )" />
```
<a name="module_useFeed..useFeeds"></a>

### useFeed~useFeeds
**Kind**: inner typedef of [<code>useFeed</code>](#module_useFeed)  
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

<a name="module_useFeed..useFeed"></a>

### useFeed~useFeed
**Kind**: inner typedef of [<code>useFeed</code>](#module_useFeed)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>posts</td><td><code>ref</code></td><td><p>the reactive list of hashed data</p>
</td>
    </tr><tr>
    <td>timestamps</td><td><code>ref</code></td><td><p>reactive timestamps list for all posts in a list</p>
</td>
    </tr><tr>
    <td>count</td><td><code>computed</code></td><td><p>the number of posts in a feed</p>
</td>
    </tr>  </tbody>
</table>

<hr />

<a name="module_useFile"></a>

## useFile
File handling functions


* [useFile](#module_useFile)
    * _static_
        * [.downloadFile(text, fileType, fileName)](#module_useFile.downloadFile)
        * [.uploadText(event, callback)](#module_useFile.uploadText)
        * [.usePictureUpload(Options)](#module_useFile.usePictureUpload) ⇒ <code>PictureUploadData</code>
    * _inner_
        * [~PictureUploadOptions](#module_useFile..PictureUploadOptions) : <code>Object</code>
        * [~PictureUploadData](#module_useFile..PictureUploadData) : <code>Object</code>

<a name="module_useFile.downloadFile"></a>

### useFile.downloadFile(text, fileType, fileName)
A method to download any text as a file

**Kind**: static method of [<code>useFile</code>](#module_useFile)  
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

<a name="module_useFile.uploadText"></a>

### useFile.uploadText(event, callback)
Upload and parse JSON keypair

**Kind**: static method of [<code>useFile</code>](#module_useFile)  
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

<a name="module_useFile.usePictureUpload"></a>

### useFile.usePictureUpload(Options) ⇒ <code>PictureUploadData</code>
Process an uploaded picture by rendering in into a canvas with given size. Returns a base64 encoded image to be stored and displayed as `img.src`

**Kind**: static method of [<code>useFile</code>](#module_useFile)  
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
<a name="module_useFile..PictureUploadOptions"></a>

### useFile~PictureUploadOptions : <code>Object</code>
**Kind**: inner typedef of [<code>useFile</code>](#module_useFile)  
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

<a name="module_useFile..PictureUploadData"></a>

### useFile~PictureUploadData : <code>Object</code>
**Kind**: inner typedef of [<code>useFile</code>](#module_useFile)  
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

<hr />

<a name="module_useGun"></a>

## useGun
Gun DB initialization and basic methods


* [useGun](#module_useGun)
    * _static_
        * [.gun](#module_useGun.gun)
        * [.gun2](#module_useGun.gun2)
    * _inner_
        * [~SEA](#module_useGun..SEA)
        * [~soul()](#module_useGun..soul)
        * [~genUUID()](#module_useGun..genUUID)

<a name="module_useGun.gun"></a>

### useGun.gun
Established Gun instance for database operations

**Kind**: static property of [<code>useGun</code>](#module_useGun)  
<a name="module_useGun.gun2"></a>

### useGun.gun2
Secondary Gun instance for key management

**Kind**: static property of [<code>useGun</code>](#module_useGun)  
<a name="module_useGun..SEA"></a>

### useGun~SEA
SEA library

**Kind**: inner constant of [<code>useGun</code>](#module_useGun)  
<a name="module_useGun..soul"></a>

### useGun~soul()
**Get a soul for any given node**
A wrapper for `Gun.node.soul`

**Kind**: inner method of [<code>useGun</code>](#module_useGun)  
<a name="module_useGun..genUUID"></a>

### useGun~genUUID()
**Generate a random UUID**
A wrapper for `Gun.text.random`

**Kind**: inner method of [<code>useGun</code>](#module_useGun)  
<hr />

<a name="module_useHash"></a>

## useHash
Working with hashes

<a name="module_useHash.getShortHash"></a>

### useHash.getShortHash(text, seed) ⇒ <code>String</code>
Calculate a hex hash for any string data

**Kind**: static method of [<code>useHash</code>](#module_useHash)  
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

<hr />

<a name="module_useLog"></a>

## useLog
Reactive version of `gun-util` Date tree

<hr />

<a name="module_useMd"></a>

## useMd
Handle Markdown files


* [useMd](#module_useMd)
    * [.createMd(md)](#module_useMd.createMd) ⇒
    * [.parseMd(file)](#module_useMd.parseMd) ⇒ <code>Md</code>

<a name="module_useMd.createMd"></a>

### useMd.createMd(md) ⇒
Create markdown with frontmatter

**Kind**: static method of [<code>useMd</code>](#module_useMd)  
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

<a name="module_useMd.parseMd"></a>

### useMd.parseMd(file) ⇒ <code>Md</code>
Parse text content of a markdown file into an object

**Kind**: static method of [<code>useMd</code>](#module_useMd)  
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

<hr />

<a name="module_useMouse"></a>

## useMouse
Handle mouse movement inside an SVG

<hr />

<a name="module_usePass"></a>

## usePass
Manage user's password and credentials


* [usePass](#module_usePass)
    * _static_
        * [.usePass()](#module_usePass.usePass) ⇒ <code>usePass</code>
    * _inner_
        * [~Pass](#module_usePass..Pass) : <code>reactive</code>
        * [~usePass](#module_usePass..usePass) : <code>Object</code>

<a name="module_usePass.usePass"></a>

### usePass.usePass() ⇒ <code>usePass</code>
Manage password of a user

**Kind**: static method of [<code>usePass</code>](#module_usePass)  
<a name="module_usePass..Pass"></a>

### usePass~Pass : <code>reactive</code>
**Kind**: inner typedef of [<code>usePass</code>](#module_usePass)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>safe</td><td><code>Object</code></td>
    </tr><tr>
    <td>dec</td><td><code>Object</code></td>
    </tr>  </tbody>
</table>

<a name="module_usePass..usePass"></a>

### usePass~usePass : <code>Object</code>
**Kind**: inner typedef of [<code>usePass</code>](#module_usePass)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>pass</td><td><code>Pass</code></td><td><p>the reactive password object</p>
</td>
    </tr><tr>
    <td>setPass</td><td><code>function</code></td><td></td>
    </tr><tr>
    <td>logWithPass</td><td><code>function</code></td><td></td>
    </tr>  </tbody>
</table>

<hr />

<a name="module_usePost"></a>

## usePost
Get and handle a particular post by it's tag and hash


* [usePost](#module_usePost)
    * _static_
        * [.usePost(tag, hash)](#module_usePost.usePost) ⇒ <code>Post</code>
    * _inner_
        * [~Post](#module_usePost..Post) : <code>Object</code>

<a name="module_usePost.usePost"></a>

### usePost.usePost(tag, hash) ⇒ <code>Post</code>
An interface to manage a post

**Kind**: static method of [<code>usePost</code>](#module_usePost)  
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

<a name="module_usePost..Post"></a>

### usePost~Post : <code>Object</code>
**Kind**: inner typedef of [<code>usePost</code>](#module_usePost)  
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

<hr />

<a name="module_useRelay"></a>

## useRelay
Relay connection management


* [useRelay](#module_useRelay)
    * _static_
        * [.useRelay(host)](#module_useRelay.useRelay) ⇒ <code>Relay</code>
    * _inner_
        * [~Relay](#module_useRelay..Relay) : <code>reactive</code>

<a name="module_useRelay.useRelay"></a>

### useRelay.useRelay(host) ⇒ <code>Relay</code>
Peer server status monitor

**Kind**: static method of [<code>useRelay</code>](#module_useRelay)  
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
<a name="module_useRelay..Relay"></a>

### useRelay~Relay : <code>reactive</code>
Peer server status reactive object

**Kind**: inner typedef of [<code>useRelay</code>](#module_useRelay)  
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

<hr />

<a name="module_useSpace"></a>

## useSpace
2D space for meetings

<a name="module_useSpace.useSpace"></a>

### useSpace.useSpace(spaceName) ⇒ [<code>useSpace</code>](#useSpace)
Get a space to navigate

**Kind**: static method of [<code>useSpace</code>](#module_useSpace)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>spaceName</td><td><code>String</code></td>
    </tr>  </tbody>
</table>

<hr />

<a name="module_useUser"></a>

## useUser
Basic user management


* [useUser](#module_useUser)
    * _static_
        * [.useUser()](#module_useUser.useUser) ⇒ <code>useUser</code>
        * [.auth(pair)](#module_useUser.auth)
        * [.leave()](#module_useUser.leave)
        * [.updateProfile(field, data)](#module_useUser.updateProfile)
        * [.isPair(pair)](#module_useUser.isPair) ⇒ <code>Boolean</code>
    * _inner_
        * [~User](#module_useUser..User)
        * [~useUser](#module_useUser..useUser)

<a name="module_useUser.useUser"></a>

### useUser.useUser() ⇒ <code>useUser</code>
Get access to current logged in user

**Kind**: static method of [<code>useUser</code>](#module_useUser)  
<a name="module_useUser.auth"></a>

### useUser.auth(pair)
Authenticate with a SEA key pair

**Kind**: static method of [<code>useUser</code>](#module_useUser)  
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

<a name="module_useUser.leave"></a>

### useUser.leave()
Log out the user

**Kind**: static method of [<code>useUser</code>](#module_useUser)  
<a name="module_useUser.updateProfile"></a>

### useUser.updateProfile(field, data)
Update a profile field

**Kind**: static method of [<code>useUser</code>](#module_useUser)  
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

<a name="module_useUser.isPair"></a>

### useUser.isPair(pair) ⇒ <code>Boolean</code>
Check if the object is a proper SEA pair

**Kind**: static method of [<code>useUser</code>](#module_useUser)  
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

<a name="module_useUser..User"></a>

### useUser~User
**Kind**: inner typedef of [<code>useUser</code>](#module_useUser)  
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

<a name="module_useUser..useUser"></a>

### useUser~useUser
**Kind**: inner typedef of [<code>useUser</code>](#module_useUser)  
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

<hr />

<a name="module_useWorker"></a>

## useWorker
Worker wrapper for heavy functions


* [useWorker](#module_useWorker)
    * _static_
        * [.newWorker](#module_useWorker.newWorker)
    * _inner_
        * [~sortByDate(e)](#module_useWorker..sortByDate)

<a name="module_useWorker.newWorker"></a>

### useWorker.newWorker
Create a new worker for a function
It should contain a `postMessage` method to reply to any incoming `postMessage` from the main script

**Kind**: static constant of [<code>useWorker</code>](#module_useWorker)  
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

<a name="module_useWorker..sortByDate"></a>

### useWorker~sortByDate(e)
Example sorter function for a dated list object

**Kind**: inner method of [<code>useWorker</code>](#module_useWorker)  
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

<hr />

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

<hr />

<a name="useSpace"></a>

## useSpace : <code>Object</code>
**Kind**: global typedef  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>space</td><td><code>reactive</code></td>
    </tr><tr>
    <td>area</td><td><code>ref</code></td>
    </tr><tr>
    <td>join</td><td><code>function</code></td>
    </tr><tr>
    <td>place</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<hr />

<style scoped>
  hr {
    height: 1px;
    background-color: #3333;
    margin: 2em 0 8em 0;
  }

  h3 {
    margin-top: 3em;
  }
</style>