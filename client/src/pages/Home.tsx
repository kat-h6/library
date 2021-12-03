import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { retrieveBooks } from '../redux/actions/book'
import NavBar from '../components/Navigating/NavBar/index'
import BookGrid from '../components/Containers/BookGrid/index'
import Banner from '../components/Banner/index'
import GenreList from '../components/Containers/GenreList/index'
import { AppState } from '../types/types'

export default function Home() {
  const dispatch = useDispatch()

  const user = useSelector((state: AppState) => state.user.user)

  let greeting
  user ? (greeting = <h4>Welcome back {user.firstName}</h4>) : (greeting = null)

  useEffect(() => {
    dispatch(retrieveBooks())
  }, [dispatch])

  return (
    <>
      <NavBar />
      {greeting}
      <Banner />
      <BookGrid />
      <GenreList />
    </>
  )
}
