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
      <p>{book.authors.map((author) => author.name)}</p>
      <p>ISBN: {book.ISBN}</p>
      <img src={book.imageUrl} alt="book cover" />
      <p>{book.description}</p>
      <p>Published: {book.publishedYear}</p>
      <p>Publisher: {book.publisher}</p>
      {book.isAvailable ? <BookingButton /> : <p>Currently on Loan</p>}
      <Link to="/">Back</Link>
    </>
  )
}
