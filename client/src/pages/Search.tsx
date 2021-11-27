import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppState } from '../types/types'
import NavBar from '../components/NavBar'

export default function BookDetails() {
  const books = useSelector((state: AppState) => state.books.filteredBooks)

  if (!books) {
    return <div>0 Search Results</div>
  }

  console.log(books)
  return (
    <>
      <NavBar />
      <Container>
        <h2>{books.length} Search Results</h2>
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
      <Link to="/">Back</Link>
    </>
  )
}
