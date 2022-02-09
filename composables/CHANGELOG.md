# @gun-vue/composables

## 0.7.1

### Patch Changes

- currentRoom is always accessible and easy to use. If you need another room - use it vie useRoom(pub). The format is the same.

## 0.7.0

### Minor Changes

- Rooms are fully integrated and work just fine. Anyone can have their own version of the app, or many versions! You create a room and manage it with certificates. More reliable structure and more fun examples. Try it!

## 0.6.6

### Patch Changes

- eae5908: Rooms got the spaces inside. Certificates help guests write their positions to the room space.
- 96a160f: Rooms introduced and barebones implemented. With new "square" `gunAvatar` backgrounds to have fun with!

## 0.6.5

### Patch Changes

- a69c6e2: More stable posts to become content-addressed posts space.

## 0.6.4

### Patch Changes

- Changeable relays

## 0.6.3

### Patch Changes

- 759ac0f: Space tech debt payed. Quite clean composable and navigatable space component. Links are more pronounced.

## 0.6.2

### Patch Changes

- Better bi-directional user links, refined posts UI, add posts to posts -> endless graph journeys are here

## 0.6.1

### Patch Changes

- 309d059: emoji links as an expressive communication symbols
- ceb689f: Nested posts can go into deeper and deeper into the hashed graph. Very fun experience. And also noew we got bi-directional links between accounts with emojis as an expression of relations.

## 0.6.0

### Minor Changes

- Stability +10

### Patch Changes

- 3693fce: better feeds design

## 0.5.10

### Patch Changes

- 7bbd9d2: meeting space with links in real time
- hashed content-addressed icons and covers are browsable too

## 0.5.9

### Patch Changes

- great docs setup. Solid foundation with zip file interchange.
- ae65b2e: better docs

## 0.5.8

### Patch Changes

- 7ea9cb6: zip is easy now

## 0.5.7

### Patch Changes

- detachable post actions components
- 2e21ea7: posts in zip files export and import

## 0.5.6

### Patch Changes

- aa7bd12: picture uploads

## 0.5.5

### Patch Changes

- bump deps and cleaner styles

## 0.5.4

### Patch Changes

- All dev environment is set up and running quite fast and reliable. Managing 5 projects in one monorepo is quite fun. 😅

## 0.5.1

### Patch Changes

- readme for npm

## 0.5.0

### Minor Changes

- A pretty concise workpace that builds up to a vitepress web-site. Docs, demo and all the info is gathered in the \_dist folder and is published to the fancy https://gun-vue.js.org - that deserves a 0.5 version status!

## 0.4.0

### Minor Changes

- f6842b0: Cleaner structure and vitepress test site. Embeddable site comments

## 0.3.10

### Patch Changes

- feed-block is out for tests

## 0.3.9

### Patch Changes

- comment system started

## 0.3.8

### Patch Changes

- no router-links in components

## 0.3.7

### Patch Changes

- ssr

## 0.3.5

### Patch Changes

- Gun is packed into useGun() function and the lib should be SSR-friendly now

## 0.3.4

### Patch Changes

- ESM and CJS versions with map files

## 0.3.1

### Patch Changes

- ESM only exports

## 0.3.0

### Minor Changes

- Consistent structure of module packages. Seems to be the first truly embeddable components package

## 0.2.12

### Patch Changes

- module

## 0.2.11

### Patch Changes

- got rid of autoimport of vue reactivity elements – the code is more transparent to read

## 0.2.10

### Patch Changes

- Star any post and have it listed in your account

## 0.2.9

### Patch Changes

- mate links visualized and editable

## 0.2.8

### Patch Changes

- Started building social graph. Now you can mate another user. Links show in the public space.

## 0.2.7

### Patch Changes

- Added simpleMDE as aa markdown editor. + over 200 kb of js code. Now demo app is over 1000 kB. It's still not very much code and it may be easily splitted into chunks. But I love the idea of being able to pack the whole app into one html file for ease of p2p distribution. even twice the size is OK for modern nets. (And caching)

## 0.2.6

### Patch Changes

- Feeds of tags, Markdown import and export for feeds and posts, space guests profiles

## 0.2.5

### Patch Changes

- d4d0825: direct links and encrypted pairs for users to handle

## 0.2.4

### Patch Changes

- layered routing as a way to persist data better

## 0.2.3

### Patch Changes

- 705ac51: user and account systems are separated

## 0.2.2

### Patch Changes

- more info about the packages

## 0.2.1

### Patch Changes

- 96f3812: log tree with worker sort

## 0.2.0

### Minor Changes

- The versions are linked for all 4 libs. Relay is using es module syntax. Space is now hashed and guest list is immutable.

## 0.1.15

### Patch Changes

- Space is a place to gather. You get a position there and may move at any place at any moment.

## 0.1.14

### Patch Changes

- More information about the packages. First announcement in the Gun community.

## 0.1.13

### Patch Changes

- link packages version

## 0.1.10

### Patch Changes

- Tags are ok, tree starts growing, more small icons with powers.

## 0.1.9

### Patch Changes

- Hash tagged posts are a great place to play with the immutable graph together
- 534c84d: tag labels can show number of posts

## 0.1.8

### Patch Changes

- hashed tags as a simple but effective demo

## 0.1.7

### Patch Changes

- 4e91317: JSDoc introduced. Good docs are the key to adoption
- Momentum is building

## 0.1.6

### Patch Changes

- The space plane is just a collection of links to actual users accounts, where their position is stored. And the collection is curated by anyone for now – you delete non active players when you join the space. This should be revisited, along with the age of an account (total and relative to the space).

## 0.1.5

### Patch Changes

- account controls are growing. Now we can have passwords and export keys in multiple ways. Logging in to a certain pair is next.

## 0.1.4

### Patch Changes

- basic components and composables: relay. account, space.

## 0.1.3

### Patch Changes

- started building up the core structure

## 0.1.2

### Patch Changes

- built

## 0.1.1

### Patch Changes

- process.env avoided

## 0.1.0

### Minor Changes

- Begin working on the contents of the packages
