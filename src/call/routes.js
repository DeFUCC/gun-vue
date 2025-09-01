export default [
  {
    path: '/call/',
    component: () => import('./call.vue'),
    children: [
      { path: '', component: () => import('./CallPanel.vue') }
    ]
  }
]