export * from "./account/composables"
export * from "./cast/composables"
export * from "./chat/composables"
export * from "./crypto/composables"
export * from "./dict/composables"
export * from "./file/composables"
export * from "./gift/composables"
export * from "./gun/composables"
export * from './private/composables'
export * from "./post/composables"
export * from "./project/composables"
export * from "./room/composables"
export * from "./space/composables"
export * from "./ui/composables"
export * from "./user/composables"
export * from "./mate/composables"

import config from "../gun.config.json"

export const rootRoom = config.room

export { default as config } from "../gun.config.json"

export { gunAvatar } from "gun-avatar"
export { default as slugify } from "slugify"
export { default as prettyBytes } from 'pretty-bytes'


