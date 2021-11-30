import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../types/types'
import { retrieveBook } from '../redux/actions/book'
import NavBar from '../components/NavBar'
import BookingButton from '../components/BookingButton'

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
      <h2>{book.title}</h2>
      <p>{book.ISBN}</p>
      <img src={book.imageUrl} alt="book cover" />
      <p>{book.description}</p>
      <p>{book.publishedYear}</p>
      <p>{book.publisher}</p>
      <BookingButton />
      <Link to="/">Back</Link>
    </>
  )
}
