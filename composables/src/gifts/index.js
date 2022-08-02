import { currentRoom } from '../room'

export * from './useGifts'
export * from './useGift'

export const giftPath = "gifts"


export const defaultGift = {
  from: '',
  to: '',
  qn: 0,
  ql: '',
  wish: '',
  project: '',
  room: currentRoom.pub,
  date: ''
}