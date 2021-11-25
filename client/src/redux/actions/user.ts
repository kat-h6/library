import { LogIn, LogOut, LOG_IN, LOG_OUT } from '../../types/user'

export function logIn(res: any): LogIn {
  return {
    type: LOG_IN,
    payload: {
      user: res,
    },
  }
}

export function logOut(): LogOut {
  return {
    type: LOG_OUT,
  }
}
