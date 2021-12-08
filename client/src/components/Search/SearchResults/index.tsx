import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
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
          <div className="search-results__books">
            {books.map((book) => (
              <Link
                to={`/books/${book._id}`}
                key={book._id}
                className="search-results__book-margin"
              >
                <img src={book.imageUrl} alt="book cover" />
              </Link>
            ))}
          </div>
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
