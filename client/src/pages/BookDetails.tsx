import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../types/types'
import { retrieveBook } from '../redux/actions/book'
import NavBar from '../components/Navigating/NavBar'
import BookDetailsContainer from '../components/Containers/BookDetailsContainer'
import BookRatings from '../components/Containers/BookRatings'

export default function BookDetails() {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const book = useSelector((state: AppState) => state.books.selectedBook)

  useEffect(() => {
    dispatch(retrieveBook(bookId))
  }, [dispatch, bookId])

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <>
      <NavBar />
      <BookDetailsContainer book={book} />
      <BookRatings book={book} />
    </>
  )
}
