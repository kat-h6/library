import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../types/types'
import axios from 'axios'

import { User } from '../../../types/user'
import { getUser } from '../../../redux/actions/user'
import './BookingButton.scss'

export default function BookingButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: AppState) => state.user.user)
  const { bookId } = useParams()

  const loanRequest = async (user: User, bookId: string) => {
    const startDate = new Date()
    const endDate = new Date(Date.now() + 12096e5)
    const bookingDetails = {
      book: bookId,
      startDate: startDate,
      endDate: endDate,
    }
    return await axios.patch(
      `https://kat-h6-library.herokuapp.com/api/v1/users/${user._id}/bookings`,
      bookingDetails
    )
  }

  const makeBookUnavailable = async (bookId: string) => {
    const availability = { isAvailable: false }
    return await axios.patch(
      `https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`,
      availability
    )
  }

  const getUserAgain = async (userId: string) => {
    return dispatch(getUser(userId))
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const makeBookingRequest = (
    user: User | null,
    bookId: string | undefined
  ) => {
    if (!user) {
      alert('Must be logged in')
    }
    if (user && bookId) {
      loanRequest(user, bookId)
      console.log('loan was made')
      makeBookUnavailable(bookId)
      console.log('book unavailable')
      console.log(user)
      getUserAgain(user._id)
      navigate(`/dashboard/${user._id}`)
    }
  }

  return (
    <div>
      <Button
        onClick={() => makeBookingRequest(user, bookId)}
        variant="warning"
        className="booking-btn"
      >
        Borrow Book
      </Button>
    </div>
  )
}
