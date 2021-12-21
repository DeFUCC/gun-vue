![@gun-vue logo](https://raw.githubusercontent.com/davay42/gun-vue/master/demo/public/gun-vue-logo.svg)

# GUN-VUE

Gun-vue – is where the peer-to-peer javascript database Gun meets the reactivity system of Vue 3. Easy to import composables for devs. Pluggable components for UX designers. Relay peer for enthusiasts. Demos and docs for starters. Open source for everyone!

[Watch a youtube video showcase](https://www.youtube.com/watch?v=4hpVRgVQvsY)

## @gun-vue

There are 3 packages in the [@gun-vue organization](https://www.npmjs.com/settings/gun-vue/packages) for you to install and use.

### Composables

[@gun-vue/composables](https://www.npmjs.com/package/@gun-vue/composables)

A set of composable functions for use with Vue 3 Composition API

### Components

[@gun-vue/components](https://www.npmjs.com/package/@gun-vue/components)

A set of ready to use Vue 3 components as building blocks to implement Gun powered interactivity in seconds

## Relay

[@gun-vue/relay](https://www.npmjs.com/package/@gun-vue/relay)

A simple no-store Gun server for throwing to any free tier Node.js environment.

## DEMO

Try them all yourself in the demo app.

[defucc.github.io/gun-vue](https://defucc.github.io/gun-vue)

## TO DO

We use different tools for development process organisation. I'm using Taskade it for everyone to have fun with building p2p apps. Jump in our project! https://www.taskade.com/d/XtaACTKmN4KqSC1v?share=view&view=hsVKduBWoYMa9S7a

> Guys, I’m back to Gun-related dev projects and this time I want to make a solid foundation not for a new app, but for a bunch of fun p2p experiments. I build apps with Vue 3 and Vite, so I’ve started a @gun-vue project that includes all bindings for all common gun things like auth and more. With it creating a gun-powered app will become a trivial thing of combining simple components and composable functions.

> It a monorepo that has a couple of packages inside:

> - @gun-vue/composables - exports Vue Composition API use… functions to easily implement in a Vie component environment. And there’re not only gun things, but also svg mouse bindings and many more awesome things like uploading and downloading SEA pairs as JSON or QR-code jpgs.
> - @gun-vue/components - it’s a collection of ready to use components that can be used to build a gun-powered app in a few lines of HTML code. Just import an account-avatar component and you got all the stuff to manage gun.user() account credentials.
> - @gun-vue/relay - a simple no-store gun relay to be imported and started with just two lines of code on any free tier hosting like glitch.com or heroku

> There’s a demo app that I use to develop and test the moving parts. It works nice for me, but there’s huge room to improve it. I use pnpm workspaces and changesets js to manage the packages versions and publish them to npm. But still there are no automatic tests and no component docs like Storybook (I tried it, but it’s a huge web pack monster, no thanks). I write simple JS, and instead of TS mess I use JSDoc to document and generate the documentation.

> The project is barely started, I plan to implement many simple and complex scenarios like secure chatrooms and more. And hope some of you feel the same encouragement with the sheer power of Gun database + Vue reactivity system combination. I love the speed of the development and of the app itself. And with all those fancy things like client side QR code analyzing the app bundle is just around 600 kB unzipped. I happily deploy it to Skynet and it works just fine.

> I know @amark likes videos about the projects, so here it is. https://www.youtube.com/watch?v=4hpVRgVQvsY Sorry for my English and a 1 hour timing, I tried to document everything, for history sake ))

> It’s a long way to make it something serious and reliable, but I already have so much fun with trashing the immutable public graph with test nodes ) My philosophy here is to let Graph data evolve and show the new ways of working with data in the p2p offline-first approach. May be it can inspire you too!

> My project announcement in the [gun gitter chat](https://gitter.im/amark/gun)
