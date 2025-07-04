# @gun-vue/components

## 0.25.1

### Patch Changes

- Bump deps and fix styles for components

## 0.25.0

### Minor Changes

- Authentication fully rebuilt with KDF.

## 0.24.2

### Patch Changes

- New Gun-Avatar and key derivation auth

## 0.24.1

### Patch Changes

- Much better credentials management - save and load JSON, QR, PNG keypairs interchangeably.

## 0.24.0

### Minor Changes

- # Gun-Vue 0.24

  Lean web-app achieved! Some bugs still persist, though not as critical as those already solved.

  - Proper PWA setup with offline capabilities

  - OPFS + Web-torrents dynamic file sharing space with integrations into chats across the app

  - New settings panel to hold all relay and configurations

  - Private Chats are now called messages and also display a chat with yourself, where you can store your notes in encrypted graph, encrypted and signed by your key on your machine.

  - Dialogs all the way! Now we have robust overlays with all user and room data that is shared between more specialized and isolated room features.

  - New voting system for public chat topics ensures coexistence of multiple communities in the same room

  - Improved security: `user.my_rooms` pub-keys are encrypted so even for every room we know who is the host, we don't know the exact rooms that user owns.

  - Fixed a couple of tiny bugs in encyption process, that was breaking the room keys operations. Now all goes smooth.

  - Relay now has a Node.js SEA (Single Executable Application) build! Build a relay yourself and run as a single executable ~95Mb in size. Our goal is not more than 5-10Mb.

  - Huge cleanup and distillation of components. Started removing jsdoc to have pure JS that is human- and machine-readable at the same time.

  - Updated docs with explanations, tutorials and reference

## 0.23.0

### Minor Changes

- Many small improvements and fixes along with some brreaking changes to the graph structure.

## 0.22.6

### Patch Changes

- Major docs update + fixes to the packages with external 'vue'

## 0.22.5

### Patch Changes

- Better UI and cleaner components for app builders

## 0.22.4

### Patch Changes

- Files major upgrade and better UI

## 0.22.3

### Patch Changes

- Better room logo
- Much better rooms creation and management.

## 0.22.2

### Patch Changes

- send private torrents, better rooms, less navigation clutter

## 0.22.1

### Patch Changes

- bottom menu bar

## 0.22.0

### Minor Changes

- New root room for full Files functionality as it's expanded to allow sharing any filetype

## 0.21.5

### Patch Changes

- Bump versions of all dependencies

## 0.21.4

### Patch Changes

- Accidentally published the package from console, not from the Github Action with all the certificates needed for the check mark on NPM. Now need to update all packages again.

## 0.21.3

### Patch Changes

- 0b6d3ab: Maintaining: dependencies updates, typo fixes, structure optimizations.

## 0.21.2

### Patch Changes

- Updated almost all dependencies, everything seems to work fine. And added manifest.json for the app to be installable. It will still be single file webapp as it may just work without loading the manifest file.

## 0.21.0

### Minor Changes

- Removed TS. Using JSDoc instead. Hope to make contributions to the code much easier

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.21.0

## 0.20.0

### Minor Changes

- 696d108: Fixed the bug by fixing versions of packages, no more bracket and automatic updates.

### Patch Changes

- Updated dependencies [696d108]
  - @gun-vue/composables@0.20.0

## 0.18.4

### Patch Changes

- Fix spellings and bump some deps
- Updated dependencies
  - @gun-vue/composables@0.18.4

## 0.18.3

### Patch Changes

- Bump all deps
- Updated dependencies
  - @gun-vue/composables@0.18.3

## 0.18.2

### Patch Changes

- All up to date and works as intended!
- Updated dependencies
  - @gun-vue/composables@0.18.2

## 0.18.1

### Patch Changes

- tauri desktop app is now in a separate package for more clear code
- Updated dependencies
  - @gun-vue/composables@0.18.1

