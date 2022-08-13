---
title: Composables
icon: la:book
group: docs
---

![](/composables.svg)

## @gun-vue/composables

GunVue Composables is a collection of utility functions based on [Vue 3 Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html). We assume you are already familiar with the basic ideas of Composition API and [script setup](https://learnvue.co/2021/05/explaining-the-new-script-setup-type-in-vue-3-major-takeaways-from-the-rfc/#using-script-setup-with-a-normal-script) before you continue.

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

<table>
  <thead>
    <tr>
      <th>Module</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#useaccount" >useAccount</a></td>
    <td><p>Basic user management</p>
</td>
    </tr>
<tr>
    <td><a href="#usechat" >useChat</a></td>
    <td><p>Basic public chat</p>
</td>
    </tr>
<tr>
    <td><a href="#useprivatechat" >usePrivateChat</a></td>
    <td><p>Basic private chat</p>
</td>
    </tr>
<tr>
    <td><a href="#usecrypto" >useCrypto</a></td>
    <td><p>SEA cryptography abstraction</p>
</td>
    </tr>
<tr>
    <td><a href="#usedictionary" >useDictionary</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#usefile" >useFile</a></td>
    <td><p>File handling functions</p>
</td>
    </tr>
<tr>
    <td><a href="#usemd" >useMd</a></td>
    <td><p>Handle Markdown files</p>
</td>
    </tr>
<tr>
    <td><a href="#usezip" >useZip</a></td>
    <td><p>Read and write zip files</p>
</td>
    </tr>
<tr>
    <td><a href="#usegun" >useGun</a></td>
    <td><p>Gun DB initialization and basic methods</p>
</td>
    </tr>
<tr>
    <td><a href="#userelay" >useRelay</a></td>
    <td><p>Relay connection management</p>
</td>
    </tr>
<tr>
    <td><a href="#userelays" >useRelays</a></td>
    <td><p>Loads the <a href="https://github.com/amark/gun/wiki/volunteer.dht">list of active volunteer DHT gun nodes</a>  and benchmarks ping for them</p>
</td>
    </tr>
<tr>
    <td><a href="#uselog" >useLog</a></td>
    <td><p>Reactive version of <code>gun-util</code> Date tree</p>
</td>
    </tr>
<tr>
    <td><a href="#useworker" >useWorker</a></td>
    <td><p>Worker wrapper for heavy functions</p>
</td>
    </tr>
<tr>
    <td><a href="#usepost" >usePost</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#useposts" >usePosts</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#usereaction" >useReaction</a></td>
    <td><p>React to posts with emojis</p>
</td>
    </tr>
<tr>
    <td><a href="#usereactions" >useReactions</a></td>
    <td><p>Reactions to posts with emojis</p>
</td>
    </tr>
<tr>
    <td><a href="#usetags" >useTags</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#projects" >Projects</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#useroom" >useRoom</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#usespace" >useSpace</a></td>
    <td><p>A 2D-space</p>
</td>
    </tr>
<tr>
    <td><a href="#usecolor" >useColor</a></td>
    <td><p>Deterministic colors derived from oub keys, hashes or any other string data</p>
</td>
    </tr>
<tr>
    <td><a href="#usemouse" >useMouse</a></td>
    <td><p>Handle mouse movement inside an SVG</p>
</td>
    </tr>
<tr>
    <td><a href="#usemates" >useMates</a></td>
    <td><p>Connections between accounts</p>
</td>
    </tr>
<tr>
    <td><a href="#usepass" >usePass</a></td>
    <td><p>Manage user&#39;s password and credentials</p>
</td>
    </tr>
<tr>
    <td><a href="#useuser" >useUser</a></td>
    <td><p>Basic user management</p>
</td>
    </tr>
</tbody>
</table>


<a name="module_useAccount"></a>

## useAccount
Basic user management


* [useAccount](#module_useAccount)
    * _static_
        * [.useAccount(pub)](#module_useAccount.useAccount) ⇒ <code>account</code>
    * _inner_
        * [~account](#module_useAccount..account) : <code>computed(object)</code>

### useAccount(pub) ⇒ <code>account</code>
  Load and handle user's account by a public key


| Param | Type | Description |
| --- | --- | --- |
| pub | <code>ref(string)</code> \| <code>string</code> | The public key of a user as a string or a ref |

**Example**  
```js
import { ref } from 'vue'
import { useAccount, SEA } from '@gun-vue/composables'

const pub = ref()

async function generatePair() {
 pub.value = await SEA.pair()
}

const { account } = useAccount(pub)

generatePair()
```
### account : <code>computed(object)</code>
  Reactive account data

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pub | <code>string</code> | the pub key |
| color | <code>string</code> | the color hash of the pub key |
| profile | <code>object</code> | all the profile fields of the account |
| pulse | <code>number</code> | the recent presence timestamp |
| blink | <code>boolean</code> | on/off switching pulse |
| lastSeen | <code>&#x27;online&#x27;</code> \| <code>string</code> | a human readable last seen status ('online' if less than TIMEOUT) |

<hr />

<a name="module_useChat"></a>

## useChat
Basic public chat

<hr />

<a name="module_usePrivateChat"></a>

## usePrivateChat
Basic private chat

<hr />

<a name="module_useCrypto"></a>

## useCrypto
SEA cryptography abstraction


* [useCrypto](#module_useCrypto)
    * _static_
        * [.encFor(data, sender, receiver)](#module_useCrypto.encFor) ⇒ <code>String</code>
        * [.decFrom(data, sender, receiver)](#module_useCrypto.decFrom) ⇒ <code>String</code>
        * [.getShortHash(text, seed)](#module_useCrypto.getShortHash) ⇒ <code>String</code>
    * _inner_
        * [~Entity](#module_useCrypto..Entity) : <code>Object</code>

### encFor(data, sender, receiver) ⇒ <code>String</code>
  Encrypt data for one receiver entity
1. Generates encryption secret using bob's epub and current user pair
2. Enctypts data with this secret

**Returns**: <code>String</code> - Encrypted data string to be sent  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Stringified data to be encrypted |
| sender | <code>Entity</code> | An object with `pub` and `epub` strings - the user.is object of the reciever's account |
| receiver | <code>SEAPair</code> | SEA Pair of the sender – `epriv` key will be used to encrypt the data |

### decFrom(data, sender, receiver) ⇒ <code>String</code>
  Decrypt a private message from an entity
1. Generates secret using senders `epub` and current user pair
2. Decrypts the data with this secret

**Returns**: <code>String</code> - Decrypted data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Encrypted private data |
| sender | <code>Entity</code> | An object with `pub` and `epub` strings - the user.is object of the sender's account |
| receiver | <code>SEAPair</code> | SEA Pair of the receiver – `epriv` key will be used to encrypt the data |

### getShortHash(text, seed) ⇒ <code>String</code>
  Calculate a hex hash for any string data

**Returns**: <code>String</code> - The hex encoded SHA-1 hash  

| Param | Type |
| --- | --- |
| text | <code>String</code> | 
| seed | <code>String</code> | 

### Entity : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| pub | <code>String</code> | the public key |
| epub | <code>String</code> | the elliplic encryption epub |

<hr />

<a name="module_useDictionary"></a>

## useDictionary

* [useDictionary](#module_useDictionary)
    * [.useWords()](#module_useDictionary.useWords) ⇒ <code>useWords</code>
    * [.useDefs()](#module_useDictionary.useDefs) ⇒ <code>useDefs</code>

### useWords() ⇒ <code>useWords</code>
  Use filtrable words list

### useDefs() ⇒ <code>useDefs</code>
  Dictionary definitions browser

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

### downloadFile(text, fileType, fileName)
  A method to download any text as a file


| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | the text to download |
| fileType | <code>String</code> | the file type like "application/json" |
| fileName | <code>String</code> | the full file name like "myKey.json" |

### uploadText(event, callback)
  Upload and parse JSON keypair


| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | `$event` from the `@change` handler |
| callback | <code>function</code> | a function to handle the loaded file from the reader |

### usePictureUpload(Options) ⇒ <code>PictureUploadData</code>
  Process an uploaded picture by rendering in into a canvas with given size. Returns a base64 encoded image to be stored and displayed as `img.src`


| Param | Type | Description |
| --- | --- | --- |
| Options | <code>PictureUploadOptions</code> | uploader options |

**Example**  
```js
const src = ref(null)

const {state, handleUpload} = usePictureUpload({
 preserveRatio: true,
})

watch(()=>state.output, file => src.value = file.content)
```
### PictureUploadOptions : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| preserveRatio | <code>Boolean</code> | should we preserve the original picture aspect ratio? Default: `false` |
| picSize | <code>Number</code> | width of the rendered picture |
| maxSize | <code>Number</code> | maximum size of an uploaded picture |

### PictureUploadData : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| state | <code>reactive</code> | a reactive object with the state of the upload |
| handleUpload | <code>function</code> | handler function to use with `@change="handleUpload"` on an `<input type="file">` element |

<hr />

<a name="module_useMd"></a>

## useMd
Handle Markdown files


* [useMd](#module_useMd)
    * _static_
        * [.createMd(md)](#module_useMd.createMd) ⇒
        * [.parseMd(file)](#module_useMd.parseMd) ⇒ <code>Md</code>
    * _inner_
        * [~Md](#module_useMd..Md) : <code>Object</code>

### createMd(md) ⇒
  Create markdown with frontmatter

**Returns**: Markdown text file ready to download  

| Param | Type | Description |
| --- | --- | --- |
| md | <code>Md</code> | frontmatter,content |

### parseMd(file) ⇒ <code>Md</code>
  Parse text content of a markdown file into an object

**Returns**: <code>Md</code> - - An object with md frontmatter and content  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Text form of an uploaded file |

### Md : <code>Object</code>
  **Properties**

| Name | Type |
| --- | --- |
| frontmatter | <code>Object</code> | 
| content | <code>object</code> | 

<hr />

<a name="module_useZip"></a>

## useZip
Read and write zip files

**See**: https://github.com/Stuk/jszip  

* [useZip](#module_useZip)
    * _static_
        * [.useZip()](#module_useZip.useZip) ⇒ <code>useZip</code>
            * [~addFile(options)](#module_useZip.useZip..addFile) ⇒ <code>String</code>
            * [~zipPost(post)](#module_useZip.useZip..zipPost)
    * _inner_
        * [~useZip](#module_useZip..useZip)

### useZip() ⇒ <code>useZip</code>
  Zip file creation toolbox

**Example**  
```js
import {useZip} from '@gun-vue/composables'
const { zip, zipPost, addMd, addFile, downloadZip } = useZip()
```

* [.useZip()](#module_useZip.useZip) ⇒ <code>useZip</code>
    * [~addFile(options)](#module_useZip.useZip..addFile) ⇒ <code>String</code>
    * [~zipPost(post)](#module_useZip.useZip..zipPost)

<a name="module_useZip.useZip..addFile"></a>

#### addFile(options) ⇒ <code>String</code>
Add a binary file to the zip

**Kind**: inner method of [<code>useZip</code>](#module_useZip.useZip)  
**Returns**: <code>String</code> - the resulting filename  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Example**  
```js
if (post.cover) { // a base64 encoded picture
  const fileName = await addFile({
    title: "cover",
    file: post.cover,
    folder: post.title,
  });
  post.cover = fileName;
}
```
<a name="module_useZip.useZip..zipPost"></a>

#### zipPost(post)
Zips the whole post object

**Kind**: inner method of [<code>useZip</code>](#module_useZip.useZip)  

| Param | Type |
| --- | --- |
| post | <code>Object</code> | 

### useZip
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| zip | <code>JSZip</code> | a JSZip instance |
| zipPost | <code>function</code> | treats a post with md contents and cover and icon images and adds them to the zip |
| addMd | <code>function</code> | add a MD file to the zip |
| addFile | <code>function</code> | add a binary file to the zip |
| downloadZip | <code>function</code> | initiate the download of the zip file |

<hr />

<a name="module_useGun"></a>

## useGun
Gun DB initialization and basic methods


* [useGun](#module_useGun)
    * _static_
        * [.gun](#module_useGun.gun)
        * [.gun2](#module_useGun.gun2)
        * [.useGun(options)](#module_useGun.useGun) ⇒ <code>Gun</code>
        * [.useGun2(options)](#module_useGun.useGun2) ⇒ <code>Gun</code>
    * _inner_
        * [~SEA](#module_useGun..SEA)
        * [~soul()](#module_useGun..soul)
        * [~genUUID()](#module_useGun..genUUID)

### gun
  The main Gun instance for database operations

### gun2
  Secondary Gun instance for key management

### useGun(options) ⇒ <code>Gun</code>
  Instantiate a Gun instance for DB manipulations


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options fot this gun instance, like { localstorage:true } |

**Example**  
```js
import { useGun } from '@gun-vue/composables'

const gun = useGun()
```
### useGun2(options) ⇒ <code>Gun</code>
  get a secondary Gun instance for certificate management


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options fot this gun instance, like { localstorage:true } |

### SEA
  SEA library

### soul()
  **Get a soul for any given node**
A wrapper for `Gun.node.soul`

### genUUID()
  **Generate a random UUID**
A wrapper for `Gun.text.random`

<hr />

<a name="module_useRelay"></a>

## useRelay
Relay connection management


* [useRelay](#module_useRelay)
    * _static_
        * [.useRelay()](#module_useRelay.useRelay) ⇒ <code>useRelay</code>
    * _inner_
        * [~Relay](#module_useRelay..Relay) : <code>reactive</code>

### useRelay() ⇒ <code>useRelay</code>
  Peer server status monitor

**Example**  
```js
import { useRelay } from '@gun-vue/composables';

const { relay, setPeer, resetPeer } = useRelay()
```
### Relay : <code>reactive</code>
  Peer server status reactive object

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| host | <code>String</code> | the current peer server URL |
| status | <code>String</code> | current connection status |
| started | <code>Number</code> | the timestamp of server started current session |
| pulse | <code>Number</code> | last received timestamp |
| lag | <code>Number</code> | drift of the timestamp in ms |
| diff | <code>Number</code> | age of the session in ms |
| age | <code>String</code> | age of the session in human readable format |
| blink | <code>Boolean</code> | a Boolean toggled every time the new pulse comes to drive animations |

**Example**  
```js
{
"peer": "https://etogun.glitch.me/gun",
"host": "6db1edbb5aae",
"status": "running",
"started": 1642666725795,
"pulse": 1642677007483,
"lag": 8,
"diff": 10281688,
"age": "3h",
"delay": 22,
"blink": true
}
```
<hr />

<a name="module_useRelays"></a>

## useRelays
Loads the [list of active volunteer DHT gun nodes](https://github.com/amark/gun/wiki/volunteer.dht)  and benchmarks ping for them


* [useRelays](#module_useRelays)
    * _static_
        * [.loadRelays(loadRelaysOptions)](#module_useRelays.loadRelays) ⇒ <code>relays</code>
        * [.useRelays()](#module_useRelays.useRelays) ⇒ <code>useRelays</code>
    * _inner_
        * [~useRelays](#module_useRelays..useRelays) : <code>Object</code>
        * [~loadRelaysOptions](#module_useRelays..loadRelaysOptions) : <code>Object</code>
        * [~Relays](#module_useRelays..Relays) : <code>Array.&lt;Object&gt;</code>

### loadRelays(loadRelaysOptions) ⇒ <code>relays</code>
  Load the list of the relays


| Param | Type |
| --- | --- |
| loadRelaysOptions | <code>Object</code> | 

### useRelays() ⇒ <code>useRelays</code>
  Gets the list of actual gun relays and tool to update the list

**Example**  
```js
import { useRelays } from '@gun-vue/composables'
const { relays, errors, loadRelays } = useRelays()
```
### useRelays : <code>Object</code>
  **Properties**

| Name | Type |
| --- | --- |
| Relays | <code>Object</code> | 
| Errors | <code>Object</code> | 
| loadRelays | <code>function</code> | 

### loadRelaysOptions : <code>Object</code>
  **Properties**

| Name | Type |
| --- | --- |
| source | <code>String</code> | 

### Relays : <code>Array.&lt;Object&gt;</code>
  **Properties**

| Name | Type |
| --- | --- |
| hostname | <code>String</code> | 
| url | <code>String</code> | 
| ping | <code>Number</code> | 

<hr />

<a name="module_useLog"></a>

## useLog
Reactive version of `gun-util` Date tree

<hr />

<a name="module_useWorker"></a>

## useWorker
Worker wrapper for heavy functions


* [useWorker](#module_useWorker)
    * [.newWorker](#module_useWorker.newWorker)
    * [.sortByDate(e)](#module_useWorker.sortByDate)

### newWorker
  Create a new worker for a function
It should contain a `postMessage` method to reply to any incoming `postMessage` from the main script


| Param | Type |
| --- | --- |
| funcObj | <code>function</code> | 

### sortByDate(e)
  Example sorter function for a dated list object


| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | the worker post event with a `data` object with a list of records to sort by the date keys |

<hr />

<a name="module_usePost"></a>

## usePost
Get and handle a particular post by it's tag and hash


* [usePost](#module_usePost)
    * _static_
        * [.usePost(options)](#module_usePost.usePost) ⇒ <code>Post</code>
        * [.addPost(tag, post)](#module_usePost.addPost)
        * [.downloadPost(post)](#module_usePost.downloadPost)
        * [.parsePost(data)](#module_usePost.parsePost) ⇒ <code>Object</code>
        * [.usePostTimestamp()](#module_usePost.usePostTimestamp) ⇒
    * _inner_
        * [~Post](#module_usePost..Post) : <code>Object</code>

### usePost(options) ⇒ <code>Post</code>
  An interface to manage a post


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Example**  
```js
const post = usePost({ tag: 'tag', hash: postHash })
```
### addPost(tag, post)
  Add a new post to a tag


| Param | Type |
| --- | --- |
| tag | <code>String</code> | 
| post | <code>Object</code> | 

**Example**  
```js
import { addPost } from '@gun-vue/composables'

addPost('MyTag', {
 title: 'New post'
})
```
### downloadPost(post)
  Download the post as a zip file with MD contents and icon and cover pictures if present


| Param | Type |
| --- | --- |
| post | <code>Post</code> | 

**Example**  
```js
import { downloadPost, usePost } from '@gun-vue/composables'

const {post} = usePost( postTag, postHash )

downloadPost(post)
```
### parsePost(data) ⇒ <code>Object</code>
  Parse a post string from db

**Returns**: <code>Object</code> - Post object  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Stringified data from the hashed post |

### usePostTimestamp() ⇒
  Get and update the timestamp of an immutable post

**Returns**: - {timestamp, msTime, refresh}  

| Param | Description |
| --- | --- |
|  | {tag, hash} |

### Post : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| empty | <code>Boolean</code> | whether the post has contents |
| tag | <code>String</code> | the tag under which the post was published |
| hash | <code>String</code> | the hash of the contents |
| data | <code>Object</code> | the contents of the post |
| download | <code>function</code> | use this function to download the post as a Markdown file |

**Example**  
```js
{
 "empty": false,
 "tag": "ds",
 "hash": "C8trDBYNyvxVedHK4Q0IuUarc/k2/iiv8opPfoAU0xA=",
 "data": {
   "cover": "data:image/png;base64,..........",
   "icon": "data:image/png;base64,..........",
   "title": "OSS",
   "statement": "New live album by tsoop",
   "youtube": "K2MwpOd8vEI",
   "content": "It's mostly op-z + op-1 with my own Unity visuals based on [Chromatone](https://chromatone.center) system.\n\n### 2021\nFirst played live at April 20th **2021**.\n\n### Into 2022\nIt's an ongoing live album to be recorded throughout the **2022**."
},
 "timestamp": 1642590655747,
 "lastUpdated": "1d"
}
```
<hr />

<a name="module_usePosts"></a>

## usePosts
Get and handle a particular post by it's tag and hash


* [usePosts](#module_usePosts)
    * _static_
        * [.usePosts(tag, options)](#module_usePosts.usePosts) ⇒ <code>usePosts</code>
        * [.downloadFeed(tag, posts)](#module_usePosts.downloadFeed)
        * [.uploadFeed(tag, files)](#module_usePosts.uploadFeed)
    * _inner_
        * [~usePosts](#module_usePosts..usePosts)

### usePosts(tag, options) ⇒ <code>usePosts</code>
  Use a list of immutable data from a #tag


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> | A vue ref to watch - generated from props by `toRef(props,'tag')` |
| options | <code>Object</code> | Options for the feed |

**Example**  
```js
import { usePosts } from '@gun-vue/composables'

const { posts, timestamps, count, uploadPosts, downloadPosts} = usePosts('MyTag')
```
### downloadFeed(tag, posts)
  Export a list of posts as a zip file


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> | Name of the tag |
| posts | <code>Object</code> | Posts to export |

**Example**  
```js
import {downloadFeed} from '@gun-vue/components'

downloadFeed('myTag',posts)
```
### uploadFeed(tag, files)
  Upload zip files and add all the MD files from it to the tag


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> | a tag to add the posts to |
| files | <code>FileList</code> | File list from the input `@change` event |

**Example**  
```js
import { uploadFeed } from '@gun-vue/composables'
```
**Example**  
```html
<input type="file" @change="uploadFeed( 'myTag', $event.target.files )" />
```
### usePosts
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| posts | <code>ref</code> | the reactive list of hashed data |
| timestamps | <code>ref</code> | reactive timestamps list for all posts in a list |
| count | <code>computed</code> | the number of posts in a feed |
| downloadPosts | <code>function</code> | Download all posts in a zip file |
| uploadPosts | <code>function</code> | upload a zip file with posts |

<hr />

<a name="module_useReaction"></a>

## useReaction
React to posts with emojis

<hr />

<a name="module_useReactions"></a>

## useReactions
Reactions to posts with emojis

<hr />

<a name="module_useTags"></a>

## useTags
Get and handle a particular post by it's tag and hash


* [useTags](#module_useTags)
    * _static_
        * [.useTagList()](#module_useTags.useTagList) ⇒ <code>useTagList</code>
    * _inner_
        * [~useTagList](#module_useTags..useTagList)

### useTagList() ⇒ <code>useTagList</code>
  Toolkit to deal with the available tags

### useTagList
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| search | <code>ref</code> | a ref to bind to an input element |
| slug | <code>computed</code> | a slugified search query - url safe verion to be used as a tag |
| tags | <code>Tags</code> | the object to handle all the tags |
| addTag | <code>function</code> | add a slug tag to the list |

<hr />

<a name="module_Projects"></a>

## Projects
<hr />

<a name="module_useRoom"></a>

## useRoom

* [useRoom](#module_useRoom)
    * [.useRoom()](#module_useRoom.useRoom) ⇒ <code>useRoom</code>
    * [.updateRoomProfile(field, content)](#module_useRoom.updateRoomProfile)
    * [.createRoom()](#module_useRoom.createRoom)
    * [.enterRoom(pub)](#module_useRoom.enterRoom)
    * [.leaveRoom()](#module_useRoom.leaveRoom)

### useRoom() ⇒ <code>useRoom</code>
  Reactive room controls

### updateRoomProfile(field, content)
  Update a profile field of a room


| Param | Type | Description |
| --- | --- | --- |
| field | <code>String</code> | parameter to write to |
| content | <code>String</code> |  |

### createRoom()
  Create a new room inside the current room

### enterRoom(pub)
  The right way to come inside a room


| Param | Type |
| --- | --- |
| pub | <code>String</code> | 

### leaveRoom()
  Leave the room

<hr />

<a name="module_useSpace"></a>

## useSpace
A 2D-space


* [useSpace](#module_useSpace)
    * _static_
        * [.useSpace()](#module_useSpace.useSpace) ⇒ <code>useSpace</code>
    * _inner_
        * [~useSpace](#module_useSpace..useSpace) : <code>Object</code>

### useSpace() ⇒ <code>useSpace</code>
  A space to navigate with mouse clicks

**Example**  
```js
const { space, plane, links, width, height, guests, area, join } = useSpace({
TIMEOUT: 10000,
})
```
### useSpace : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| space | <code>reactive</code> | The main object |
| guests | <code>reactive</code> | Active guests |
| links | <code>reactive</code> | Links between active guests |
| plane | <code>ref</code> | The SVG element |
| area | <code>ref</code> | The rect element for mouse events capture |
| width | <code>ref</code> | Width of the plane |
| height | <code>ref</code> | Height of the plane |
| join | <code>function</code> | Join the space with the current user |

<hr />

<a name="module_useColor"></a>

## useColor
Deterministic colors derived from oub keys, hashes or any other string data

### useColor(palette) ⇒ <code>ColorHash</code>
  Get a color generator of a certain palette

**Returns**: <code>ColorHash</code> - Color-Hash instance  
**See**: https://github.com/zenozeng/color-hash  

| Param | Type |
| --- | --- |
| palette | <code>&#x27;light&#x27;</code> \| <code>&#x27;regular&#x27;</code> \| <code>&#x27;deep&#x27;</code> \| <code>&#x27;dark&#x27;</code> | 

**Example**  
```js
import {useColor} from '@gun-vue/composables'
const colorDeep = useColor('deep')
const color = colorDeep.hex('any text data')
// color == '#e052ae'
```
<hr />

<a name="module_useMouse"></a>

## useMouse
Handle mouse movement inside an SVG


* [useMouse](#module_useMouse)
    * _static_
        * [.useSvgMouse()](#module_useMouse.useSvgMouse) ⇒ <code>useMouse</code>
    * _inner_
        * [~useMouse](#module_useMouse..useMouse) : <code>Object</code>
        * [~Mouse](#module_useMouse..Mouse) : <code>reactive</code>

### useSvgMouse() ⇒ <code>useMouse</code>
  Correct mouse position in an SVG space

### useMouse : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| area | <code>ref</code> | an area to mount the mouse to |
| mouse | <code>Mouse</code> | the reactive mouse parameters |

### Mouse : <code>reactive</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | absolute X coordinate to place a marker to |
| y | <code>Number</code> | absolute Y coordinate to place a marker to |
| normX | <code>Number</code> | [0-1] relative X coordinate |
| normY | <code>Number</code> | [0-1] relative Y coordinate |
| pressed | <code>Boolean</code> | is mouse pressed? |
| inside | <code>Boolean</code> | is mouse inside the area? |

<hr />

<a name="module_useMates"></a>

## useMates
Connections between accounts


* [useMates](#module_useMates)
    * _static_
        * [.useMates(pub)](#module_useMates.useMates) ⇒ <code>useMates</code>
        * [.getFirstEmoji(text)](#module_useMates.getFirstEmoji) ⇒ <code>String</code>
        * [.isEmoji(text)](#module_useMates.isEmoji) ⇒ <code>Boolean</code>
        * [.useMate(pub)](#module_useMates.useMate) ⇒ <code>useMate</code>
    * _inner_
        * [~useMates](#module_useMates..useMates) : <code>reactive</code>
        * [~useMate](#module_useMates..useMate) : <code>Object</code>

### useMates(pub) ⇒ <code>useMates</code>
  Get a reactive list of the user's mates


| Param | Type |
| --- | --- |
| pub | <code>String</code> | 

### getFirstEmoji(text) ⇒ <code>String</code>
  Break the string into graphemes and return the first one if it's an emoji

**Returns**: <code>String</code> - Emoji  

| Param | Type |
| --- | --- |
| text | <code>String</code> | 

### isEmoji(text) ⇒ <code>Boolean</code>
  Check if the text has emojis


| Param | Type |
| --- | --- |
| text | <code>String</code> | 

### useMate(pub) ⇒ <code>useMate</code>
  Make mates with some account by current user


| Param | Type |
| --- | --- |
| pub | <code>String</code> | 

### useMates : <code>reactive</code>
  ### useMate : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| emoji | <code>ref</code> | change it in an input |
| isMate | <code>ref</code> | reactive state of connection |
| toggleMate | <code>function</code> | toggle the link with current `emoji` ref |

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

### usePass() ⇒ <code>usePass</code>
  Manage password of a user

### Pass : <code>reactive</code>
  **Properties**

| Name | Type |
| --- | --- |
| safe | <code>Object</code> | 
| dec | <code>Object</code> | 

### usePass : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| pass | <code>Pass</code> | the reactive password object |
| setPass | <code>function</code> |  |
| logWithPass | <code>function</code> |  |

<hr />

<a name="module_useUser"></a>

## useUser
Basic user management


* [useUser](#module_useUser)
    * _static_
        * [.useUser()](#module_useUser.useUser) ⇒ <code>useUser</code>
        * [.auth(pair)](#module_useUser.auth)
        * [.leave()](#module_useUser.leave)
        * [.addProfileField(name)](#module_useUser.addProfileField)
        * [.updateProfile(field, data)](#module_useUser.updateProfile)
        * [.isPair(pair)](#module_useUser.isPair) ⇒ <code>Boolean</code>
    * _inner_
        * [~Account](#module_useUser..Account) : <code>Object</code>
        * [~User](#module_useUser..User) : <code>Object</code>
        * [~useUser](#module_useUser..useUser)

### useUser() ⇒ <code>useUser</code>
  Get access to current logged in user

**Example**  
```js
import { useUser } from '@gun-vue/composables'

const { user, auth, leave } = useUser()
```
### auth(pair)
  Authenticate with a SEA key pair


| Param | Type |
| --- | --- |
| pair | <code>Object</code> | 

**Example**  
```js
import { auth, SEA } from '@gun-vue/composables'

async function login() {
   const pair = await SEA.pair()
   auth(pair)
}
```
### leave()
  Log out the user

**Example**  
```js
import { leave } from '@gun-vue/composables'

leave()
```
### addProfileField(name)
  Add a field to the User profile


| Param | Type |
| --- | --- |
| name | <code>String</code> | 

**Example**  
```js
import { addProfileField } from '@gun-vue/composables'

addProfileField( 'city' )
```
### updateProfile(field, data)
  Update a profile field


| Param | Type |
| --- | --- |
| field | <code>String</code> | 
| data | <code>Any</code> | 

**Example**  
```js
import { updateProfile } from '@gun-vue/composables'

updateProfile( 'city', 'Moscow' )
```
### isPair(pair) ⇒ <code>Boolean</code>
  Check if the object is a proper SEA pair


| Param | Type | Description |
| --- | --- | --- |
| pair | <code>Object</code> | an object to check |

### Account : <code>Object</code>
  the user account interface

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pub | <code>ref</code> | The pub key used to build the account |
| color | <code>computed</code> | The user account color derived from the pub key |
| profile | <code>Object</code> | An object with all the `gun.user().get('profile')` data |
| pulse | <code>Number</code> | latest timestamp from the user. It's emitted every second. Offline timeout is set to 10 seconds. |
| blink | <code>Boolean</code> | A boolean that toggles on every timestamp received |
| lastSeen | <code>Sting</code> | Shows 'online' if recent pulse is less then 10s ago or a human readable time string |
| db | <code>gun</code> | `gun.user(pub)` ref to query any additional user data |

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
### User : <code>Object</code>
  An interface to the current gun user

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| initiated | <code>Boolean</code> | `true` if useUser has been run at least once |
| is | <code>Object</code> | Reactive `gun.user().is` |
| pub | <code>String</code> | Current user public key |
| color | <code>String</code> | a HEX color for the given pub |
| pulse | <code>Number</code> | Last received pulse timestamp |
| pulser | <code>Number</code> | An id for pulse `setInterval` |
| blink | <code>Boolean</code> | Toggles with every pulse received |
| db | <code>Object</code> | `gun.user()` reference |
| safe | <code>Object</code> | safe account indicators |
| pair | <code>function</code> | use `user.pair()` to get curent user key pair |

**Example**  
```js
{ 
 "initiated": true, 
 "is": { 
   "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc", 
   "epub": "wAvPlMAg4jvUvK4sPpVyF1CAWnRCMu1YpHnoDrVDg-o.l79QDmdPCLEiO0F_WkB3zYLpJt-lANtyhNmHSM4bTes", 
   "alias": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc" 
 }, 
 "name": "Accord", 
 "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc", 
 "color": "#f55c3d", 
 "pulse": 1642708061615, 
 "pulser": 12, 
 "blink": false, 
 "safe": { 
   "saved": true, 
   "password": null, 
   "enc": "SEA{\"ct\":\"E+6GViU9dTuidruOCNAoBITE+AlGNRgiABplSbL5fh4v1P+fhF33MuBwKd3ssBNi2kJ1sCzvS/YLmzivECA5ARZPGVbgXTSj8AE9kCz0Ac/8ushlsfBNdt8s3+a3OPVxMIevnT01uqcgr75Zp4TugIg/YuB5WltA9RHsgWEMlo+X+tRGaqG5rfw4sAmTSV0P8evMgM9rN/Un5t/WeDbvIPNXqZEmtxwAhMUZwOJWZckNZmNwpxnelFO0BwmauWfzkXuqGeSxNhMeaZi+VoRDMUvTjT68DLBnVoOhFhcdco+RW8AJfktZHZ4GF2IzFnQmTGpUd2LfvIY/Yn1eNJH7iQ5w41ChiYB/zhgQCOc5ur51PV6swAuN595vUNn7+0J1JRSNGzW2V/4j4YR4IEsAoqOtdn2Y21ga/CFdrE0=\",\"iv\":\"LtODTV+LBzhWHqUcptUO\",\"s\":\"XCL9Uj1YlPcV\"}", 
 "pass": "SEA{\"ct\":\"8wNClMx/ebfou+gGWdf+bbx0TAgc9RU=\",\"iv\":\"NPgHkI+Ke+i/mw+3chlr\",\"s\":\"3VzGv06Y4fQ+\"}" 
 } 
}
```
### useUser
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | the user interface |
| auth | <code>function</code> | auth with a pair |
| leave | <code>function</code> | log out |

<hr />

