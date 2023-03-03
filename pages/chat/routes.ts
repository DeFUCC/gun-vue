
export default [
  {
    path: "/chat/",
    name: "chat",
    component: () => import("./chat.vue"),
    children: [
      {
        path: '',
        component: () => import('./index.vue')
      },
      {
        path: ':topic',
        props: true,
        component: () => import('./[topic].vue')
      }
    ]
  }
]