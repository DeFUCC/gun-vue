export default [
  {
    path: "/my/",
    meta: { requiresAuth: true },
    component: () => import("./my.vue"),
    children: [
      {
        path: '',
        name: "my",
        component: () => import('./index.vue')
      },
      {
        path: 'my',
        component: () => import('./my.vue')
      },
      {
        path: 'mates',
        component: () => import('./mates.vue')
      },
      {
        path: 'profile',
        props: true,
        component: () => import('./profile.vue')
      },
      {
        path: 'wallets',
        props: true,
        component: () => import('./wallets.vue')
      },
    ]
  }
]