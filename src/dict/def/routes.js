export default [
  {
    path: "/dict/defs",
    component: () => import("./index.vue"),
    children: [
      {
        path: ':hash',
        props: true,
        component: () => import('./[hash].vue')
      }
    ]
  }
]