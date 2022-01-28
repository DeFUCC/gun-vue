![](/media/svg/composables.svg)

## Composables

GunVue is a collection of utility functions based on [Vue 3 Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html). We assume you are already familiar with the basic ideas of Composition API and [script setup](https://learnvue.co/2021/05/explaining-the-new-script-setup-type-in-vue-3-major-takeaways-from-the-rfc/#using-script-setup-with-a-normal-script) before you continue.

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
    <td><a href="#feed" >Feed</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#feeds" >Feeds</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#post" >Post</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
</tbody>
</table>


<a name="module_Feed"></a>

## Feed
Get and handle a particular post by it's tag and hash


* [Feed](#module_Feed)
    * _static_
        * [.useFeed(tag, options)](#module_Feed.useFeed) ⇒ <code>useFeed</code>
        * [.downloadFeed(tag, posts)](#module_Feed.downloadFeed)
        * [.uploadFeed(tag, files)](#module_Feed.uploadFeed)
    * _inner_
        * [~useFeed](#module_Feed..useFeed)

### useFeed(tag, options) ⇒ <code>useFeed</code>
  Use a list of immutable data from a #tag


| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> | A vue ref to watch - generated from props by `toRef(props,'tag')` |
| options | <code>Object</code> | Options for the feed |

**Example**  
```js
import { useFeed } from '@gun-vue/composables'

const { posts, timestamps, count, uploadPosts, downloadPosts} = useFeed('MyTag')
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
### useFeed
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| posts | <code>ref</code> | the reactive list of hashed data |
| timestamps | <code>ref</code> | reactive timestamps list for all posts in a list |
| count | <code>computed</code> | the number of posts in a feed |
| downloadPosts | <code>function</code> | Download all posts in a zip file |
| uploadPosts | <code>function</code> | upload a zip file with posts |

<hr />

<a name="module_Feeds"></a>

## Feeds
Get and handle a particular post by it's tag and hash


* [Feeds](#module_Feeds)
    * _static_
        * [.useFeeds()](#module_Feeds.useFeeds) ⇒ <code>useFeeds</code>
    * _inner_
        * [~useFeeds](#module_Feeds..useFeeds)

### useFeeds() ⇒ <code>useFeeds</code>
  Toolkit to deal with the available tags

### useFeeds
  **Properties**

| Name | Type | Description |
| --- | --- | --- |
| search | <code>ref</code> | a ref to bind to an input element |
| slug | <code>computed</code> | a slugified search query - url safe verion to be used as a tag |
| tags | <code>Tags</code> | the object to handle all the tags |
| addTag | <code>function</code> | add a slug tag to the list |

<hr />

<a name="module_Post"></a>

## Post
Get and handle a particular post by it's tag and hash


* [Post](#module_Post)
    * _static_
        * [.usePost(tag, hash)](#module_Post.usePost) ⇒ <code>Post</code>
        * [.downloadPost(post)](#module_Post.downloadPost)
        * [.parsePost(data)](#module_Post.parsePost) ⇒ <code>Object</code>
        * [.addPost(tag, post)](#module_Post.addPost)
        * [.refreshPost(tag, hash)](#module_Post.refreshPost)
    * _inner_
        * [~Post](#module_Post..Post) : <code>Object</code>

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
### downloadPost(post)
  Download the post as a zip file with MD contents and icon and cover pictures if present


| Param | Type |
| --- | --- |
| post | <code>Post</code> | 

**Example**  
```js
import { downloadPost, usePost } from '@gun-vue/composables'

const post = usePost( postTag, postHash )

downloadPost(post)
```
### parsePost(data) ⇒ <code>Object</code>
  Parse a post string from db

**Returns**: <code>Object</code> - Post object  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Stringified data from the hashed post |

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
### refreshPost(tag, hash)
  Update a timestamp of an immutable object by resetting it back on itself. Essentially you get the object and put it back again.


| Param | Type |
| --- | --- |
| tag | <code>String</code> | 
| hash | <code>String</code> | 

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