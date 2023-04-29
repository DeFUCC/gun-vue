export interface CurrentRoom {
  pub: string
  isRoot: boolean
  hosts?: {
    [key: string]: {
      enc?: string
      features?: string
      profile?: string
      hosts?: string
    }
  }
  features?: {
    [key: string]: string
  }
  profile?: {
    [key: string]: string
  }
}