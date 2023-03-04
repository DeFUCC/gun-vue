export default [
  {
    path: "/file/",
    name: "file",
    component: () => import("./file.vue"),
    children: [
      {
        path: '',
        name: 'file',
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