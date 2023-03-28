export default [
  {
    path: "/by/",
    component: () => import("./index.vue"),
    children: [
      {
        path: '/me/',
        component: () => import('./me.vue')
      },
      {
        path: ':author',
        props: true,
        component: () => import('./[author].vue')
      }
    ]
  }
]