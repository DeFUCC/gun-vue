![](/media/svg/components.svg)

## Components

Pluggable [Vue 3](https://v3.vuejs.org) + [Gun DB](https://gun.eco/docs/API) UI components

## How to install

1. Install the components library:

```shell
npm i @gun-vue/components
```

2. Import a component to your Vue 3 project:

```js
import { RelayPulse } from "@gun-vue/components";
```

3. Use the component in your SFC template:

```html
<relay-pulse />
```

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
