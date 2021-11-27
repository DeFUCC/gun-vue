# Vue 3 Spring

A spring-physics based animation library, in addition to more components, to cover most of the UI related animations, when CSS is not enough for you.
It shipped with Composition-API-friendly [animation functions](#animation-functions) to support model-based API, in additional to [animation components](#animation-components) for the ones who prefer the template-based way
This library represents the Vue3 alternative for [react-spring](https://www.react-spring.io/) and [react-motion](https://github.com/chenglou/react-motion).

## Animation Functions

Composition-API-friendly functions to support model-based API

- [`Spring`](#spring)
- [`Parallax`](#parallax)
- [`Present`](#present)

### Spring

The primary animation component, which is a spring-physics based. Its main role is to move property from one value to another, with more natural animation and easing.

#### Using

`spring` function task [`SpringValue`](#spring-value) as its first argument, and [`SpringProps`](#spring-props) optional as the second argument.

##### Single Value

```js
import { spring } from 'vue3-spring';

export default {
  name: 'App',
  setup() {
    // If you passed to the spring a number as it's value
    // it return a Vue ref object.
    const mySpring = spring(100 /* [, config] */);

    // To update the spring desired value
    mySpring.value = 200;

    return { mySpring };
  },
};
```

##### Multiple Values

```js
import { spring } from 'vue3-spring';

export default {
  name: 'App',
  setup() {
    // If you passed to the spring an object of values
    // it return a Vue reactive object, for those values
    const mySpring = spring({ x: 100, y: 20 }, { dumping: 5 });

    // To update the spring desired values
    mySpring.x = 200;
    mySpring.y = -10;

    return { mySpring };
  },
};
```

##### Reactive Values

`spring` also accepts Vue reactive data type (`reactive`, `ref`) as its value. It will automatically update the current spring value, when the reactive values changed.

```js
import { ref, reactive } from 'vue';
import { spring } from 'vue3-spring';

export default {
  setup() {
    const mouse = reactive({ x: 0, y: 0 });
    const mouseSpring = spring(mouse);

    // this will update mouseSpring as well
    mouse.x = 5;

    const singleValue = ref(0);
    const singleValueSpring = spring(singleValue);

    // this will update singleValueSpring as well
    singleValue.value = 5;

    return {
      mouseSpring,
    };
  },
};
```

#### Spring Props

To config the spring physical properties, and initial values

| prop            | type                 | default | description                                                                     |
| --------------- | -------------------- | ------- | ------------------------------------------------------------------------------- |
| from            | `number` \| `object` | 0       | init value                                                                      |
| stiffness       | `number`             | 170     | spring stiffness, in kg / s^2                                                   |
| damping         | `number`             | 26      | damping constant, in kg / s                                                     |
| mass            | `number`             | 1       | spring mass                                                                     |
| velocity        | `number`             | 0       | initial velocity                                                                |
| precision       | `number`             | 2       | number of digits to round the values, increase the number to increase precision |
| framesPerSecond | `number`             | 60      | display refresh rate                                                            |
| isPendulum      | `boolean`            | false   | is the animation will start agin after is dumped                                |

#### Spring Value

Spring value could be `number`, `object`, Vue `reactive` object, or Vue `ref` object.

| type       | return type | auto update | multiple values |
| ---------- | ----------- | ----------- | --------------- |
| `number`   | `ref`       | false       | false           |
| `object`   | `reactive`  | false       | true            |
| `ref`      | `ref`       | true        | false           |
| `reactive` | `reactive`  | true        | true            |

### Parallax

Used move property from one value to another, based on the scrolled distance.

#### COMING SOON

### Present

Used to apply CSS animation class to an element, when it enters the view-port.

#### COMING SOON

## Animation Components

Components for the ones who prefer the template-based way

- [`SpringProvider`](#springprovider)
- [`ParallaxProvider`](#parallaxprovider)
- [`PresentProvider`](#presentprovider)

### SpringProvider

`SpringProvider` accepts [props](#spring-props) same the [`spring`](#spring) function

#### Using

##### Single Value

```vue
<template>
  <spring-provider v-slot="{ value }" :to="positionX" :damping="10">
    <div class="circle" :style="{ transform: `translateX(${value}px)` }"></div>
  </spring-provider>
</template>

<script>
import { SpringProvider } from 'vue3-spring';

export default {
  name: 'App',
  components: { SpringProvider },
  data: () => ({
    positionX: 100,
  }),
};
</script>
```

##### Multiple Values

```vue
<template>
  <spring-provider v-slot="{ x, y }" :to="mouse" :damping="10">
    <div class="circle" :style="{ transform: `translate(${x}px, ${y}px)` }"></div>
  </spring-provider>
</template>

<script>
import { SpringProvider } from 'vue3-spring';

export default {
  name: 'App',
  components: { SpringProvider },
  data: () => ({
    mouse: { x: 0, y: 0 },
  }),
};
</script>
```

### ParallaxProvider

#### COMING SOON

### PresentProvider

#### COMING SOON
