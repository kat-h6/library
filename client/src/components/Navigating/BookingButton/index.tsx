import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../types/types'
import Swal from 'sweetalert2'

import { User } from '../../../types/user'
import { loanRequest, makeBookUnavailable } from '../../../redux/actions/user'
import './BookingButton.scss'

export default function BookingButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: AppState) => state.user.user)
  const { bookId } = useParams()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const makeBookingRequest = (
    user: User | null,
    bookId: string | undefined
  ) => {
    if (!user) {
      Swal.fire('Must be logged in')
    }
    if (user && bookId) {
      dispatch(loanRequest(user, bookId))
      dispatch(makeBookUnavailable(bookId))
      Swal.fire('Hurray! Reservation successful').then(function () {
        navigate(`/dashboard/${user._id}`)
      })
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
