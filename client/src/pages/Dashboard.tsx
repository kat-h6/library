import React from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../types/types'
import NavBar from '../components/Navigating/NavBar'
import BookingList from '../components/Containers/BookingsList'

export default function Dashboard() {
  const user = useSelector((state: AppState) => state.user.user)

  console.log(user)

  return (
    <div>
      <NavBar />
      {user ? (
        <>
          <BookingList bookings={user.bookings} />
        </>
      ) : (
        <p>Must be logged in</p>
      )}
    </div>
  )
}
