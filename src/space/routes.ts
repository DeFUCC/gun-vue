
export default [
  {
    path: "/space/",
    name: "space",
    component: () => import("./space.vue"),
    children: [
      {
        path: ':coord',
        props: true,
        component: () => import('./[coord].vue')
      }
    ]
  }
]