## 0.18.0

### Minor Changes

- Cleaned up packages and very organized repository for everyone to enjoy.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.18.0

## 0.17.3

### Patch Changes

- step one version
- Updated dependencies
  - @gun-vue/composables@0.17.3

## 0.17.2

### Patch Changes

- file hashing and components list
- Updated dependencies
  - @gun-vue/composables@0.17.2

## 0.17.1

### Patch Changes

- Guests lists are working fine for messaging example
- Updated dependencies
  - @gun-vue/composables@0.17.1

## 0.17.0

### Minor Changes

- Finally we hae feature updates, not just the tooling and docs!

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.17.0

## 0.16.10

### Patch Changes

- many small fixes add to reliability much
- Updated dependencies
  - @gun-vue/composables@0.16.10

## 0.16.9

### Patch Changes

- more consistent use of gun - always useGun()! This makes us more aware of context when it comes to debugging and checking out code
- Updated dependencies
  - @gun-vue/composables@0.16.9

## 0.16.8

### Patch Changes

- Gun-es based build
- Updated dependencies
  - @gun-vue/composables@0.16.8

## 0.16.7

### Patch Changes

- Build gun-es first.
- Updated dependencies
  - @gun-vue/composables@0.16.7

## 0.16.6

### Patch Changes

- Now we have examples folder with plain HTML files utilizing the power of different levels of Gun-Vue. And one of the newly acessible layers is Vue itself! We're using almost all the functions in the code already, so it's only 3 kB more to share the whole reactivity system with the client. Makes building apps so easy!
- Updated dependencies
  - @gun-vue/composables@0.16.6

## 0.16.5

### Patch Changes

- Fix the composables build and add the example.html to have it testedindepentenly. Also a very inspiring minimalistic code!
- Updated dependencies
  - @gun-vue/composables@0.16.5

## 0.16.4

### Patch Changes

- The publish pipeline is finished! Can go furthur
- Updated dependencies
  - @gun-vue/composables@0.16.4

## 0.16.3

### Patch Changes

- App package for the highest level of abstraction - low-code builder in a package.
- Updated dependencies
  - @gun-vue/composables@0.16.3

## 0.16.2

### Patch Changes

- c93360ab: Testing automated NPM publishing
- Updated dependencies [c93360ab]
  - @gun-vue/composables@0.16.2

## 0.16.1

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.16.1

## 0.16.0

### Minor Changes

- Single file offline-first builds and playgrounds - p2p miracle!

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.16.0

## 0.15.2

### Patch Changes

- Feather light and lightning fast local-first apps
- Updated dependencies
  - @gun-vue/composables@0.15.2

## 0.15.1

### Patch Changes

- Better docs with video blog and more!
- Updated dependencies
  - @gun-vue/composables@0.15.1

## 0.15.0

### Minor Changes

- All actual js code is in the src folder. App, components and composables are just mere packages.

  The Typedoc + Vitepress documentation moved out to docs folder.

  Components will be documented there too, so we could remove Histoire from the system making the build process so much faster and more stable. Which makes it suitable for the GitHub Actions build pipeline from source to pages.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.15.0

## 0.14.4

### Patch Changes

- lighter should be better. More attention to focus of actual code and docs.
- Updated dependencies
  - @gun-vue/composables@0.14.4

## 0.14.3

### Patch Changes

- private messaging in a separate module
- Updated dependencies
  - @gun-vue/composables@0.14.3

## 0.14.2

### Patch Changes

- Full dark mode support
- Updated dependencies
  - @gun-vue/composables@0.14.2

## 0.14.1

### Patch Changes

- Bug fixes after transition to the new architecture
- Updated dependencies
  - @gun-vue/composables@0.14.1

## 0.14.0

### Minor Changes

- e880a4dc: App pages are now exposed in the repo root to have them at hand while development.

### Patch Changes

