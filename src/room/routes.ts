
export default [
  {
    path: "/rooms/",
    component: () => import("./rooms.vue"),
    children: [
      {
        path: '',
        name: "rooms",
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