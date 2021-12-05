import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import { AppState } from '../types/types'
import NavBar from '../components/Navigating/NavBar'
import BookingsList from '../components/Containers/BookingsList'

export default function Dashboard() {
  const user = useSelector((state: AppState) => state.user.user)

  return (
    <>
      <NavBar />
      <Container>
        {user ? (
          <>
            <BookingsList />
          </>
        ) : (
          <p>Must be logged in</p>
        )}
      </Container>
    </>
  )
}