- Updated dependencies [e880a4dc]
  - @gun-vue/composables@0.14.0

## 0.13.2

### Patch Changes

- ce189add: More ts and better user profile browsinf
- Updated dependencies [ce189add]
  - @gun-vue/composables@0.13.2

## 0.13.1

### Patch Changes

- Async components exports and more ts
- Updated dependencies
  - @gun-vue/composables@0.13.1

## 0.13.0

### Minor Changes

- Vertical organisation means composables and components are in the same SRC folder, yet go into separate packages.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.13.0

## 0.12.10

### Patch Changes

- Correct style.css export for components.
- Updated dependencies
  - @gun-vue/composables@0.12.10

## 0.12.9

### Patch Changes

- Proper style exports
- Updated dependencies
  - @gun-vue/composables@0.12.9

## 0.12.8

### Patch Changes

- new root
- Updated dependencies
  - @gun-vue/composables@0.12.8

## 0.12.7

### Patch Changes

- ee997997: Room fixes and posts refined.
- Typedoc fully configured https://typedoc.org
- Updated dependencies [ee997997]
  - @gun-vue/composables@0.12.7

## 0.12.6

### Patch Changes

- 0238ee39: All composables are converted to TS. With autogenerated documentation site by TypeDoc and Vitepress.
- Updated dependencies [0238ee39]
  - @gun-vue/composables@0.12.6

## 0.12.5

### Patch Changes

- af064992: Typescript transition started. For the sake of future developers. It's quite nice to see the types infered out of existing js code. And we can gradually add more typing without breaking anything. So let's go!
- Updated dependencies [af064992]
  - @gun-vue/composables@0.12.5

## 0.12.4

### Patch Changes

- fix icons
- Updated dependencies
  - @gun-vue/composables@0.12.4

## 0.12.3

### Patch Changes

- Uno.css fully landed. Icons are all class based now. And project section gradually evolves.
- Updated dependencies
  - @gun-vue/composables@0.12.3

## 0.12.2

### Patch Changes

- 56d8ceb6: uno.css instead of windicss
- much cleaner code with eslint

## 0.12.1

### Patch Changes

- Update GUN to v.0.2020.1239
- Updated dependencies
  - @gun-vue/composables@0.12.1

## 0.12.0

### Minor Changes

- More stable builds with no manual chunking. Also a dedicated test app just started to evolve.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.12.0

## 0.11.8

### Patch Changes

- Export fix
- Updated dependencies
  - @gun-vue/composables@0.11.8

## 0.11.7

### Patch Changes

- More consistent docs
- Updated dependencies
  - @gun-vue/composables@0.11.7

## 0.11.6

### Patch Changes

- 6863ea4f: type module composables
- Updated dependencies [6863ea4f]
  - @gun-vue/composables@0.11.6

## 0.11.5

### Patch Changes

- Composables export fix
- Updated dependencies
  - @gun-vue/composables@0.11.5

## 0.11.4

### Patch Changes

- Better app UI: grid, sidebar and bug fixes. Better gifts/wallets. + GUN version update 0.2020.1238
- Updated dependencies
  - @gun-vue/composables@0.11.4

## 0.11.2

### Patch Changes

- gifts connected with projects
- Updated dependencies
  - @gun-vue/composables@0.11.2

## 0.11.1

### Patch Changes

- 51b00989: Gifts are connected to the rooms and the projects. Rooms are gift collections - nice for indexing and showing project gifts.
- 9b131abe: Chat has virtual scrolling and debounced sorting, so it should be quite stable even for thousands of messages.
- Updated dependencies [51b00989]
- Updated dependencies [9b131abe]
  - @gun-vue/composables@0.11.1

## 0.11.0

### Minor Changes

- Now we have a desktop app builds (powered with tauri). Need some cleanup for smaller package size, but the basic functionality is up and running.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.11.0

## 0.10.3

### Patch Changes

