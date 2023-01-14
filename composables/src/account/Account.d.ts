export interface Profile {
  name?: string
  first_name?: string
  last_name?: string
	birth_day?: string
	[key:string]:string | undefined
}

export interface Account {
  pub: string
  color: string
  pulse: number
  blink: boolean
  profile: Profile
	petname?: string
	[key:string]: any
}