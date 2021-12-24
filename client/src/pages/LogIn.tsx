import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { retrieveBooks } from '../redux/actions/book'
import NavBar from '../components/Navigating/NavBar/index'
import LogInForm from '../components/Navigating/LogInForm/index'
import Footer from '../components/Navigating/Footer'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveBooks())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <LogInForm />
      <Footer />
    </>
  )
}
