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
</tbody>
  </table>


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
        * [.usePostTimestamp()](#module_usePost.usePostTimestamp)
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

### usePostTimestamp()
  Get and update the timestamp of an immutable post

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