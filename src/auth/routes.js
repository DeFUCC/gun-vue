
export default [
  {
    path: "/auth/",
    component: () => import("./auth.vue"),
    children: [
      {
        path: '',
        name: "auth",
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