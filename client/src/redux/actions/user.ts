import axios from 'axios'
import { Dispatch } from 'react'
import {
  LogIn,
  LogOut,
  LOG_IN,
  LOG_OUT,
  User,
  SetToken,
  SET_TOKEN,
} from '../../types/user'

export function logIn(res: any): LogIn {
  return {
    type: LOG_IN,
    payload: {
      user: res,
    },
  }
}

export function setToken(token: string): SetToken {
  return {
    type: SET_TOKEN,
    payload: {
      token: token,
    },
  }
}

export function logOut(): LogOut {
  return {
    type: LOG_OUT,
  }
}

export function getUser(userId: string) {
  return (dispatch: Dispatch<any>) => {
    return fetch(`https://kat-h6-library.herokuapp.com/api/v1/users/${userId}`)
      .then((resp) => resp.json())
      .then((user) => dispatch(logIn(user)))
  }
}

export function loanRequest(user: User, bookId: string, token: string) {
  return (dispatch: Dispatch<any>) => {
    const startDate = new Date()
    const endDate = new Date(Date.now() + 12096e5)
    const bookingDetails = {
      book: bookId,
      startDate: startDate,
      endDate: endDate,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axios
      .patch(
        `https://kat-h6-library.herokuapp.com/api/v1/users/${user._id}/bookings`,
        bookingDetails,
        config
      )
      .then((resp) => dispatch(getUser(resp.data._id)))
  }
}

export function makeBookUnavailable(bookId: string) {
  return (dispatch: Dispatch<any>) => {
    console.log('Making book unavailable')
    const availability = { isAvailable: false }
    return axios.patch(
      `https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`,
      availability
    )
  }
}

export function deleteBooking(
  bookingId: string | undefined,
  userId: string | undefined,
  token: string
) {
  return (dispatch: Dispatch<any>) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const url = `https://kat-h6-library.herokuapp.com/api/v1/users/${userId}/bookings/${bookingId}`
    return axios.delete(url, config)
  }
}
