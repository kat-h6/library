import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import NavBar from '../components/Navigating/NavBar'
import BookDetailsContainer from '../components/Containers/BookDetailsContainer'
import BookRatings from '../components/Reviews/BookRatings'
import Footer from '../components/Navigating/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getBook } from '../redux/actions/book'
import { AppState } from '../types/types'

export default function BookDetails() {
  const dispatch = useDispatch()
  const { bookId } = useParams()
  const book = useSelector((state: AppState) => state.books.selectedBook)

  useEffect(() => {
    dispatch(getBook(bookId))
  }, [dispatch, bookId])

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <>
      <NavBar />
      <BookDetailsContainer book={book} />
      <BookRatings book={book} />
      <Footer />
    </>
  )
}
