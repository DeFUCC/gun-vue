
export interface Item {
  id?: string
  [key : string]: string | undefined
}

export type ProjectType = 'event' | 'object'

export interface Project extends Item {
  type?: ProjectType,
}