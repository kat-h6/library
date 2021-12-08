import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import { AppState } from '../types/types'
import NavBar from '../components/Navigating/NavBar'
import Footer from '../components/Navigating/Footer'
import NewBookForm from '../components/NewBookForm'

export default function Dashboard() {
  const user = useSelector((state: AppState) => state.user.user)

  if (!user) {
    return <p>Log in</p>
  }

  return (
    <>
      <NavBar />
      <Container>
        {user.isAdmin ? (
          <>
            <NewBookForm />
          </>
        ) : (
          <p>Must be admin</p>
        )}
      </Container>
      <Footer />
    </>
  )
}
