
export default [
  {
    path: "/posts/",
    component: () => import("./posts.vue"),
    children: [
      {
        path: '',
        name: "posts",
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