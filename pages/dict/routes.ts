import by from './by/routes'
import defs from './defs/routes'
import words from './words/routes'

export default [
  {
    path: "/dict/",
    name: "dict",
    component: () => import("./dict.vue"),
    children: [
      ...by,
      ...defs,
      ...words
    ]
  }
]