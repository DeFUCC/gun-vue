export default [
  {
    path: "/gifts/",
    component: () => import("./gifts.vue"),
    children: [
      {
        path: '',
        name: "gifts",
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