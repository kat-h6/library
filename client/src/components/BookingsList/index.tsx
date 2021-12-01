import React from 'react'
import { Booking } from '../../types/user'

// type Booking = {
//   _id?: string
//   book: Book
//   startDate: Date
//   endDate: Date
// }

type BookingListProps = {
  bookings: Booking[]
}
export default function BookingList({
  bookings,
}: BookingListProps): JSX.Element {
  return (
    <div>
      {bookings.length > 0 ? (
        bookings.map((booking: Booking) => (
          <div key={booking._id}>
            <p>{booking.book.title}</p>
            <p>{booking.startDate}</p>
            <p>{booking.endDate}</p>
          </div>
        ))
      ) : (
        <p>No books on loan</p>
      )}
    </div>
  )
}
