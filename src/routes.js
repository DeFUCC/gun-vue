const modules = import.meta.glob('./**/routes.js', { eager: true })

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
  "/space/": "Space",
  "/chat/": "Chat",
  "/posts/": "Posts",
  "/users/": "Users",
  "/my/": "User",
  "/private/": "Messages",
  "/rooms/": "Rooms",
  "/projects/": "Projects",
  "/gifts/": "Gifts",
  "/dict/": "Dictionary",
  "/files/": "Files",
  "/qr/": "QR Lab",
}