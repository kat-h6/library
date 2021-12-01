import React from 'react'
import { Book } from '../../types/book'
// import { Booking } from '../../types/user'

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
    <div>
      {
        bookings?.map((booking: Booking) => (
          <div key={booking._id}>
            <p>{booking.book.title}</p>
            <p>{booking.startDate}</p>
            <p>{booking.endDate}</p>
          </div>
        ))
      }
    </div>
  )
}
