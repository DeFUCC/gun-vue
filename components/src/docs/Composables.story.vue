<template>
  <Story title="Composables" docs-only icon="la:book-open" group="docs" />
</template>

<docs lang="md">

  # Gun DB + Vue UI composables collection

A Composition API `use` functions set for Gun.js and Vue 3 reactivity system

![@gun-vue logo](https://raw.githubusercontent.com/DeFUCC/gun-vue/master/docs/public/media/svg/composables.svg)

[gun-vue.js.org](https://gun-vue.js.org)

It's just the beginning and not all the functions are reliably implemented yet. So you're welcome to collaborate on existing and new features of the library.

- **User** - the `gun.user()` system management
- **Account** - user profile interface
- **Color** - the `color-hash` interface to generate colors for hashes and pubs
- **Crypto** - the main cryptographic primitives like e2e encrypted messaging and more
- **Date Tree** - the very performant concept of Date Tree graphs from [gun-util](https://github.com/diatche/gun-util#DateTree) made reactive and easy to use
- **File** - some bindings to manage file uploads and downloads
- **Hash** - everything you need to hash data and work with the hashes in a reliable way (i.e. URL-safe conversion)
- **Mouse** - some basic bindings to reliably locate mouse pointer in an SVG - may be useful for many online games
- **Password** - some elaborations on reimagining password system in a p2p graph environment
- **Relay** - Gun relay peer connection monitoring
- **Room** - private signed collaborative spaces with a certificate system for access management. (TBD)
- **Space** - a simple demo of showing working with private user data in a shared space
- **Posts** - hashed immutable data in the root of the db as a fun experiment, but with deep observations about freedom of speach and ways to explore the vastness of the public graph space available with Gun
- **Chat** - basic public chat
- **Rooms** - cryptographic data collections
- **Dictionary** - we find ourselves in great power if we have verified concepts to collaborate with

... and more!

**And there's more!**

[READ FULL DOCUMENTATION ONLINE](https://gun-vue.js.org/docs)

## How to use

1. Install the library:

```shell
npm i @gun-vue/composables
```

2. Import any of the functions you need:

```js
import { useAccount } from "@gun-vue/composables";
```

3. Instantiate the function inside your Vue SFC

```js
const { account, auth, leave } = useAccount();
```

4. Use the reactive state in your template to drive the component:

```html
<div v-for="(data,field) in account.profile" :key="field">
	{{ field }} - {{ data }}
</div>
```

#### SSG environment notice (Nuxt, Vitepress etc.)

Gun-Vue is client-side only and it may throw errors being executed during the SSG/SSR build process. One way to deal with it is to make the your GUN-enabled components asynchronous.

### 1. Make your component async

```vue
<script setup async>
	const { useAccount } = await import("@gun-vue/composables");

	const { account } = useAccount();
</script>

<template>
	<div>{{ account.profile?.name }}</div>
</template>
```

### 2. Put it to load only on client side.

```html
<ClientOnly>
	<Suspense>
		<YourComponent />
	</Suspense>
</ClientOnly>
```

This should prevent any Gun-Vue related code from running during build stage.

- [ ] Refactor the code to be more useable and tree-shakeable in SSG environment. Help needed!


  ~~~~~~~~~~


## Modules

  <table>
    <thead>
      <tr>
        <th>Module</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
<tr>
        <td><a href="#usechat">useChat</a></td>
        <td><p>Basic public chat</p>
</td>
      </tr>
<tr>
        <td><a href="#useprivatechat">usePrivateChat</a></td>
        <td><p>Basic private chat</p>
</td>
      </tr>
<tr>
        <td><a href="#usecrypto">useCrypto</a></td>
        <td><p>SEA cryptography abstraction</p>
</td>
      </tr>
<tr>
        <td><a href="#usedictionary">useDictionary</a></td>
        <td></td>
      </tr>
<tr>
        <td><a href="#usefile">useFile</a></td>
        <td><p>File handling functions</p>
</td>
      </tr>
<tr>
        <td><a href="#usemd">useMd</a></td>
        <td><p>Handle Markdown files</p>
</td>
      </tr>
<tr>
        <td><a href="#usezip">useZip</a></td>
        <td><p>Read and write zip files</p>
</td>
      </tr>
<tr>
        <td><a href="#useworker">useWorker</a></td>
        <td><p>Worker wrapper for heavy functions</p>
</td>
      </tr>
<tr>
        <td><a href="#usepost">usePost</a></td>
        <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
      </tr>
<tr>
        <td><a href="#useposts">usePosts</a></td>
        <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
      </tr>
<tr>
        <td><a href="#usereaction">useReaction</a></td>
        <td><p>React to posts with emojis</p>
</td>
      </tr>
<tr>
        <td><a href="#usereactions">useReactions</a></td>
        <td><p>Reactions to posts with emojis</p>
</td>
      </tr>
<tr>
        <td><a href="#usetags">useTags</a></td>
        <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
      </tr>
<tr>
        <td><a href="#projects">Projects</a></td>
        <td></td>
      </tr>
<tr>
        <td><a href="#useroom">useRoom</a></td>
        <td></td>
      </tr>
<tr>
        <td><a href="#usespace">useSpace</a></td>
        <td><p>A 2D-space</p>
</td>
      </tr>
<tr>
        <td><a href="#usecolor">useColor</a></td>
        <td><p>Deterministic colors derived from oub keys, hashes or any other string data</p>
</td>
      </tr>
<tr>
        <td><a href="#usemouse">useMouse</a></td>
        <td><p>Handle mouse movement inside an SVG</p>
</td>
      </tr>
</tbody>
  </table>


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

</docs>

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