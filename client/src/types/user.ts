import { Book } from './book'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const CREATE_BOOKING = 'CREATE_BOOKING'

export type Booking = {
  _id?: string
  book: Book | string
  startDate: Date
  endDate: Date
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  bookings: Booking[]
  data?: any
}

export type LogIn = {
  type: typeof LOG_IN
  payload: {
    user: User
  }
}

export type UserState = {
  user: User | null
}

export type LogOut = {
  type: typeof LOG_OUT
}

export type UserActions = LogIn | LogOut