- Projects will be one of the key parts for p2p collaboration. Started building this feature today.
- Updated dependencies
  - @gun-vue/composables@0.10.3

## 0.10.2

### Patch Changes

- More components showcased - easier design and development
- Updated dependencies
  - @gun-vue/composables@0.10.2

## 0.10.1

### Patch Changes

- Vue plugin components export
- Updated dependencies
  - @gun-vue/composables@0.10.1

## 0.10.0

### Minor Changes

- 7e698868: Component documentation built with Histoire now is the main place for GunVue development and showcasing. It makes us think in independent modules and build reusable pieces of Vue code. The setup is quite convenient and robust. We've got rid of the Vitepress composables documentation completely and moved the autogenerated JSDocs to a separate story inside the components source.

### Patch Changes

- Updated dependencies [7e698868]
  - @gun-vue/composables@0.10.0

## 0.9.5

### Patch Changes

- Renamed all components to full names - no directoryas namespace option of unplugin-components needed any more. This should make the components more stable on some case sensitive Linux systems and avoid any naming collisions. And now we can showcase all of the components one by one with the Histoire lib. Majestic!

## 0.9.4

### Patch Changes

- e9cdf199: Gift exchange started
- 960a869c: Histroire components stories fit into the build. Had to disable VitePWA for it to work properly in a nested folder.
- Updated dependencies [e9cdf199]
  - @gun-vue/composables@0.9.4

## 0.9.3

### Patch Changes

- 7755eb73: move and draw on the infinite space plane
- 29219a58: basic collaborative vector drawings
- 9378cee9: Bumped deps
- Updated dependencies [7755eb73]
- Updated dependencies [29219a58]
- Updated dependencies [9378cee9]
  - @gun-vue/composables@0.9.3

## 0.9.2

### Patch Changes

- All components exported

## 0.9.1

### Patch Changes

- 7fbbabb6: Dictionary is up and running!
- 99500a06: Collaborative dictionary started, TBD
- 5071f7bc: Collaborative dictionary as a means of synchronization
- Updated dependencies [7fbbabb6]
- Updated dependencies [99500a06]
- Updated dependencies [5071f7bc]
  - @gun-vue/composables@0.9.1

## 0.9.0

### Minor Changes

- New posts scheme and 'lists' certs removed. So breaking changes.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.9.0

## 0.8.3

### Patch Changes

- 6eedc81: More consistent posts that begin with a sigle post hash and grow from there. Very onfigurable.
- Updated dependencies [6eedc81]
  - @gun-vue/composables@0.8.3

## 0.8.2

### Patch Changes

- more usable reactions as a new form of collaborative content moderation and better post cards
- d418d44: cleaner navigation
- Updated dependencies
- Updated dependencies [d418d44]
  - @gun-vue/composables@0.8.2

## 0.8.1

### Patch Changes

- vertical post data
- Updated dependencies
  - @gun-vue/composables@0.8.1

## 0.8.0

### Minor Changes

- demo becomes app

### Patch Changes

- a248364: User graph visualization
- 0213424: Keep alive routes and more atomic components
- Updated dependencies [0213424]
- Updated dependencies
  - @gun-vue/composables@0.8.0

## 0.7.8

### Patch Changes

- 3548311: Volunteer DHT relays
- Updated dependencies [3548311]
  - @gun-vue/composables@0.7.8

## 0.7.7

### Patch Changes

- 2113e36: Reactions are more powerful now. You can plus OR minus a post and it will make it move up or down in the list. If a post has negative rating, it's filtered out. So... collective moderation becomes possible.
- Updated dependencies [2113e36]
  - @gun-vue/composables@0.7.7

## 0.7.6

### Patch Changes

- A p2p app ready to be shipped from Skynet Homescreen
- Updated dependencies
  - @gun-vue/composables@0.7.6

## 0.7.5

### Patch Changes

