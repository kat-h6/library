import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../types/types'
import { retrieveBook } from '../redux/actions/book'

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
      <h2>{book.title}</h2>
      <img src={book.imageUrl} alt="book cover" />
    </>
  )
}
