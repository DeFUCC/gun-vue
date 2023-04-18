---
title: Tech stack
---

# Gun-Vue tech stack

The name of the app states the two main libs that we use. But there's so much more!

## Composables

## Components

## App

- [Vite](https://vitejs.dev) - Next Generation Frontend Tooling

## Docs

- [Vitepress](https://vitepress.dev/) - Vite & Vue Powered Static Site Generator. Simple, powerful, and fast. Meet the modern SSG framework you've always wanted.
  - [Local search](https://github.com/vuejs/vitepress/blob/1769d329cc1f517136d9a543385edce335e5dd24/src/node/plugins/localSearchPlugin.ts) - need to fix the indexing (https://github.com/lucaong/minisearch/)
  - [Config](https://vitepress.dev/reference/site-config)

## Relay

- [Express](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

## Shared tools

- [pnpm workspaces](https://pnpm.io/workspaces) - pnpm has built-in support for monorepositories (AKA multi-package repositories, multi-project repositories, or monolithic repositories). You can create a workspace to unite multiple projects inside a single repository.
- [Changesets](https://github.com/changesets/changesets) - A tool to manage versioning and changelogs with a focus on multi-package repositories
- [TypeDoc](https://typedoc.org/) - TypeDoc converts comments in TypeScript source code into rendered HTML documentation or a JSON model.