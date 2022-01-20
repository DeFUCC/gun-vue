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

<table>
  <thead>
    <tr>
      <th>Module</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#useaccount" >useAccount</a></td>
    <td><p>Basic account management</p>
</td>
    </tr>
<tr>
    <td><a href="#usecolor" >useColor</a></td>
    <td><p>Deterministic colors derived from oub keys, hashes or any other string data</p>
</td>
    </tr>
<tr>
    <td><a href="#usecrypto" >useCrypto</a></td>
    <td><p>SEA cryptography abstraction</p>
</td>
    </tr>
<tr>
    <td><a href="#usefeed" >useFeed</a></td>
    <td><p>Immutable hashed lists of data</p>
</td>
    </tr>
<tr>
    <td><a href="#usefile" >useFile</a></td>
    <td><p>File handling functions</p>
</td>
    </tr>
<tr>
    <td><a href="#usegun" >useGun</a></td>
    <td><p>Gun DB initialization and basic methods</p>
</td>
    </tr>
<tr>
    <td><a href="#usehash" >useHash</a></td>
    <td><p>Working with hashes</p>
</td>
    </tr>
<tr>
    <td><a href="#uselog" >useLog</a></td>
    <td><p>Reactive version of <code>gun-util</code> Date tree</p>
</td>
    </tr>
<tr>
    <td><a href="#usemd" >useMd</a></td>
    <td><p>Handle Markdown files</p>
</td>
    </tr>
<tr>
    <td><a href="#usemouse" >useMouse</a></td>
    <td><p>Handle mouse movement inside an SVG</p>
</td>
    </tr>
<tr>
    <td><a href="#usepass" >usePass</a></td>
    <td><p>Manage user&#39;s password and credentials</p>
</td>
    </tr>
<tr>
    <td><a href="#usepost" >usePost</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#userelay" >useRelay</a></td>
    <td><p>Relay connection management</p>
</td>
    </tr>
<tr>
    <td><a href="#usespace" >useSpace</a></td>
    <td><p>A 2D-space</p>
</td>
    </tr>
<tr>
    <td><a href="#useuser" >useUser</a></td>
    <td><p>Basic user management</p>
</td>
    </tr>
<tr>
    <td><a href="#useworker" >useWorker</a></td>
    <td><p>Worker wrapper for heavy functions</p>
</td>
    </tr>
<tr>
    <td><a href="#usezip" >useZip</a></td>
    <td><p>Read and write zip files</p>
</td>
    </tr>
</tbody>
</table>


<a name="module_useAccount"></a>

## useAccount
Basic account management