- Basic encrypted chat is available for everyone! Send messages in daily buckets with encrypted timestamps
- Updated dependencies
  - @gun-vue/composables@0.7.5

## 0.7.4

### Patch Changes

- package info update
- Updated dependencies
  - @gun-vue/composables@0.7.4

## 0.7.3

### Patch Changes

- New stage of data management. Need some time to create form components, but then users will be immediately edit their profiles and also their room profiles.
- 11e3054: Post reactions are fully implemented. Your vote makes quite an impact. You make the post rise in the list and also add it to your page under the chosen reaction. Be creative!
- 4fd4a99: Better certificates management. Now every host of a room has his own set of certificates for room management. And all the public certificates are now "features" and once we got many of them we can make the hosts manage them too!
- Updated dependencies
- Updated dependencies [11e3054]
- Updated dependencies [4fd4a99]
  - @gun-vue/composables@0.7.3

## 0.7.2

### Patch Changes

- cec7dad: Users can upload a square avatar and it shows instead of the generative icon.
- Emoji links between posts make the whole posts space so much more expressive! It's interesting to experiment with building some useful knowledge graph collaboratively.
- Updated dependencies [cec7dad]
- Updated dependencies
  - @gun-vue/composables@0.7.2

## 0.7.1

### Patch Changes

- currentRoom is always accessible and easy to use. If you need another room - use it vie useRoom(pub). The format is the same.
- Updated dependencies
  - @gun-vue/composables@0.7.1

## 0.7.0

### Minor Changes

- Rooms are fully integrated and work just fine. Anyone can have their own version of the app, or many versions! You create a room and manage it with certificates. More reliable structure and more fun examples. Try it!

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.7.0

## 0.6.6

### Patch Changes

- eae5908: Rooms got the spaces inside. Certificates help guests write their positions to the room space.
- 96a160f: Rooms introduced and barebones implemented. With new "square" `gunAvatar` backgrounds to have fun with!
- Updated dependencies [eae5908]
- Updated dependencies [96a160f]
  - @gun-vue/composables@0.6.6

## 0.6.5

### Patch Changes

- a69c6e2: More stable posts to become content-addressed posts space.
- Updated dependencies [a69c6e2]
  - @gun-vue/composables@0.6.5

## 0.6.4

### Patch Changes

- Changeable relays
- Updated dependencies
  - @gun-vue/composables@0.6.4

## 0.6.3

### Patch Changes

- 759ac0f: Space tech debt payed. Quite clean composable and navigatable space component. Links are more pronounced.
- Updated dependencies [759ac0f]
  - @gun-vue/composables@0.6.3

## 0.6.2

### Patch Changes

- Better bi-directional user links, refined posts UI, add posts to posts -> endless graph journeys are here
- Updated dependencies
  - @gun-vue/composables@0.6.2

## 0.6.1

### Patch Changes

- 309d059: emoji links as an expressive communication symbols
- ceb689f: Nested posts can go into deeper and deeper into the hashed graph. Very fun experience. And also noew we got bi-directional links between accounts with emojis as an expression of relations.
- Updated dependencies [309d059]
- Updated dependencies [ceb689f]
  - @gun-vue/composables@0.6.1

## 0.6.0

### Minor Changes

- Stability +10

### Patch Changes

- 3693fce: better feeds design
- Updated dependencies
- Updated dependencies [3693fce]
  - @gun-vue/composables@0.6.0

## 0.5.10

### Patch Changes

- 7bbd9d2: meeting space with links in real time
- hashed content-addressed icons and covers are browsable too
- Updated dependencies [7bbd9d2]
- Updated dependencies
  - @gun-vue/composables@0.5.10

## 0.5.9

### Patch Changes

- great docs setup. Solid foundation with zip file interchange.
- ae65b2e: better docs
- Updated dependencies
- Updated dependencies [ae65b2e]
  - @gun-vue/composables@0.5.9

## 0.5.8

### Patch Changes

