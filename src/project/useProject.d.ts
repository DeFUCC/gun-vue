/**
 * 
 * @module Project
 * @group Projects
 */


export type ProjectType = 'design' | 'project' | 'event' | 'object' | 'opportunity' | 'task' | 'purchase'

export interface ProjectItem {
  //main
  id: string
  type?: ProjectType

  //info
  title?: string
  description?: string
  tags?: string[]
  content?: string

  //pub keys
  author?: string
  room?: string
  makers?: string[]

  //hierarchy
  source?: string
  targets?: string[]

  //time
  updatedAt?: string
  createdAt?: string
  startAt?: string
  finishAt?: string

  //place
  location?: [number, number]
  address?: string

  //flags
  public?: boolean
  funding?: boolean

  //appearance
  color?: string

  //media
  media?: { [key: string]: string }

}

