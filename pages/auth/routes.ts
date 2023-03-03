
export default [
  {
    path: "/auth/",
    name: "auth",
    component: () => import("./auth.vue"),
    children: [
      {
        path: '',
        component: () => import('./index.vue')
      },
      {
        path: ':data',
        props: true,
        component: () => import('./[data].vue')
      }
    ]
  }
]