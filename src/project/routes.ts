
export default [
  {
    path: "/projects/",
    component: () => import("./projects.vue"),
    children: [
      {
        path: '',
        name: "projects",
        component: () => import('./index.vue')
      },
      {
        path: 'my',
        component: () => import('./my.vue'),
        children: [
          {
            path: '',
            component: () => import('./my/index.vue')
          },
          {
            path: ':id',
            component: () => import('./my/[id].vue')
          },
        ]
      },
      {
        path: ':path',
        props: true,
        component: () => import('./[path].vue')
      }
    ]
  }
]