import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import NavBar from '../components/Navigating/NavBar'
import BookDetailsContainer from '../components/Containers/BookDetailsContainer'
import BookRatings from '../components/Containers/BookRatings'
import Footer from '../components/Navigating/Footer'

export default function BookDetails() {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)

  const getBook = async (bookId: string | undefined) => {
    return fetch(`https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`)
      .then((resp) => resp.json())
      .then((book) => setBook(book))
  }

  useEffect(() => {
    getBook(bookId)
  }, [bookId])

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
