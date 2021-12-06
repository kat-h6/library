import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppState } from '../../../types/types'
import './SearchResults.scss'

export default function SearchResults() {
  const books = useSelector((state: AppState) => state.books.filteredBooks)

  if (!books) {
    return <div>0 Search Results</div>
  }

  return (
    <>
      <Container className="search-results container--margin">
        <h2 className="container__header">{books.length} Search Results</h2>
        <Row>
          {books.map((book) => (
            <Col md key={book._id} className="margin-top">
              <Link to={`/books/${book._id}`}>
                <img src={book.imageUrl} alt="book cover" />
              </Link>
            </Col>
          ))}
        </Row>
        <Button variant="warning" className="back-btn">
          <Link to="/" className="back-btn__link">
            Back
          </Link>
        </Button>
      </Container>
    </>
  )
}
