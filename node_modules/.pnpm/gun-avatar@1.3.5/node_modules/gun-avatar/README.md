# Avatar generator for GUN public keys

![avatars](https://raw.githubusercontent.com/DeFUCC/gun-avatar/master/avatars.gif)

It takes a public key of 88 symbols and creates a base64 code to be set to an img tag. SEA public key consists of 87 symbols including a dot in the middle, so we can consider it as `(7*4+1)*2`.

So the steps to generate a unique picture for the key are like that:

1. We cut one digit from each part of the key. It gives us a pair of numbers, that we use to generate a grayscale vertical background gradient (light or dark)
2. Then we break the remaining 42 characters of each part into 4 groups of 7 numbers. Each group describes a circle: it's coordinates (x,y), it's radius (r) and 4 color parameters in the HSLA model (h,s,l,a). We place these circles on one side of a square canvas. 
3. Circles from the first part of the key are bigger and are placed with normal composite mode. Circles from the second part are smaller and placed with 'lighten' composite mode.
4. Then half of the canvas gets reflected to create a nice symmetric 'portrait' to be used as an avatar of a SEA public key.

## How to install?

### npm / pnpm
Run `npm i gun-avatar` in a build environment. Then you can `import {gunAvatar} from 'gun-avatar'` and use the function to render the avatar. Or just `import 'gun-avatar'` for custom element use.

### Browser
Add `<script src="https://unpkg.com/gun-avatar"></script>` to your html

## How to use?

### 1. Custom HTML element

After you add the script to the page you get a custom element `<gun-avatar />` for ease of use. The attributes are reactive to changes. Set `dark` attribute if you need a dark version of the avatar. Set `round` attribute to get a rounded image. Also `size` in pixels is available. 

```html
<script src="https://unpkg.com/gun-avatar"></script>
<gun-avatar pub="0000000kw75Ute2tFhdjDQgzR-GsGhlfSlZxgEZKuquI.2F-j9ItJY44U8vcRAsj-5lxnECG5TDyuPD8gEiuInp8" size="300" round dark />
```

### 2. HTML img tag with `data-pub` attribute

Add the script to the page and then add `gun-avatar` class to an img tag along with add `data-pub` attribute with the pub key. `gun-avatar` automatically finds them on page and fills with corresponding base64 picture data. You can set `data-size` in px and style the avatar with css as you want. Also there's `data-dark` option to generate a dark version of the same avatar. You can add `.gun-avatar {border-radius: 100%}` to tour css to make it round.

```html
<script src="https://unpkg.com/gun-avatar"></script>
<img class="gun-avatar" data-size="200" data-pub="YZOBPSkw75Ute2tFhdjDQgzR-GsGhlfSlZxgEZKuquI.2F-j9ItJY44U8vcRAsj-5lxnECG5TDyuPD8gEiuInp8">
```

### 3. JS function

Install the `gun-avatar` package and import the `gunAvatar` function. Then you can use it to generate the base64 string to place into the src attribute with your favourite library or vanilla js. Function get two parameters: `pub` and `size` in px.

```javascript
import {gunAvatar} from 'gun-avatar'

const pub = 'YZOBPSkw75Ute2tFhdjDQgzR-GsGhlfSlZxgEZKuquI.2F-j9ItJY44U8vcRAsj-5lxnECG5TDyuPD8gEiuInp8'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("avatar").src = gunAvatar(pub, 200)
});  
```


### ROAD MAP

- [x] make the mirroring canvas work in Safari 
- [x] make adjustable canvas size with consistent result
- [x] add more options to customize the view of the avatars
  - [x] dark mode