- 7ea9cb6: zip is easy now
- Updated dependencies [7ea9cb6]
  - @gun-vue/composables@0.5.8

## 0.5.7

### Patch Changes

- detachable post actions components
- 2e21ea7: posts in zip files export and import
- Updated dependencies
- Updated dependencies [2e21ea7]
  - @gun-vue/composables@0.5.7

## 0.5.6

### Patch Changes

- aa7bd12: picture uploads
- Updated dependencies [aa7bd12]
  - @gun-vue/composables@0.5.6

## 0.5.5

### Patch Changes

- bump deps and cleaner styles
- Updated dependencies
  - @gun-vue/composables@0.5.5

## 0.5.4

### Patch Changes

- All dev environment is set up and running quite fast and reliable. Managing 5 projects in one monorepo is quite fun. 😅
- Updated dependencies
  - @gun-vue/composables@0.5.4

## 0.5.3

### Patch Changes

- external vue

## 0.5.2

### Patch Changes

- embed vue for experiments with codepen

## 0.5.1

### Patch Changes

- readme for npm
- Updated dependencies
  - @gun-vue/composables@0.5.1

## 0.5.0

### Minor Changes

- A pretty concise workpace that builds up to a vitepress web-site. Docs, demo and all the info is gathered in the \_dist folder and is published to the fancy https://gun-vue.js.org - that deserves a 0.5 version status!

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.5.0

## 0.4.1

### Patch Changes

- all styles are in place

## 0.4.0

### Minor Changes

- f6842b0: Cleaner structure and vitepress test site. Embeddable site comments

### Patch Changes

- Updated dependencies [f6842b0]
  - @gun-vue/composables@0.4.0

## 0.3.10

### Patch Changes

- feed-block is out for tests
- Updated dependencies
  - @gun-vue/composables@0.3.10

## 0.3.9

### Patch Changes

- comment system started
- Updated dependencies
  - @gun-vue/composables@0.3.9

## 0.3.8

### Patch Changes

- no router-links in components
- Updated dependencies
  - @gun-vue/composables@0.3.8

## 0.3.7

### Patch Changes

- ssr
- Updated dependencies
  - @gun-vue/composables@0.3.7

## 0.3.6

### Patch Changes

- ssr-friendly user-icon

## 0.3.5

### Patch Changes

- Gun is packed into useGun() function and the lib should be SSR-friendly now
- Updated dependencies
  - @gun-vue/composables@0.3.5

## 0.3.4

### Patch Changes

- ESM and CJS versions with map files
- Updated dependencies
  - @gun-vue/composables@0.3.4

## 0.3.3

### Patch Changes

- exports

## 0.3.2

### Patch Changes

- mjs

## 0.3.1

### Patch Changes

- ESM only exports
- Updated dependencies
  - @gun-vue/composables@0.3.1

## 0.3.0

### Minor Changes

- Consistent structure of module packages. Seems to be the first truly embeddable components package

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.3.0

## 0.2.12

### Patch Changes

- module
- Updated dependencies
  - @gun-vue/composables@0.2.12

## 0.2.11

### Patch Changes

- got rid of autoimport of vue reactivity elements – the code is more transparent to read
- Updated dependencies
  - @gun-vue/composables@0.2.11

## 0.2.10

### Patch Changes

- Star any post and have it listed in your account
- Updated dependencies
  - @gun-vue/composables@0.2.10

## 0.2.9

### Patch Changes

- mate links visualized and editable
- Updated dependencies
  - @gun-vue/composables@0.2.9

## 0.2.8

### Patch Changes

- Started building social graph. Now you can mate another user. Links show in the public space.
- Updated dependencies
  - @gun-vue/composables@0.2.8

## 0.2.7

### Patch Changes

