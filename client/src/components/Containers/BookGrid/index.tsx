import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppState } from '../../../types/types'
import './BookGrid.scss'

export default function BookGrid() {
  const books = useSelector((state: AppState) => state.books.books)

  return (
    <Container className="container--margin">
      <h2 className="container__header">Books We Love</h2>
      <Row>
        {books.map((book) => (
          <Col md key={book._id} className="margin-top">
            <Link to={`/books/${book._id}`}>
              <img src={book.imageUrl} alt="book cover" />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
