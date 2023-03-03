
export default [
  {
    path: "/users/",
    component: () => import("./users.vue"),
    children: [
      {
        path: '',
        name: "users",
        component: () => import('./index.vue')
      },
      {
        path: ':pub',
        props: true,
        component: () => import('./[pub].vue'),
        children: [
          {
            path: 'chat',
            component: () => import('./[pub]/chat.vue')
          },
        ]
      },
    ]
  }
]