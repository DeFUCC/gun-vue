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

| Param | Type | Description |
| --- | --- | --- |
| pub | <code>ref</code> | The public key of a user as a string or a ref |

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

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Stringified data to be encrypted |
| sender | <code>Entity</code> | An object with `pub` and `epub` strings - the user.is object of the reciever's account |
| receiver | <code>SEAPair</code> | SEA Pair of the sender – `epriv` key will be used to encrypt the data |

<a name="module_Crypto.decFrom"></a>

### Crypto.decFrom(data, sender, receiver) ⇒ <code>String</code>
Decrypt a private message from an entity
1. Generates secret using senders `epub` and current user pair
2. Decrypts the data with this secret

**Kind**: static method of [<code>Crypto</code>](#module_Crypto)  
**Returns**: <code>String</code> - Decrypted data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Encrypted private data |
| sender | <code>Entity</code> | An object with `pub` and `epub` strings - the user.is object of the sender's account |
| receiver | <code>SEAPair</code> | SEA Pair of the receiver – `epriv` key will be used to encrypt the data |

<a name="module_Crypto..Entity"></a>

### Crypto~Entity : <code>Object</code>
**Kind**: inner typedef of [<code>Crypto</code>](#module_Crypto)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pub | <code>String</code> | the public key |
| epub | <code>String</code> | the elliplic encryption epub |

<a name="module_Feeds"></a>

## Feeds
Immutable hashed lists of data


* [Feeds](#module_Feeds)
    * _static_
        * [.useFeeds()](#module_Feeds.useFeeds) ⇒ <code>useFeeds</code>
        * [.useFeed(tag)](#module_Feeds.useFeed) ⇒ <code>useFeed</code>
        * [.exportFeed(tag, posts)](#module_Feeds.exportFeed)
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

| Param | Type | Description |
| --- | --- | --- |
| tag | <code>ref</code> | A vue ref to watch - generated from props by `toRef(props,'tag')` |

<a name="module_Feeds.exportFeed"></a>

### Feeds.exportFeed(tag, posts)
Export the feed as a Markdown .md file

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  

| Param | Type |
| --- | --- |
| tag | <code>String</code> | 
| posts | <code>Object</code> | 

<a name="module_Feeds.importFeed"></a>

### Feeds.importFeed(tag, event)
Import feed from a markdown file

**Kind**: static method of [<code>Feeds</code>](#module_Feeds)  

| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> |  |
| event | <code>Event</code> | the event from the file input |

<a name="module_Feeds..useFeeds"></a>

### Feeds~useFeeds
**Kind**: inner typedef of [<code>Feeds</code>](#module_Feeds)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| search | <code>ref</code> | a ref to bind to an input element |
| slug | <code>computed</code> | a slugified search query - url safe verion to be used as a tag |
| tags | <code>Tags</code> | the object to handle all the tags |
| addTag | <code>function</code> | add a slug tag to the list |

<a name="module_Feeds..useFeed"></a>

### Feeds~useFeed
**Kind**: inner typedef of [<code>Feeds</code>](#module_Feeds)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| list | <code>reactive</code> | the reactive list of hashed data |
| addToTag | <code>function</code> | stringifies an object and puts it into an immutable #tag graph |

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

| Param | Type | Description |
| --- | --- | --- |
| md | <code>Object</code> | frontmatter,content |

<a name="module_File.parseMd"></a>

### File.parseMd(file) ⇒ <code>Md</code>
Parse text content of a markdown file into an object

**Kind**: static method of [<code>File</code>](#module_File)  
**Returns**: <code>Md</code> - - An object with md frontmatter and content  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Text form of an uploaded file |

<a name="module_File.downloadFile"></a>

### File.downloadFile(text, fileType, fileName)
A method to download any text as a file

**Kind**: static method of [<code>File</code>](#module_File)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | the text to download |
| fileType | <code>String</code> | the file type like "application/json" |
| fileName | <code>String</code> | the full file name like "myKey.json" |

<a name="module_File.uploadText"></a>

### File.uploadText(event, callback)
Upload and parse JSON keypair

**Kind**: static method of [<code>File</code>](#module_File)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | `$event` from the `@change` handler |
| callback | <code>function</code> | a function to handle the loaded file from the reader |

<a name="module_File.usePictureUpload"></a>

### File.usePictureUpload(Options) ⇒ <code>PictureUploadData</code>
Process an uploaded picture by rendering in into a canvas with given size. Returns a base64 encoded image to be stored and displayed as `img.src`

**Kind**: static method of [<code>File</code>](#module_File)  

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
<a name="module_File..PictureUploadOptions"></a>

### File~PictureUploadOptions : <code>Object</code>
**Kind**: inner typedef of [<code>File</code>](#module_File)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| preserveRatio | <code>Boolean</code> | should we preserve the original picture aspect ratio? Default: `false` |
| picSize | <code>Number</code> | width of the rendered picture |
| maxSize | <code>Number</code> | maximum size of an uploaded picture |

<a name="module_File..PictureUploadData"></a>

### File~PictureUploadData : <code>Object</code>
**Kind**: inner typedef of [<code>File</code>](#module_File)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| state | <code>reactive</code> | a reactive object with the state of the upload |
| handleUpload | <code>function</code> | handler function to use with `@change="handleUpload"` on an `<input type="file">` element |

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

| Param | Type |
| --- | --- |
| text | <code>String</code> | 
| seed | <code>String</code> | 

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

| Param | Type |
| --- | --- |
| tag | <code>String</code> | 
| hash | <code>String</code> | 

<a name="module_Post..Post"></a>

### Post~Post : <code>Object</code>
**Kind**: inner typedef of [<code>Post</code>](#module_Post)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| empty | <code>Boolean</code> | whether the post has contents |
| tag | <code>String</code> | the tag under which the post was published |
| hash | <code>String</code> | the hash of the contents |
| data | <code>Object</code> | the contents of the post |
| download | <code>function</code> | use this function to download the post as a Markdown file |

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

| Param | Type |
| --- | --- |
| host | <code>URL</code> | 

**Example**  
```js
const relay = useRelay()
```
<a name="module_Relay..Relay"></a>

### Relay~Relay : <code>reactive</code>
Peer server status reactive object

**Kind**: inner typedef of [<code>Relay</code>](#module_Relay)  
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

| Param | Type |
| --- | --- |
| pair | <code>Object</code> | 

<a name="module_User.leave"></a>

### User.leave()
Log out the user

**Kind**: static method of [<code>User</code>](#module_User)  
<a name="module_User.updateProfile"></a>

### User.updateProfile(field, data)
Update a profile field

**Kind**: static method of [<code>User</code>](#module_User)  

| Param | Type |
| --- | --- |
| field | <code>String</code> | 
| data | <code>Any</code> | 

<a name="module_User.isPair"></a>

### User.isPair(pair) ⇒ <code>Boolean</code>
Check if the object is a proper SEA pair

**Kind**: static method of [<code>User</code>](#module_User)  

| Param | Type | Description |
| --- | --- | --- |
| pair | <code>Object</code> | an object to check |

<a name="module_User..User"></a>

### User~User
**Kind**: inner typedef of [<code>User</code>](#module_User)  
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

<a name="module_User..useUser"></a>

### User~useUser
**Kind**: inner typedef of [<code>User</code>](#module_User)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | the user interface |
| auth | <code>function</code> | auth with a pair |
| leave | <code>function</code> | log out |

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

| Param | Type |
| --- | --- |
| funcObj | <code>function</code> | 

<a name="module_Worker..sortByDate"></a>

### Worker~sortByDate(e)
Example sorter function for a dated list object

**Kind**: inner method of [<code>Worker</code>](#module_Worker)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | the worker post event with a `data` object with a list of records to sort by the date keys |

