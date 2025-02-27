---
title: Tech stack
---

# Gun-Vue tech stack

The project is structured as a monorepo with three main packages, each serving a specific purpose.

## Composables (`@gun-vue/composables`)

Core functionality and data management:

- **Gun.js Integration**: Uses `gun` (0.2020.1240) and `@gun-vue/gun-es` for decentralized data
- **Utility Libraries**:
  - `@vueuse/core`, `@vueuse/integrations`, `@vueuse/math` for Vue composition utilities
  - `markdown-it` for Markdown processing with external links support
  - `webtorrent` for P2P file sharing
  - `recordrtc` for recording capabilities
  - `jszip` for file compression
  - `fuse.js` for fuzzy search
- **Helper Libraries**:
  - `curved-arrows` for visual connections
  - `drauu` for drawing capabilities
  - `gun-avatar` for user avatars
  - `qrcode` for QR code generation
  - `color-hash` for consistent color generation

## Components (`@gun-vue/components`)

UI and visualization layer:

- **UI Framework**: Built with Vue 3
- **Styling**: Uses `unocss` with Pug templating
- **Interactive Elements**:
  - `floating-vue` for tooltips and popovers
  - `force-graph` for network visualizations
  - `vue3-virtual-scroll-list` for efficient list rendering
  - `@vueuse/gesture` for touch interactions
  - `@vueuse/sound` for audio feedback
- **Formatting**: `@coders-tm/vue-number-format` for number formatting
- **QR Code**: `jsqr` for QR code scanning

## App (`@gun-vue/app`)

Application shell and routing:

- **Core**: Built with Vue 3
- **Routing**: `vue-router` for page navigation
- **Development**:
  - `vite-plugin-pages` for file-based routing
  - `vite-plugin-pages-sitemap` for sitemap generation
  - `vite-plugin-singlefile` for single-file builds
- **UI**: Uses `unocss` for styling
- **Animation**: `ola` for smooth animations

## Development Tools

- [Vite](https://vitejs.dev) - Next Generation Frontend Tooling
- [pnpm workspaces](https://pnpm.io/workspaces) - Monorepo management
- [TypeDoc](https://typedoc.org/) - Documentation generation

## Documentation

- [Vitepress](https://vitepress.dev/) - Documentation site generator
- [Diataxis](https://diataxis.fr/) - Documentation structure framework
