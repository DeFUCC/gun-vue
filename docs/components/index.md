![](/media/svg/components.svg)

## Components

Pluggable Gun DB + Vue UI components

WIP, no docs for now. Refer to [@gun-vue repo](https://github.com/davay42/gun-vue) and the use of the components in the [@gun-vue/demo](https://github.com/davay42/gun-vue/tree/master/demo)

## How to install

1. Install the components library: `npm i @gun-vue/components`
2. Import a component to your Vue 3 project: `import {RelayPulse} from '@gun-vue/components'`
3. Use the component in your SFC template: `<relay-pulse />`
4. Have fun combining different components with a shared Gun state.

## Relay

### Icon

A small blinking button, that shows basic stats for current Gun relay in use

```html
<relay-icon />
```

<GunVue component="RelayIcon" />

## User

### UserIcon

A powerful tool to manage current user. Click the icon and a modal window will appear. You can create a new user, login with an existing keypair (either encrypted or not), edit your profile fields and more.

```html
<user-icon :size="120" />
```

<GunVue component="UserIcon" :pr="{size:120}" />

## Feed

### FeedBlock

Immutable comments at any given url

```html
<feed-block />
```

<GunVue component="FeedBlock" />

## Space

A common meeting place in the gun universe. 1x1 field to place yout user at.

```html
<space-plane />
```

<GunVue component="SpacePlane" />
