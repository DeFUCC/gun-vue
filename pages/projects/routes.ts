
export default [
  {
    path: "/projects/",
    name: "projects",
    component: () => import("./projects.vue"),
    children: [
      {
        path: '',
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