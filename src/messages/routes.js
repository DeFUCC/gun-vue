export default [
  {
    path: "/messages/",
    props: true,
    component: () => import("./index.vue"),
    children: [
      {
        path: '',
        name: "messages",
        component: () => import('./empty.vue')
      },
      {
        path: ':pub',
        props: true,
        component: () => import('./[pub].vue')
      },
    ]
  }
]