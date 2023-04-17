import type { DefaultTheme } from 'vitepress/types'

export const sidebar: DefaultTheme.NavItem[] = [
  {
    text: 'Basics', items: [
      {
        text: 'What is Gun-Vue?',
        link: '/basics/what-is'
      },
      {
        text: 'Getting started',
        link: '/reference/README'
      }
    ]
  },
  {
    text: 'How to',
    items: [
      { text: 'Using a composable', link: '/how-to/use-components' }
    ]
  },
  {
    text: 'Tutorials',
    items: [
      { text: 'Getting started', link: '/tutorials/getting-started' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Reference', link: '/reference/modules' },
    ]
  }
]