//@ts-expect-error
const modules = import.meta.glob('./**/routes.ts', { eager: true })

//@ts-expect-error
const routes = Object.values(modules).map(r => r?.default[0])

export default [
  {
    path: '/',
    component: () => import('./index.vue')
  },
  ...routes
]

export const rootRoutes = {
  "/": "Home",
  "/my/": "User",
  "/space/": "Space",
  "/chat/": "Chat",
  "/posts/": "Posts",
  "/projects/": "Projects",
  "/gifts/": "Gifts",
  "/users/": "Users",
  "/rooms/": "Rooms",
  "/private/": "Messages",
  "/dict/": "Dictionary",
  "/file/": "Files",
  "/qr/": "QR Lab"
}