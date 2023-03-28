## Gun-Vue apps source

Welcome to the Gun-Vue code garden! It's a place where different new apps grow on a common soil of open-source WEB UI and P2P DB libraries. Each folder here consists of all three layers:

- **Composables** - the `useXxx.ts` modules exported by `composables.ts` contain readily available reactive composables with all the model in place. You run this function and get all that you need to be able to use the core logic and storage of the app. 
- **Components** - the `XxxYyy.vue` Vue 3 SFCs with pug templates and unocss utility classes exported by `components.ts` empower explicitly robust UI development. Versatile VueUse enables even more modern UI practices like Web Notifications and more.
- **Routes** - the `xxx.vue` pages that are exported from `routes.ts` and are loaded on browsing corresponding paths in the Gun-Vue app. These are just thin layers of routing glue to hold the components together. With these building p2p web apps becomes a low-code kit assembly. That can enable new ways of human interactions.

They all are optional, so we can consider the `styles` folder with just the `css` files a proper Gun-Vue module.

But there may be more!

- **Descriptions** - the markdown rich text file README.md that describes the gist of the module and it's functionalities. If it's present, it need to be to put it into the composable module definition as `[[include:./README.md]]`.