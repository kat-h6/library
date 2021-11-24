import { LogIn, LogOut, LOG_IN, LOG_OUT, User } from '../../types/user'

export function logIn(user: User): LogIn {
  return {
    type: LOG_IN,
    payload: {
      user: user,
    },
  }
}

export function logOut(): LogOut {
  return {
    type: LOG_OUT,
  }
}
