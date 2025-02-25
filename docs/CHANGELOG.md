# @gun-vue/docs

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

## 0.20.0

### Minor Changes

- 696d108: Fixed the bug by fixing versions of packages, no more bracket and automatic updates.

## 0.18.3

### Patch Changes

- Bump all deps

## 0.18.2

### Patch Changes

- All up to date and works as intended!

## 0.18.1

### Patch Changes

- tauri desktop app is now in a separate package for more clear code

## 0.18.0

### Minor Changes

- Cleaned up packages and very organized repository for everyone to enjoy.

## 0.17.3

### Patch Changes

- step one version

## 0.17.2

### Patch Changes

- file hashing and components list

## 0.17.1

### Patch Changes

- Guests lists are working fine for messaging example

## 0.17.0

### Minor Changes

- Finally we hae feature updates, not just the tooling and docs!

## 0.16.10

### Patch Changes

- many small fixes add to reliability much

## 0.16.9

### Patch Changes

- more consistent use of gun - always useGun()! This makes us more aware of context when it comes to debugging and checking out code

## 0.16.8

### Patch Changes

- Gun-es based build

## 0.16.7

### Patch Changes

- Build gun-es first.

## 0.16.6

### Patch Changes

- Now we have examples folder with plain HTML files utilizing the power of different levels of Gun-Vue. And one of the newly acessible layers is Vue itself! We're using almost all the functions in the code already, so it's only 3 kB more to share the whole reactivity system with the client. Makes building apps so easy!

## 0.16.5

### Patch Changes

- Fix the composables build and add the example.html to have it testedindepentenly. Also a very inspiring minimalistic code!

## 0.16.4

### Patch Changes

- The publish pipeline is finished! Can go furthur

## 0.16.3

### Patch Changes

- App package for the highest level of abstraction - low-code builder in a package.

## 0.16.2

### Patch Changes

- c93360ab: Testing automated NPM publishing

## 0.16.0

### Minor Changes

- Single file offline-first builds and playgrounds - p2p miracle!

## 0.15.2

### Patch Changes

- Feather light and lightning fast local-first apps

## 0.15.1

### Patch Changes

- Better docs with video blog and more!

## 0.15.0

### Minor Changes

- All actual js code is in the src folder. App, components and composables are just mere packages.

  The Typedoc + Vitepress documentation moved out to docs folder.

  Components will be documented there too, so we could remove Histoire from the system making the build process so much faster and more stable. Which makes it suitable for the GitHub Actions build pipeline from source to pages.
