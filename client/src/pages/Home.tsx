import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { retrieveBooks } from '../redux/actions/book'
import NavBar from '../components/Navigating/NavBar/index'
import BookGrid from '../components/Containers/BookGrid/index'
import Banner from '../components/Banner/index'
import GenreList from '../components/Lists/GenreList/index'
import BookClubContainer from '../components/Containers/BookClubContainer'
import Footer from '../components/Navigating/Footer'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveBooks())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <Banner />
      <BookGrid />
      <GenreList />
      <BookClubContainer />
      <Footer />
    </>
  )
}
