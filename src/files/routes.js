export default [
  {
    path: "/files/",
    component: () => import("./files.vue"),
    children: [
      {
        path: '',
        name: 'files',
        component: () => import('./index.vue')
      },
      {
        path: ':id',
        props: true,
        component: () => import('./[id].vue')
      }
    ]
  }
]