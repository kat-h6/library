import { Dispatch } from 'react'
import { LogIn, LogOut, LOG_IN, LOG_OUT, User } from '../../types/user'

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

const setUser = async (user: User) => {
  return (dispatch: Dispatch<any>) => {
    console.log(user)
    localStorage.setItem('state', JSON.stringify(user))
    dispatch(logIn(user))
  }
}

export function getUser(userId: string) {
  return (dispatch: Dispatch<any>) => {
    return fetch(`https://kat-h6-library.herokuapp.com/api/v1/users/${userId}`)
      .then((resp) => resp.json())
      .then((user) => setUser(user))
  }
}

// export function getUser(userId: string) {
//   return (dispatch: Dispatch<any>) => {
//     return fetch(`https://kat-h6-library.herokuapp.com/api/v1/users/${userId}`)
//       .then((resp) => resp.json())
//       .then((user) => logIn(user))
//   }
// }
