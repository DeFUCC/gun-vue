
export default [
  {
    path: "/posts/",
    name: "posts",
    component: () => import("./posts.vue"),
    children: [
      {
        path: '',
        component: () => import('./index.vue')
      },
      {
        path: 'graph',
        component: () => import('./graph.vue')
      },
      {
        path: ':hash',
        props: true,
        component: () => import('./[hash].vue')
      }
    ]
  }
]