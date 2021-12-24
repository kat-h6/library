import { Book } from './book'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const REQUEST_LOAN = 'REQUEST_LOAN'
export const SET_TOKEN = 'SET_TOKEN'

export type Booking = {
  _id?: string
  book: Book
  startDate: Date
  endDate: Date
}

export type User = {
  _id: string
  id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  bookings?: Booking[]
  data?: any
  isAdmin: Boolean
}

export type LogIn = {
  type: typeof LOG_IN
  payload: {
    user: User
  }
}

export type SetToken = {
  type: typeof SET_TOKEN
  payload: {
    token: string
  }
}

export type LogOut = {
  type: typeof LOG_OUT
}

export type RequestLoan = {
  type: typeof REQUEST_LOAN
}

export type UserState = {
  user: User | null
  token: string | null
}

export type UserActions = LogIn | LogOut | SetToken
