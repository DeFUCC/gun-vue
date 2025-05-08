
export default [
  {
    path: "/chat/",
    component: () => import("./chat.vue"),
    children: [
      {
        path: '',
        name: "chat",
        component: () => import('./index.vue')
      },
      {
        path: ':topic',
        props: true,
        component: () => import('./ChatRoom.vue')
      }
    ]
  }
]