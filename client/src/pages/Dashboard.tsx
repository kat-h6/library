import React from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../types/types'
import NavBar from '../components/NavBar'
import BookingList from '../components/BookingsList'

export default function Dashboard() {
  const user = useSelector((state: AppState) => state.user.user)

  console.log(user)

  return (
    <div>
      <NavBar />
      {user ? (
        <>
          <h1>My Loans</h1>
          <BookingList bookings={user.bookings} />
        </>
      ) : (
        <p>Must be logged in</p>
      )}
    </div>
  )
}
