export default [
  {
    path: "/gifts/",
    name: "gifts",
    component: () => import("./gifts.vue"),
    children: [
      {
        path: '',
        component: () => import('./index.vue')
      },
      {
        path: 'my',
        component: () => import('./my.vue')
      },
      {
        path: 'gifts',
        component: () => import('./gifts.vue')
      },
      {
        path: 'add',
        component: () => import('./add.vue')
      },
      {
        path: ':hash',
        props: true,
        component: () => import('./[hash].vue')
      },
    ]
  }
]