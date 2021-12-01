import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../types/types'
import axios from 'axios'

import { User } from '../../types/user'

export default function BookingButton() {
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
      `/api/v1/users/${user.id}/bookings`,
      bookingDetails
    )
  }

  const makeBookUnavailable = async (bookId: string) => {
    const availability = { isAvailable: false }
    return await axios.patch(`/api/v1/books/${bookId}`, availability)
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
      navigate(`/dashboard/${user.id}`)
    }
  }

  return (
    <div>
      <Button onClick={() => makeBookingRequest(user, bookId)}>
        Borrow Book
      </Button>
    </div>
  )
}
