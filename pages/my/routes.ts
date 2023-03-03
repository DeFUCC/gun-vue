export default [
  {
    path: "/my/",
    name: "my",
    component: () => import("./my.vue"),
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
        path: 'chat',
        component: () => import('./chat.vue'),
        children: [
          {
            path: '',
            component: () => import('./chat/index.vue')
          },
          {
            path: ':pub',
            props: true,
            component: () => import('./chat/[pub].vue')
          },
        ]
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