- Added simpleMDE as aa markdown editor. + over 200 kb of js code. Now demo app is over 1000 kB. It's still not very much code and it may be easily splitted into chunks. But I love the idea of being able to pack the whole app into one html file for ease of p2p distribution. even twice the size is OK for modern nets. (And caching)
- Updated dependencies
  - @gun-vue/composables@0.2.7

## 0.2.6

### Patch Changes

- Feeds of tags, Markdown import and export for feeds and posts, space guests profiles
- Updated dependencies
  - @gun-vue/composables@0.2.6

## 0.2.5

### Patch Changes

- d4d0825: direct links and encrypted pairs for users to handle
- Updated dependencies [d4d0825]
  - @gun-vue/composables@0.2.5

## 0.2.4

### Patch Changes

- layered routing as a way to persist data better
- Updated dependencies
  - @gun-vue/composables@0.2.4

## 0.2.3

### Patch Changes

- 705ac51: user and account systems are separated
- Updated dependencies [705ac51]
  - @gun-vue/composables@0.2.3

## 0.2.2

### Patch Changes

- more info about the packages
- Updated dependencies
  - @gun-vue/composables@0.2.2

## 0.2.1

### Patch Changes

- 96f3812: log tree with worker sort
- Updated dependencies [96f3812]
  - @gun-vue/composables@0.2.1

## 0.2.0

### Minor Changes

- The versions are linked for all 4 libs. Relay is using es module syntax. Space is now hashed and guest list is immutable.

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.2.0

## 0.1.15

### Patch Changes

- Space is a place to gather. You get a position there and may move at any place at any moment.
- Updated dependencies
  - @gun-vue/composables@0.1.15

## 0.1.14

### Patch Changes

- More information about the packages. First announcement in the Gun community.
- Updated dependencies
  - @gun-vue/composables@0.1.14

## 0.1.13

### Patch Changes

- link packages version
- Updated dependencies
  - @gun-vue/composables@0.1.13

## 0.1.12

### Patch Changes

- Tags are ok, tree starts growing, more small icons with powers.
- Updated dependencies
  - @gun-vue/composables@0.1.10

## 0.1.11

### Patch Changes

- Hash tagged posts are a great place to play with the immutable graph together
- 534c84d: tag labels can show number of posts
- Updated dependencies
- Updated dependencies [534c84d]
  - @gun-vue/composables@0.1.9

## 0.1.10

### Patch Changes

- hashed tags as a simple but effective demo
- Updated dependencies
  - @gun-vue/composables@0.1.8

## 0.1.9

### Patch Changes

- Momentum is building
- Updated dependencies [4e91317]
- Updated dependencies
  - @gun-vue/composables@0.1.7

## 0.1.8

### Patch Changes

- The space plane is just a collection of links to actual users accounts, where their position is stored. And the collection is curated by anyone for now – you delete non active players when you join the space. This should be revisited, along with the age of an account (total and relative to the space).
- Updated dependencies
  - @gun-vue/composables@0.1.6

## 0.1.7

### Patch Changes

- account controls are growing. Now we can have passwords and export keys in multiple ways. Logging in to a certain pair is next.
- Updated dependencies
  - @gun-vue/composables@0.1.5

## 0.1.6

### Patch Changes

- basic components and composables: relay. account, space.
- Updated dependencies
  - @gun-vue/composables@0.1.4

## 0.1.5

### Patch Changes

- started building up the core structure
- Updated dependencies
  - @gun-vue/composables@0.1.3

## 0.1.4

### Patch Changes

- built
- Updated dependencies
  - @gun-vue/composables@0.1.2

## 0.1.3

### Patch Changes

- process.env avoided
- Updated dependencies
  - @gun-vue/composables@0.1.1

## 0.1.2

### Patch Changes

- e6e3141: universal build for UMD

## 0.1.1

### Patch Changes

- Custom components export

## 0.1.0

### Minor Changes

- Begin working on the contents of the packages

### Patch Changes

- Updated dependencies
  - @gun-vue/composables@0.1.0
