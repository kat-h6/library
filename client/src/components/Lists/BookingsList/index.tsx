import axios from 'axios'
import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../../redux/actions/user'

import { Book } from '../../../types/book'
import { AppState } from '../../../types/types'
import { User } from '../../../types/user'
import './BookingsList.scss'

type Booking = {
  _id?: string
  book: Book
  startDate: Date
  endDate: Date
}

// type BookingListProps = {
//   bookings?: Booking[]
// }
export default function BookingList(): JSX.Element {
  const user = useSelector((state: AppState) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState(user?.bookings)

  const makeBookAvailable = async (bookId: string) => {
    const availability = { isAvailable: true }
    return await axios.patch(
      `https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`,
      availability
    )
  }

  const returnBook = async (booking: Booking, user: User) => {
    console.log(user._id)
    console.log(booking._id)
    const url = `https://kat-h6-library.herokuapp.com/api/v1/users/${user._id}/bookings/${booking._id}`
    await axios.delete(url)
    console.log(user)
    await dispatch(getUser(user._id))
    await makeBookAvailable(booking.book._id)
    const bookingId = booking._id
    setBookings(bookings?.filter((booking) => booking._id !== bookingId))
    return navigate(`/dashboard/${user._id}`)
  }

  if (!user) {
    return <p>Please sign in</p>
  }

  return (
    <Container className="bookings-container container--margin">
      <h2 className="container__header--blue">My Loans</h2>
      {bookings?.map((booking: Booking) => (
        <div key={booking._id} className="booking-card">
          <img
            src={booking.book.imageUrl}
            alt="book cover"
            className="booking-card__img"
          />
          <div className="booking-card__info">
            <h2>{booking.book.title}</h2>
            {booking.book.authors.map((author) => (
              <p key={author.name}>{author.name}</p>
            ))}
            <p>Borrowed: {booking.startDate.toString()}</p>
            <p>Due: {booking.endDate.toString()}</p>
          </div>
          <div className="return-btn">
            <Button variant="success" onClick={() => returnBook(booking, user)}>
              Return
            </Button>
          </div>
        </div>
      ))}
    </Container>
  )
}
