import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppState } from '../../../types/types'
import './BookGrid.scss'

export default function BookGrid() {
  const books = useSelector((state: AppState) => state.books.books).slice(0, 12)

  return (
    <Container className="top-picks">
      <h2 className="container__header">Top Picks 2021</h2>
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
