import React from 'react'
import { Container } from 'react-bootstrap'
import { Book } from '../../../types/book'
import './BookingsList.scss'

type Booking = {
  _id?: string
  book: Book
  startDate: Date
  endDate: Date
}

type BookingListProps = {
  bookings?: Booking[]
}
export default function BookingList({
  bookings,
}: BookingListProps): JSX.Element {
  return (
    <Container className="container--margin">
      <h2 className="container__header--blue">My Loans</h2>
      <hr className="header__border" />
      {bookings?.map((booking: Booking) => (
        <div key={booking._id}>
          <p>{booking.book.title}</p>
          <p>{booking.startDate}</p>
          <p>{booking.endDate}</p>
        </div>
      ))}
    </Container>
  )
}
