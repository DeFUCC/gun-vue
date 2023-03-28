export default [
  {
    path: "/dict/words",
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