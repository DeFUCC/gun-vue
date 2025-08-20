<p align="center">
  <img src="https://raw.githubusercontent.com/isomorphic-git/isomorphic-git/main/website/static/img/isomorphic-git-logo.svg?sanitize=true" alt="" height="150"/>
</p>

# isomorphic-git

`isomorphic-git` is a pure JavaScript reimplementation of git that works in both Node.js and browser JavaScript environments. It can read and write to git repositories, fetch from and push to git remotes (such as GitHub), all without any native C++ module dependencies.

## Goals

Isomorphic-git aims for 100% interoperability with the canonical git implementation. This means it does all its operations by modifying files in a ".git" directory just like the git you are used to. The included `isogit` CLI can operate on git repositories on your desktop or server.

This library aims to be a complete solution with no assembly required.
The API has been designed with modern tools like Rollup and Webpack in mind.
By providing functionality as individual functions, code bundlers can produce smaller bundles by including only the functions your application uses.

The project includes type definitions so you can enjoy static type-checking and intelligent code completion in editors like VS Code and [CodeSandbox](https://codesandbox.io).

## Project status

The original author of the project ([Billie Hilton](https://github.com/billiegoose)) left the project, but the project is still maintained by two volunteers:

- [@jcubic](https://github.com/jcubic) (most active)
- [@mojavelinux](https://github.com/mojavelinux)

But they don't write much code, mainly do code review and try to answer to issues and on Gitter, they just don't want the project to die. So you can say that this project is community driven (as jcubic always reply to issues). Which means that if you want a feature to be implemented you need to do this yourself or find someone that is willing to write the code for you. The project have some money on [OpenCollective](https://opencollective.com/isomorphic-git) and we can spend it on some development, if you find someone that is willing to code in exchange to some bucks (it may be you), but we don't have a lot so don't expect to have full sallary.

If you want to help this project you're more than welcome to do so.

## Supported Environments

The following environments are tested in CI and will continue to be supported until the next breaking version:

<table width="100%">
<tr>
<td align="center"><img src="https://raw.githubusercontent.com/isomorphic-git/isomorphic-git/main/website/static/img/browsers/node.webp" alt="" width="64" height="64"><br> Node 10</td>
<td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/bc47e4601d2c1fd46a7912f9aed5cdda4afdb301/src/chrome/chrome.svg?sanitize=true" alt="" width="64" height="64"><br> Chrome 79</td>
<td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/bc47e4601d2c1fd46a7912f9aed5cdda4afdb301/src/edge/edge.svg?sanitize=true" alt="" width="64" height="64"><br> Edge 79</td>
<td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/bc47e4601d2c1fd46a7912f9aed5cdda4afdb301/src/firefox/firefox.svg?sanitize=true" alt="" width="64" height="64"><br> Firefox 72</td>
<td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/bc47e4601d2c1fd46a7912f9aed5cdda4afdb301/src/safari/safari_64x64.png" alt="" width="64" height="64"><br> Safari 13</td>
<td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Android_logo_2019_%28stacked%29.svg" alt="" width="64" height="64"><br> Android 10</td>
<td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/IOS_13_logo.svg" alt="" width="64" height="64"><br> iOS 13</td>
</tr>
</table>

## Upgrading from version 0.x to version 1.x?

See the full [Release Notes](https://github.com/isomorphic-git/isomorphic-git/releases/tag/v1.0.0) on GitHub and the release [Blog Post](https://isomorphic-git.org/blog/2020/02/25/version-1-0-0).

## Install

You can install it from npm:

```
npm install --save isomorphic-git
```

## Getting Started

The "isomorphic" in `isomorphic-git` means that the same code runs in either the server or the browser.
That's tricky to do since git uses the file system and makes HTTP requests. Browsers don't have an `fs` module.
And node and browsers have different APIs for making HTTP requests!

So rather than relying on the `fs` and `http` modules, `isomorphic-git` lets you bring your own file system
and HTTP client.

If you're using `isomorphic-git` in node, you use the native `fs` module and the provided node HTTP client.

```js
// node.js example
const path = require("path");
const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");

const dir = path.join(process.cwd(), "test-clone");
git
	.clone({
		fs,
		http,
		dir,
		url: "https://github.com/isomorphic-git/lightning-fs",
	})
	.then(console.log);
```

If you're using `isomorphic-git` in the browser, you'll need something that emulates the `fs` API.
The easiest to setup and most performant library is [LightningFS](https://github.com/isomorphic-git/lightning-fs) which is written and maintained by the same author and is part of the `isomorphic-git` suite.
If LightningFS doesn't meet your requirements, isomorphic-git should also work with [BrowserFS](https://github.com/jvilk/BrowserFS) and [Filer](https://github.com/filerjs/filer).
Instead of `isomorphic-git/http/node` this time import `isomorphic-git/http/web`:

```html
<script src="https://unpkg.com/@isomorphic-git/lightning-fs"></script>
<script src="https://unpkg.com/isomorphic-git"></script>
<script type="module">
	import http from "https://unpkg.com/isomorphic-git@beta/http/web/index.js";
	const fs = new LightningFS("fs");

	const dir = "/test-clone";
	git
		.clone({
			fs,
			http,
			dir,
			url: "https://github.com/isomorphic-git/lightning-fs",
			corsProxy: "https://cors.isomorphic-git.org",
		})
		.then(console.log);
</script>
```

If you're using ES module syntax, you can use either the default import for convenience, or named imports to benefit from tree-shaking if you are using a bundler:

```js
import git from "isomorphic-git";
// or
import * as git from "isomorphic-git";
// or
import { plugins, clone, commit, push } from "isomorphic-git";
```

View the full [Getting Started guide](https://isomorphic-git.github.io/docs/quickstart.html) on the docs website.

Then check out the [Useful Snippets](https://isomorphic-git.org/docs/en/snippets) page, which includes even more sample code written by the community!

### CORS support

Unfortunately, due to the same-origin policy by default `isomorphic-git` can only clone from the same origin as the webpage it is running on. This is terribly inconvenient, as it means for all practical purposes cloning and pushing repos must be done through a proxy.

For this purpose, [@isomorphic-git/cors-proxy](https://github.com/isomorphic-git/cors-proxy) exists; which you can clone it or [`npm install`](https://www.npmjs.com/package/@isomorphic-git/cors-proxy) it. Alternatively, use CloudFlare workers, which can be setup without leaving the browser ([instructions](https://gist.github.com/tomlarkworthy/cf1d4ceabeabdb6d1628575ab3a83acf)).

For testing or small projects, you can also use [https://cors.isomorphic-git.org](https://cors.isomorphic-git.org) - a free proxy sponsored by [Clever Cloud](https://www.clever-cloud.com/?utm_source=ref&utm_medium=link&utm_campaign=isomorphic-git).

We hope to get CORS headers added to all the major Git hosting platforms eventually, and will list the progress made here:

| Service             | Supports CORS requests                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gogs (self-hosted)  | [✔](https://isomorphic-git.github.io/blog/2018/04/07/gogs-adds-cors-headers-for-isomorphic-git.html)                                                                           |
| Gitea (self-hosted) | [✔](https://github.com/go-gitea/gitea/pull/5719)                                                                                                                               |
| Azure DevOps        | [✔](https://github.com/isomorphic-git/isomorphic-git/issues/678#issuecomment-452402740) (Usage Note: requires authentication)                                                  |
| Gitlab              | ❌ Our [PR](https://gitlab.com/gitlab-org/gitlab-workhorse/merge_requests/219) was rejected, but the [issue](https://gitlab.com/gitlab-org/gitlab/issues/20590) is still open! |
| Bitbucket           | ❌                                                                                                                                                                             |
| Github              | ❌                                                                                                                                                                             |

It is literally just two lines of code to add the CORS headers!! Easy stuff. Surely it will happen.

### `isogit` CLI

Isomorphic-git comes with a simple CLI tool, named `isogit` because `isomorphic-git` is a lot to type. It is really just a thin shell that translates command line arguments into the equivalent JS API commands. So you should be able to run _any_ current or future isomorphic-git commands using the CLI.

It always starts with an the assumption that the current working directory is a git root.
E.g. `{ dir: '.' }`.

It uses `minimisted` to parse command line options and will print out the equivalent JS command and pretty-print the output JSON.

The CLI is more of a lark for quickly testing `isomorphic-git` and isn't really meant as a `git` CLI replacement.

## Supported Git commands

This project follows semantic versioning, so we may continue to make changes to the API but they will always be backwards compatible
unless there is a major version bump.

### commands

- [abortMerge](https://isomorphic-git.github.io/docs/abortMerge.html)
- [add](https://isomorphic-git.github.io/docs/add.html)
- [addNote](https://isomorphic-git.github.io/docs/addNote.html)
- [addRemote](https://isomorphic-git.github.io/docs/addRemote.html)
- [annotatedTag](https://isomorphic-git.github.io/docs/annotatedTag.html)
- [branch](https://isomorphic-git.github.io/docs/branch.html)
- [checkout](https://isomorphic-git.github.io/docs/checkout.html)
- [clone](https://isomorphic-git.github.io/docs/clone.html)
- [commit](https://isomorphic-git.github.io/docs/commit.html)
- [currentBranch](https://isomorphic-git.github.io/docs/currentBranch.html)
- [deleteBranch](https://isomorphic-git.github.io/docs/deleteBranch.html)
- [deleteRef](https://isomorphic-git.github.io/docs/deleteRef.html)
- [deleteRemote](https://isomorphic-git.github.io/docs/deleteRemote.html)
- [deleteTag](https://isomorphic-git.github.io/docs/deleteTag.html)
- [expandOid](https://isomorphic-git.github.io/docs/expandOid.html)
- [expandRef](https://isomorphic-git.github.io/docs/expandRef.html)
- [fastForward](https://isomorphic-git.github.io/docs/fastForward.html)
- [fetch](https://isomorphic-git.github.io/docs/fetch.html)
- [findMergeBase](https://isomorphic-git.github.io/docs/findMergeBase.html)
- [findRoot](https://isomorphic-git.github.io/docs/findRoot.html)
- [getConfig](https://isomorphic-git.github.io/docs/getConfig.html)
- [getConfigAll](https://isomorphic-git.github.io/docs/getConfigAll.html)
- [getRemoteInfo](https://isomorphic-git.github.io/docs/getRemoteInfo.html)
- [getRemoteInfo2](https://isomorphic-git.github.io/docs/getRemoteInfo2.html)
- [hashBlob](https://isomorphic-git.github.io/docs/hashBlob.html)
- [indexPack](https://isomorphic-git.github.io/docs/indexPack.html)
- [init](https://isomorphic-git.github.io/docs/init.html)
- [isDescendent](https://isomorphic-git.github.io/docs/isDescendent.html)
- [isIgnored](https://isomorphic-git.github.io/docs/isIgnored.html)
- [listBranches](https://isomorphic-git.github.io/docs/listBranches.html)
- [listFiles](https://isomorphic-git.github.io/docs/listFiles.html)
- [listNotes](https://isomorphic-git.github.io/docs/listNotes.html)
- [listRefs](https://isomorphic-git.github.io/docs/listRefs.html)
- [listRemotes](https://isomorphic-git.github.io/docs/listRemotes.html)
- [listServerRefs](https://isomorphic-git.github.io/docs/listServerRefs.html)
- [listTags](https://isomorphic-git.github.io/docs/listTags.html)
- [log](https://isomorphic-git.github.io/docs/log.html)
- [merge](https://isomorphic-git.github.io/docs/merge.html)
- [packObjects](https://isomorphic-git.github.io/docs/packObjects.html)
- [pull](https://isomorphic-git.github.io/docs/pull.html)
- [push](https://isomorphic-git.github.io/docs/push.html)
- [readBlob](https://isomorphic-git.github.io/docs/readBlob.html)
- [readCommit](https://isomorphic-git.github.io/docs/readCommit.html)
- [readNote](https://isomorphic-git.github.io/docs/readNote.html)
- [readObject](https://isomorphic-git.github.io/docs/readObject.html)
- [readTag](https://isomorphic-git.github.io/docs/readTag.html)
- [readTree](https://isomorphic-git.github.io/docs/readTree.html)
- [remove](https://isomorphic-git.github.io/docs/remove.html)
- [removeNote](https://isomorphic-git.github.io/docs/removeNote.html)
- [renameBranch](https://isomorphic-git.github.io/docs/renameBranch.html)
- [resetIndex](https://isomorphic-git.github.io/docs/resetIndex.html)
- [resolveRef](https://isomorphic-git.github.io/docs/resolveRef.html)
- [setConfig](https://isomorphic-git.github.io/docs/setConfig.html)
- [stash](https://isomorphic-git.github.io/docs/stash.html)
- [status](https://isomorphic-git.github.io/docs/status.html)
- [statusMatrix](https://isomorphic-git.github.io/docs/statusMatrix.html)
- [tag](https://isomorphic-git.github.io/docs/tag.html)
- [updateIndex](https://isomorphic-git.github.io/docs/updateIndex.html)
- [version](https://isomorphic-git.github.io/docs/version.html)
- [walk](https://isomorphic-git.github.io/docs/walk.html)
- [writeBlob](https://isomorphic-git.github.io/docs/writeBlob.html)
- [writeCommit](https://isomorphic-git.github.io/docs/writeCommit.html)
- [writeObject](https://isomorphic-git.github.io/docs/writeObject.html)
- [writeRef](https://isomorphic-git.github.io/docs/writeRef.html)
- [writeTag](https://isomorphic-git.github.io/docs/writeTag.html)
- [writeTree](https://isomorphic-git.github.io/docs/writeTree.html)
