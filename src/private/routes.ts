export default [
  {
    path: "/private/",
    meta: { requiresAuth: true },
    props: true,
    component: () => import("./index.vue"),
    children: [
      {
        path: '',
        name: "private",
        component: () => import('./empty.vue')
      },
      {
        path: ':pub',
        props: true,
        component: () => import('./[pub].vue')
      },
    ]
  }
]