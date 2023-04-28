export type ProjectType = 'design' | 'project' | 'event' | 'object' | 'task' | 'purchase'

export interface ProjectItem {
  id: string
  title?: string
  description?: string
  type?: ProjectType
  author?: string
  color?: string
  room?: string
  content?: string
  updated?: string
  created?: string
  public?: boolean
  parent?: string
  children?: string[]
  [key: string]: string | boolean | string[] | undefined
}

