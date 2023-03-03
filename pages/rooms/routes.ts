
export default [
  {
    path: "/rooms/",
    name: "rooms",
    component: () => import("./rooms.vue"),
    children: [
      {
        path: '',
        component: () => import('./index.vue')
      },
      {
        path: ':room',
        props: true,
        component: () => import('./[room].vue')
      }
    ]
  }
]