* [useAccount](#module_useAccount)
    * _static_
        * [.useAccount(pub)](#module_useAccount.useAccount) ⇒ <code>Account</code>
    * _inner_
        * [~Account](#module_useAccount..Account) : <code>Object</code>

### useAccount(pub) ⇒ <code>Account</code>
  Load and handle user's account by a public key


| Param | Type | Description |
| --- | --- | --- |
| pub | <code>ref</code> | The public key of a user as a string or a ref |

**Example**  
```js
import { useAccount } from '@gun-vue/composables'

const pub = 'XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc'

const { account } = useAccount(pub)
```
### Account : <code>Object</code>
  the user account interface

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pub | <code>Ref</code> | The pub key used to build the account |
| color | <code>Computed</code> | The user account color derived from the pub key |
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

<a name="module_useCrypto"></a>

## useCrypto
SEA cryptography abstraction


* [useCrypto](#module_useCrypto)
    * _static_
        * [.encFor(data, sender, receiver)](#module_useCrypto.encFor) ⇒ <code>String</code>
        * [.decFrom(data, sender, receiver)](#module_useCrypto.decFrom) ⇒ <code>String</code>
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

### Entity : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| pub | <code>String</code> | the public key |
| epub | <code>String</code> | the elliplic encryption epub |

<hr />

<a name="module_useFeed"></a>

## useFeed
Immutable hashed lists of data


* [useFeed](#module_useFeed)
    * _static_
        * [.useFeeds()](#module_useFeed.useFeeds) ⇒ <code>useFeeds</code>
        * [.useFeed(tag, options)](#module_useFeed.useFeed) ⇒ <code>useFeed</code>
        * [.downloadFeed(tag, posts)](#module_useFeed.downloadFeed)
        * [.uploadFeed(tag, files)](#module_useFeed.uploadFeed)
    * _inner_
        * [~useFeeds](#module_useFeed..useFeeds)
        * [~useFeed](#module_useFeed..useFeed)

### useFeeds() ⇒ <code>useFeeds</code>
  Toolkit to deal with the available tags

### useFeed(tag, options) ⇒ <code>useFeed</code>
  Use a list of immutable data from a #tag


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>ref</code> | A vue ref to watch - generated from props by `toRef(props,'tag')` |
| options | <code>Object</code> | Options for the feed |

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
```html
<input type="file" @change="uploadFeed( 'myTag', $event.target.files )" />
```
### useFeeds
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| search | <code>ref</code> | a ref to bind to an input element |
| slug | <code>computed</code> | a slugified search query - url safe verion to be used as a tag |
| tags | <code>Tags</code> | the object to handle all the tags |
| addTag | <code>function</code> | add a slug tag to the list |

### useFeed
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| posts | <code>ref</code> | the reactive list of hashed data |
| timestamps | <code>ref</code> | reactive timestamps list for all posts in a list |
| count | <code>computed</code> | the number of posts in a feed |

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

<a name="module_useGun"></a>

## useGun
Gun DB initialization and basic methods


* [useGun](#module_useGun)
    * _static_
        * [.gun](#module_useGun.gun)
        * [.gun2](#module_useGun.gun2)
        * [.useGun(peer)](#module_useGun.useGun) ⇒ <code>Gun</code>
        * [.useGun2(peer)](#module_useGun.useGun2) ⇒ <code>Gun</code>
    * _inner_
        * [~SEA](#module_useGun..SEA)
        * [~soul()](#module_useGun..soul)
        * [~genUUID()](#module_useGun..genUUID)

### gun
  Established Gun instance for database operations

### gun2
  Secondary Gun instance for key management

### useGun(peer) ⇒ <code>Gun</code>
  A Gun instance for DB manipulations


| Param | Type | Description |
| --- | --- | --- |
| peer | <code>Array</code> | an array of Gun peers (should be only one for now) |

### useGun2(peer) ⇒ <code>Gun</code>
  get a secondary Gun instance to manages certificates


| Param | Type | Description |
| --- | --- | --- |
| peer | <code>Array</code> | an array of Gun peers (should be only one for now) |

### SEA
  SEA library

### soul()
  **Get a soul for any given node**
A wrapper for `Gun.node.soul`

### genUUID()
  **Generate a random UUID**
A wrapper for `Gun.text.random`

<hr />

<a name="module_useHash"></a>

## useHash
Working with hashes

### getShortHash(text, seed) ⇒ <code>String</code>
  Calculate a hex hash for any string data

**Returns**: <code>String</code> - The hex encoded SHA-1 hash  

| Param | Type |
| --- | --- |
| text | <code>String</code> | 
| seed | <code>String</code> | 

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

### createMd(md) ⇒
  Create markdown with frontmatter

**Returns**: Markdown file ready to download  

| Param | Type | Description |
| --- | --- | --- |
| md | <code>Object</code> | frontmatter,content |

### parseMd(file) ⇒ <code>Md</code>
  Parse text content of a markdown file into an object

**Returns**: <code>Md</code> - - An object with md frontmatter and content  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Text form of an uploaded file |

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

<a name="module_usePost"></a>

## usePost
Get and handle a particular post by it's tag and hash


* [usePost](#module_usePost)
    * _static_
        * [.usePost(tag, hash)](#module_usePost.usePost) ⇒ <code>Post</code>
    * _inner_
        * [~Post](#module_usePost..Post) : <code>Object</code>

### usePost(tag, hash) ⇒ <code>Post</code>
  An interface to manage a post


| Param | Type |
| --- | --- |
| tag | <code>String</code> | 
| hash | <code>String</code> | 

**Example**  
```js
const post = usePost( 'tag', postHash )
```
### Post : <code>Object</code>
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| empty | <code>Boolean</code> | whether the post has contents |
| tag | <code>String</code> | the tag under which the post was published |
| hash | <code>String</code> | the hash of the contents |
| data | <code>Object</code> | the contents of the post |
| download | <code>function</code> | use this function to download the post as a Markdown file |

<hr />

<a name="module_useRelay"></a>

## useRelay
Relay connection management


* [useRelay](#module_useRelay)
    * _static_
        * [.useRelay(host)](#module_useRelay.useRelay) ⇒ <code>Relay</code>
    * _inner_
        * [~Relay](#module_useRelay..Relay) : <code>reactive</code>

### useRelay(host) ⇒ <code>Relay</code>
  Peer server status monitor


| Param | Type |
| --- | --- |
| host | <code>URL</code> | 

**Example**  
```js
import { useRelay } from '@gun-vue/composables';

const relay = useRelay()
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

<a name="module_useSpace"></a>

## useSpace
A 2D-space


* [useSpace](#module_useSpace)
    * _static_
        * [.useSpace(spaceName)](#module_useSpace.useSpace) ⇒ <code>useSpace</code>
    * _inner_
        * [~useSpace](#module_useSpace..useSpace) : <code>Object</code>

### useSpace(spaceName) ⇒ <code>useSpace</code>
  A space to navigate with mouse clicks


| Param | Type |
| --- | --- |
| spaceName | <code>String</code> | 

**Example**  
```js
const {space, area, join, place} = useSpace()
```
### useSpace : <code>Object</code>
  **Properties**

| Name | Type |
| --- | --- |
| space | <code>reactive</code> | 
| area | <code>ref</code> | 
| join | <code>function</code> | 
| place | <code>function</code> | 

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

### useUser() ⇒ <code>useUser</code>
  Get access to current logged in user

### auth(pair)
  Authenticate with a SEA key pair


| Param | Type |
| --- | --- |
| pair | <code>Object</code> | 

### leave()
  Log out the user

### updateProfile(field, data)
  Update a profile field


| Param | Type |
| --- | --- |
| field | <code>String</code> | 
| data | <code>Any</code> | 

### isPair(pair) ⇒ <code>Boolean</code>
  Check if the object is a proper SEA pair


| Param | Type | Description |
| --- | --- | --- |
| pair | <code>Object</code> | an object to check |

### User
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

### useUser
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | the user interface |
| auth | <code>function</code> | auth with a pair |
| leave | <code>function</code> | log out |

<hr />

<a name="module_useWorker"></a>

## useWorker
Worker wrapper for heavy functions


* [useWorker](#module_useWorker)
    * _static_
        * [.newWorker](#module_useWorker.newWorker)
    * _inner_
        * [~sortByDate(e)](#module_useWorker..sortByDate)

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

<a name="module_useZip"></a>

## useZip
Read and write zip files

**See**: https://github.com/Stuk/jszip  

* [useZip](#module_useZip)
    * _static_
        * [.useZip()](#module_useZip.useZip) ⇒ <code>useZip</code>
            * [~addFile(options)](#module_useZip.useZip..addFile) ⇒ <code>String</code>
    * _inner_
        * [~useZip](#module_useZip..useZip)

### useZip() ⇒ <code>useZip</code>
  Zip file creation toolbox

**Example**  
```js
import {useZip} from '@gun-vue/composables'
const { zip, zipPost, addMd, addFile, downloadZip } = useZip()
```
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