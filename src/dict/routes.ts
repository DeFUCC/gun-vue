import by from './by/routes'
import defs from './def/routes'
import words from './word/routes'

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