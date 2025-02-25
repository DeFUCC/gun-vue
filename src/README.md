# Gun-Vue: Features (/src)

<a href="https://gun-vue.js.org">
  <img src="https://gun-vue.js.org/media/gun-vue-logo.svg" alt="@gun-vue logo" width="250" />
</a>

[GitHub (gun-vue/src)](https://github.com/DeFUCC/gun-vue/tree/master/src) •
[Docs](https://gun-vue.js.org)
<br><br>
A collection of feature-focused code - **composables** (business logic), **components** (UI), and **routes** (navigation) - for building Offline-First, Progressive Web Apps (PWAs) using [Gun](https://gun.eco), [SEA](https://gun.eco/docs/SEA), and [Vue 3](https://vuejs.org).

> This code is part of [**Gun-Vue: The Peer-to-Peer Web App Toolkit**](https://github.com/DeFUCC/gun-vue).

[**📱 Try the Gun-Vue: Demo App!**](https://gun-vue.js.org/app) and check out its repo at [gun-vue/app](https://github.com/DeFUCC/gun-vue/tree/master/app) to see how these pieces come together into a functioning Single Page Peer-to-Peer Web App.

## Explanation of Gun-Vue: Features

### Example Structure

Below is a simple example of how **Gun-Vue: Feature** is organized:

```plaintext
/src/widget/
  ├ useWidget.js      (Composable)
  ├ WidgetDisplay.vue (Component)
  ├ routes.js          (Route definitions)
  ├ README.md          (Feature-specific notes & usage)
  └ ...
```

### [**Gun-Vue: Composables**](https://github.com/DeFUCC/gun-vue/tree/master/composables)
> [Typedoc Reference](https://gun-vue.js.org/reference/typedoc/modules.html)
  
  Reusable logic built with the Vue 3 Composition API. Manages Gun database interactions, SEA encryption, and reactive state.


### [**Gun-Vue: Components**](https://github.com/DeFUCC/gun-vue/tree/master/components)

  Vue Single-File Components (SFC) providing ready-to-use UI powered by UnoCSS, Pug templates, and your feature’s composables.  

### **Routes**

  File-based routing that ties composables and components into a complete user flow. Typically exported from `routes.js` and mapped to URLs in your app’s router.

## How to Get Started

### StackBlitz Starter Project  
Launch the **[Gun-Vue: StackBlitz Starter Project](https://stackblitz.com/edit/gun-vue?embed=1&file=src/App.vue)** for a quick, no-setup demo highlighting core Gun-Vue features in a basic Vue 3 app.

### Build It Yourself

1. **Clone the Monorepo & Install**  
   Refer to the [main Gun-Vue README](https://github.com/DeFUCC/gun-vue) for steps on cloning, installing dependencies, and running the development environment with `pnpm`.

2. **Pick a Feature**  
   Each subfolder in `src/` (e.g., `accounts`, `chat`, `posts`) is a self-contained feature. Explore its `README.md` or code to understand how composables, components, and routes are organized.

3. **Extend or Create New Features**  
   Mix and match existing logic, or develop new composables and components for your own P2P use cases. Simply **add or modify** a folder here, then **import** it into your main app’s router or pages.

---

## List of Gun-Vue: Features
### Identity & Access

- [**auth**](https://github.com/DeFUCC/gun-vue/tree/master/src/auth)  
  Handles user credentials, password-based logins, and secure sessions, letting you manage peer-to-peer authentication with ease.  
- [**account**](https://github.com/DeFUCC/gun-vue/tree/master/src/account)  
  Full suite of user account displays—avatars, badges, profiles, reactions, and more—driven by a single public key for rich identity in your P2P app. 
- [**user**](https://github.com/DeFUCC/gun-vue/tree/master/src/user)  
  Local-first, reactive P2P authentication layer built atop gun.user() and SEA—handling sign-up, sign-in, identity persistence, and decentralized user profiles (avatars, names, etc.).

---

### Data, Storage & Networking

- [**cast**](https://github.com/DeFUCC/gun-vue/tree/master/src/cast)  
  Capture and record audio/video from user devices with reactive controls, simplifying real-time media streaming or uploads.
- [**crypto**](https://github.com/DeFUCC/gun-vue/tree/master/src/crypto)  
  Main cryptographic primitives for end-to-end encrypted messaging, key generation, and more.  
- [**files**](https://github.com/DeFUCC/gun-vue/tree/master/src/files)  
  Composables and utilities for file management, from local uploads and markdown parsing to torrent-based distribution.
- [**gun**](https://github.com/DeFUCC/gun-vue/tree/master/src/gun)  
  Sets up the [Gun](https://gun.eco) database backbone—complete with Web Worker concurrency, relay connections, and real-time data sync for your decentralized app.
- [**private**](https://github.com/DeFUCC/gun-vue/tree/master/src/private)  
  Engage in fully encrypted, one-on-one or group chats—secured by elliptic keys and daily batch mixing—with optional real-time notifications.
- [**project**](https://github.com/DeFUCC/gun-vue/tree/master/src/project)  
  Design, organize, and update collaborative public projects end-to-end, covering everything from brainstorming and resource planning to task management and final presentations.
- [**qr**](https://github.com/DeFUCC/gun-vue/tree/master/src/qr)  
  Experimental lab for scanning, generating, and handling QR codes—useful for user/device pairing, link sharing, and quick visual data transfer in your P2P apps.

---

### Content & Collaboration

- [**chat**](https://github.com/DeFUCC/gun-vue/tree/master/src/chat)  
  Topic-based public or group chat with certificate-based moderation; users can create, hide, or join discussions for real-time conversations.
- [**dict**](https://github.com/DeFUCC/gun-vue/tree/master/src/dict)  
  A crowdsourced dictionary where community members propose, refine, and vote on word definitions.
- [**embed**](https://github.com/DeFUCC/gun-vue/tree/master/src/embed)  
  Seamlessly integrate external media (e.g., YouTube videos) into your P2P app with ready-to-use iframe-based embedding components. 
- [**form**](https://github.com/DeFUCC/gun-vue/tree/master/src/form)  
  Rapidly build forms with reusable Vue components, capturing user input (text, links, images) and emitting validated results.
- [**gift**](https://github.com/DeFUCC/gun-vue/tree/master/src/gift)  
  Implements a gift economy framework with wish-lists, peer-to-peer contributions, and project-based giving—track who gave what, to whom, and why.  
- [**mate**](https://github.com/DeFUCC/gun-vue/tree/master/src/mate)  
  Foster user-to-user connections with an emoji-based buddy system—managing friendly ties, nicknames, and mutual relationships in a decentralized network.  
- [**my**](https://github.com/DeFUCC/gun-vue/tree/master/src/my)  
  Centralized ‘personal hub’ for each user—housing custom routes, profiles, and social features under a unified ‘My Account’ area.  
- [**post**](https://github.com/DeFUCC/gun-vue/tree/master/src/post)  
  Publish hashed and timestamped content with tagging, file attachments, and emoji reactions—powering truly decentralized posts and discussions.
- [**room**](https://github.com/DeFUCC/gun-vue/tree/master/src/room)  
  Create collaborative ‘rooms’ with invite-based or certificate-backed access control—managing guests, presence, and shared data in real time.
- [**space**](https://github.com/DeFUCC/gun-vue/tree/master/src/space)  
  Demo showcasing how to handle private user data in a shared environment.

---

### UI & Visual

- [**styles**](https://github.com/DeFUCC/gun-vue/tree/master/src/styles)  
  Common styling resources or CSS files shared across different features.  
- [**ui**](https://github.com/DeFUCC/gun-vue/tree/master/src/ui)  
  General UI utilities and components (e.g., layout, buttons, or design patterns).
