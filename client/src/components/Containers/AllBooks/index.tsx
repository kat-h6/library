import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AppState } from '../../../types/types'
import { Book } from '../../../types/book'
import './AllBooks.scss'

export default function AllBooks() {
  const books = useSelector((state: AppState) => state.books.books)
  const rows = [...Array(Math.ceil(books.length / 5))]
  const bookRows = rows.map((row, index) =>
    books.slice(index * 5, index * 5 + 5)
  )
  const content = bookRows.map((row, index) => (
    <Row key={index} className="book-row">
      {row.map((book: Book) => (
        <Col key={book._id} className="margin-top">
          <Link to={`/books/${book._id}`}>
            <img src={book.imageUrl} alt="book cover" />
          </Link>
        </Col>
      ))}
    </Row>
  ))

  return (
    <Container className="all-books">
      <h2 className="container__header">Browse Bookshelves</h2>
      {content}
    </Container>
  )
}
