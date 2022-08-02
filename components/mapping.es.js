import { defineAsyncComponent$1 as defineAsyncComponent, useDark, useToggle, markRaw, reactive } from "./vendor.es.js";
const Comp0 = defineAsyncComponent(() => import("./ChatMessage.story.es.js"));
const Comp1 = defineAsyncComponent(() => import("./ChatRoom.story.es.js"));
const Comp2 = defineAsyncComponent(() => import("./AccountAvatar.story.es.js"));
const Comp3 = defineAsyncComponent(() => import("./AccountBadge.story.es.js"));
const Comp4 = defineAsyncComponent(() => import("./AccountHome.story.es.js"));
const Comp5 = defineAsyncComponent(() => import("./AccountSelect.story.es.js"));
const Comp6 = defineAsyncComponent(() => import("./AccountStars.story.es.js"));
const Comp7 = defineAsyncComponent(() => import("./Components.story.es.js"));
const Comp8 = defineAsyncComponent(() => import("./Composables.story.es.js"));
const Comp9 = defineAsyncComponent(() => import("./GiftCard.story.es.js"));
const Comp10 = defineAsyncComponent(() => import("./GiftForm.story.es.js"));
const Comp11 = defineAsyncComponent(() => import("./GiftList.story.es.js"));
const Comp12 = defineAsyncComponent(() => import("./QrLoad.story.es.js"));
const Comp13 = defineAsyncComponent(() => import("./QrShow.story.es.js"));
const Comp14 = defineAsyncComponent(() => import("./ProjectCard.story.es.js"));
const Comp15 = defineAsyncComponent(() => import("./ProjectList.story.es.js"));
const Comp16 = defineAsyncComponent(() => import("./RoomButton.story.es.js"));
const Comp17 = defineAsyncComponent(() => import("./RoomList.story.es.js"));
const Comp18 = defineAsyncComponent(() => import("./SpacePlane.story.es.js"));
const Comp19 = defineAsyncComponent(() => import("./UserAuth.story.es.js"));
const Comp20 = defineAsyncComponent(() => import("./UserAvatar.story.es.js"));
const Comp21 = defineAsyncComponent(() => import("./UserCreate.story.es.js"));
const Comp22 = defineAsyncComponent(() => import("./UserCredentials.story.es.js"));
const Comp23 = defineAsyncComponent(() => import("./UserGraph.story.es.js"));
const Comp24 = defineAsyncComponent(() => import("./UserHome.story.es.js"));
const Comp25 = defineAsyncComponent(() => import("./UserIcon.story.es.js"));
const Comp26 = defineAsyncComponent(() => import("./UserList.story.es.js"));
const Comp27 = defineAsyncComponent(() => import("./UserLogin.story.es.js"));
const Comp28 = defineAsyncComponent(() => import("./UserPanel.story.es.js"));
const Comp29 = defineAsyncComponent(() => import("./UserPass.story.es.js"));
const Comp30 = defineAsyncComponent(() => import("./UserProfile.story.es.js"));
const Comp31 = defineAsyncComponent(() => import("./UserRooms.story.es.js"));
const Comp32 = defineAsyncComponent(() => import("./UtilGraph.story.es.js"));
const Comp33 = defineAsyncComponent(() => import("./UtilRelay.story.es.js"));
let files = [
  { "id": "src-chat-chatmessage-story-vue", "path": ["Chat", "Message"], "story": { "id": "src-chat-chatmessage-story-vue", "title": "Message", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:envelope", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-chat-chatmessage-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 0, component: Comp0 },
  { "id": "src-chat-chatroom-story-vue", "path": ["Chat", "Room"], "story": { "id": "src-chat-chatroom-story-vue", "title": "Room", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:home", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-chat-chatroom-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 1, component: Comp1 },
  { "id": "src-account-accountavatar-story-vue", "path": ["Account", "Avatar"], "story": { "id": "src-account-accountavatar-story-vue", "title": "Avatar", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:user", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-account-accountavatar-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 2, component: Comp2 },
  { "id": "src-account-accountbadge-story-vue", "path": ["Account", "Badge"], "story": { "id": "src-account-accountbadge-story-vue", "title": "Badge", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:id-badge", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-account-accountbadge-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 3, component: Comp3 },
  { "id": "src-account-accounthome-story-vue", "path": ["Account", "Home"], "story": { "id": "src-account-accounthome-story-vue", "title": "Home", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:home", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-account-accounthome-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 4, component: Comp4 },
  { "id": "src-account-accountselect-story-vue", "path": ["Account", "Select"], "story": { "id": "src-account-accountselect-story-vue", "title": "Select", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:list", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-account-accountselect-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 5, component: Comp5 },
  { "id": "src-account-accountstars-story-vue", "path": ["Account", "Stars"], "story": { "id": "src-account-accountstars-story-vue", "title": "Stars", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:star", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-account-accountstars-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 6, component: Comp6 },
  { "id": "src-docs-components-story-vue", "path": ["Components"], "story": { "id": "src-docs-components-story-vue", "title": "Components", "group": "docs", "layout": { "type": "single", "iframe": true }, "icon": "la:book-open", "iconColor": null, "docsOnly": true, "variants": [{ "id": "_default", "title": "default" }] }, "framework": "vue3", "index": 7, component: Comp7 },
  { "id": "src-docs-composables-story-vue", "path": ["Composables"], "story": { "id": "src-docs-composables-story-vue", "title": "Composables", "group": "docs", "layout": { "type": "single", "iframe": true }, "icon": "la:book-open", "iconColor": null, "docsOnly": true, "variants": [{ "id": "_default", "title": "default" }] }, "framework": "vue3", "index": 8, component: Comp8 },
  { "id": "src-gift-giftcard-story-vue", "path": ["Gift", "Card"], "story": { "id": "src-gift-giftcard-story-vue", "title": "Card", "group": null, "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-gift-giftcard-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 9, component: Comp9 },
  { "id": "src-gift-giftform-story-vue", "path": ["Gift", "Form"], "story": { "id": "src-gift-giftform-story-vue", "title": "Form", "group": null, "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-gift-giftform-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 10, component: Comp10 },
  { "id": "src-gift-giftlist-story-vue", "path": ["Gift", "List"], "story": { "id": "src-gift-giftlist-story-vue", "title": "List", "group": null, "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-gift-giftlist-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 11, component: Comp11 },
  { "id": "src-qr-qrload-story-vue", "path": ["Qr", "Load"], "story": { "id": "src-qr-qrload-story-vue", "title": "Load", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:qrcode", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-qr-qrload-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 12, component: Comp12 },
  { "id": "src-qr-qrshow-story-vue", "path": ["Qr", "Show"], "story": { "id": "src-qr-qrshow-story-vue", "title": "Show", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:qrcode", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-qr-qrshow-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 13, component: Comp13 },
  { "id": "src-project-projectcard-story-vue", "path": ["Project", "Card"], "story": { "id": "src-project-projectcard-story-vue", "title": "Card", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:toolbox", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-project-projectcard-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 14, component: Comp14 },
  { "id": "src-project-projectlist-story-vue", "path": ["Project", "List"], "story": { "id": "src-project-projectlist-story-vue", "title": "List", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:tools", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-project-projectlist-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 15, component: Comp15 },
  { "id": "src-room-roombutton-story-vue", "path": ["Room", "Icon"], "story": { "id": "src-room-roombutton-story-vue", "title": "Icon", "group": null, "layout": { "type": "single" }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-room-roombutton-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 16, component: Comp16 },
  { "id": "src-room-roomlist-story-vue", "path": ["Room", "List"], "story": { "id": "src-room-roomlist-story-vue", "title": "List", "group": null, "layout": { "type": "single", "iframe": false }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-room-roomlist-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 17, component: Comp17 },
  { "id": "src-space-spaceplane-story-vue", "path": ["Space", "Plane"], "story": { "id": "src-space-spaceplane-story-vue", "title": "Plane", "group": null, "layout": { "type": "single", "iframe": false }, "icon": "la:draw-polygon", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-space-spaceplane-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 18, component: Comp18 },
  { "id": "src-user-userauth-story-vue", "path": ["User", "Auth"], "story": { "id": "src-user-userauth-story-vue", "title": "Auth", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:key", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userauth-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 19, component: Comp19 },
  { "id": "src-user-useravatar-story-vue", "path": ["User", "Avatar"], "story": { "id": "src-user-useravatar-story-vue", "title": "Avatar", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:user", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-useravatar-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 20, component: Comp20 },
  { "id": "src-user-usercreate-story-vue", "path": ["User", "Create"], "story": { "id": "src-user-usercreate-story-vue", "title": "Create", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:magnet", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-usercreate-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 21, component: Comp21 },
  { "id": "src-user-usercredentials-story-vue", "path": ["User", "Credentials"], "story": { "id": "src-user-usercredentials-story-vue", "title": "Credentials", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:suitcase", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-usercredentials-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 22, component: Comp22 },
  { "id": "src-user-usergraph-story-vue", "path": ["User", "Graph"], "story": { "id": "src-user-usergraph-story-vue", "title": "Graph", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:sitemap", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-usergraph-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 23, component: Comp23 },
  { "id": "src-user-userhome-story-vue", "path": ["User", "Home"], "story": { "id": "src-user-userhome-story-vue", "title": "Home", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:home", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userhome-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 24, component: Comp24 },
  { "id": "src-user-usericon-story-vue", "path": ["User", "Icon"], "story": { "id": "src-user-usericon-story-vue", "title": "Icon", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:user", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-usericon-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 25, component: Comp25 },
  { "id": "src-user-userlist-story-vue", "path": ["User", "List"], "story": { "id": "src-user-userlist-story-vue", "title": "List", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:home", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userlist-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 26, component: Comp26 },
  { "id": "src-user-userlogin-story-vue", "path": ["User", "Login"], "story": { "id": "src-user-userlogin-story-vue", "title": "Login", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:theater-masks", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userlogin-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 27, component: Comp27 },
  { "id": "src-user-userpanel-story-vue", "path": ["User", "Panel"], "story": { "id": "src-user-userpanel-story-vue", "title": "Panel", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:address-book", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userpanel-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 28, component: Comp28 },
  { "id": "src-user-userpass-story-vue", "path": ["User", "Pass"], "story": { "id": "src-user-userpass-story-vue", "title": "Pass", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:passport", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userpass-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 29, component: Comp29 },
  { "id": "src-user-userprofile-story-vue", "path": ["User", "Profile"], "story": { "id": "src-user-userprofile-story-vue", "title": "Profile", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:passport", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userprofile-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 30, component: Comp30 },
  { "id": "src-user-userrooms-story-vue", "path": ["User", "Rooms"], "story": { "id": "src-user-userrooms-story-vue", "title": "Rooms", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "la:route", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-user-userrooms-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 31, component: Comp31 },
  { "id": "src-util-utilgraph-story-vue", "path": ["Util", "Graph"], "story": { "id": "src-util-utilgraph-story-vue", "title": "Graph", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "mdi:graph-outline", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-util-utilgraph-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 32, component: Comp32 },
  { "id": "src-util-utilrelay-story-vue", "path": ["Util", "Relay"], "story": { "id": "src-util-utilrelay-story-vue", "title": "Relay", "group": null, "layout": { "type": "single", "iframe": true }, "icon": "carbon:bare-metal-server-01", "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-util-utilrelay-story-vue-0", "title": "Round", "icon": null, "iconColor": null }] }, "framework": "vue3", "index": 33, component: Comp33 }
];
let tree = [{ "group": true, "id": "docs", "title": "Docs", "children": [{ "title": "Components", "index": 7 }, { "title": "Composables", "index": 8 }] }, { "group": true, "id": "top", "title": "Auth", "children": [{ "title": "Account", "children": [{ "title": "Avatar", "index": 2 }, { "title": "Badge", "index": 3 }, { "title": "Home", "index": 4 }, { "title": "Select", "index": 5 }, { "title": "Stars", "index": 6 }] }, { "title": "Room", "children": [{ "title": "Icon", "index": 16 }, { "title": "List", "index": 17 }] }, { "title": "User", "children": [{ "title": "Auth", "index": 19 }, { "title": "Avatar", "index": 20 }, { "title": "Create", "index": 21 }, { "title": "Credentials", "index": 22 }, { "title": "Graph", "index": 23 }, { "title": "Home", "index": 24 }, { "title": "Icon", "index": 25 }, { "title": "List", "index": 26 }, { "title": "Login", "index": 27 }, { "title": "Panel", "index": 28 }, { "title": "Pass", "index": 29 }, { "title": "Profile", "index": 30 }, { "title": "Rooms", "index": 31 }] }] }, { "group": true, "title": "Features", "children": [{ "title": "Chat", "children": [{ "title": "Message", "index": 0 }, { "title": "Room", "index": 1 }] }, { "title": "Gift", "children": [{ "title": "Card", "index": 9 }, { "title": "Form", "index": 10 }, { "title": "List", "index": 11 }] }, { "title": "Project", "children": [{ "title": "Card", "index": 14 }, { "title": "List", "index": 15 }] }, { "title": "Space", "children": [{ "title": "Plane", "index": 18 }] }] }, { "group": true, "title": "Tools", "children": [{ "title": "Qr", "children": [{ "title": "Load", "index": 12 }, { "title": "Show", "index": 13 }] }, { "title": "Util", "children": [{ "title": "Graph", "index": 32 }, { "title": "Relay", "index": 33 }] }] }];
var Logo_square = "/components/gun-vue-logo.svg";
var Logo_dark = "/components/components.svg";
const config = { "plugins": [{ "name": "tailwind-tokens" }], "outDir": "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/app/public/components", "storyMatch": ["**/*.story.vue"], "storyIgnored": ["**/node_modules/**", "**/dist/**"], "tree": { "file": "title", "order": "asc", "groups": [{ "title": "Docs", "id": "docs" }, { "id": "top", "title": "Auth" }, { "title": "Features" }, { "title": "Tools" }] }, "theme": { "title": "Gun-Vue components", "colors": { "primary": { "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b" }, "gray": { "50": "#fafafa", "100": "#f4f4f5", "200": "#e4e4e7", "300": "#d4d4d8", "400": "#a1a1aa", "500": "#71717a", "600": "#52525b", "700": "#3f3f46", "750": "#323238", "800": "#27272a", "850": "#1f1f21", "900": "#18181b", "950": "#101012" } }, "logo": { "square": "/gun-vue-logo.svg", "light": "/components.svg", "dark": "/components.svg" }, "logoHref": "/", "favicon": "/gun-vue-logo.svg" }, "responsivePresets": [{ "label": "Mobile (Small)", "width": 320, "height": 560 }, { "label": "Mobile (Medium)", "width": 360, "height": 640 }, { "label": "Mobile (Large)", "width": 414, "height": 896 }, { "label": "Tablet", "width": 768, "height": 1024 }, { "label": "Laptop (Small)", "width": 1024, "height": null }, { "label": "Laptop (Large)", "width": 1366, "height": null }, { "label": "Desktop", "width": 1920, "height": null }, { "label": "4K", "width": 3840, "height": null }], "backgroundPresets": [{ "label": "Transparent", "color": "transparent" }, { "label": "White", "color": "#fff" }, { "label": "Light gray", "color": "#aaa" }, { "label": "Dark gray", "color": "#333" }, { "label": "Black", "color": "#000" }], "sandboxDarkClass": "dark", "routerMode": "hash", "vite": { "server": { "fs": { "allow": ".." } }, "build": { "sourcemap": false }, "base": "/components/" }, "setupFile": "histoire.setup.js" };
const logos = { square: Logo_square, light: Logo_dark, dark: Logo_dark };
const histoireConfig = config;
const customLogos = logos;
const isDark = useDark({ valueDark: "htw-dark" });
const toggleDark = useToggle(isDark);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const copiedFromExistingVariant = [
  "state",
  "slots",
  "source",
  "responsiveDisabled",
  "autoPropsDisabled",
  "setupApp",
  "configReady",
  "previewReady"
];
function mapFile(file, existingFile) {
  let result;
  if (existingFile) {
    result = existingFile;
    for (const key in file) {
      if (key === "story") {
        Object.assign(result.story, __spreadProps(__spreadValues({}, file.story), {
          file: markRaw(result),
          variants: file.story.variants.map((v) => mapVariant(v, existingFile.story.variants.find((item) => item.id === v.id)))
        }));
      } else if (key !== "component") {
        result[key] = file[key];
      }
    }
  } else {
    result = __spreadProps(__spreadValues({}, file), {
      component: markRaw(file.component),
      story: __spreadProps(__spreadValues({}, file.story), {
        title: file.story.title,
        file: markRaw(file),
        variants: file.story.variants.map((v) => mapVariant(v)),
        slots: () => ({})
      })
    });
  }
  return result;
}
function mapVariant(variant, existingVariant) {
  let result;
  if (existingVariant) {
    result = existingVariant;
    for (const key in variant) {
      if (!copiedFromExistingVariant.includes(key)) {
        result[key] = variant[key];
      }
    }
  } else {
    result = __spreadProps(__spreadValues({}, variant), {
      state: reactive(createVariantState()),
      setupApp: null,
      slots: () => ({}),
      previewReady: false
    });
  }
  return result;
}
function createVariantState() {
  const obj = {};
  Object.defineProperty(obj, "_hPropState", {
    value: null,
    writable: true,
    configurable: true,
    enumerable: false
  });
  Object.defineProperty(obj, "_hPropDefs", {
    value: null,
    writable: true,
    configurable: true,
    enumerable: false
  });
  return obj;
}
export { customLogos, files, histoireConfig, isDark, mapFile, toggleDark, tree };
