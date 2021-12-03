import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { retrieveFilteredBooks } from '../../../redux/actions/book'
import { Book } from '../../../types/book'
import BookingButton from '../../Navigating/BookingButton'
import './BookDetailsContainer.scss'

type BookDetailsProps = {
  book: Book
}

export default function BookDetailsContainer({ book }: BookDetailsProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchGenre = (genreName: string) => {
    const values = {
      query: {
        value: 'genre',
        label: 'genre',
      },
      search: genreName,
    }
    dispatch(retrieveFilteredBooks(values))
    navigate('/books/search')
  }

  return (
    <Container className="container--margin">
      <Row>
        <Col md className="container__book-image container--mb">
          <img src={book.imageUrl} alt="book cover" className="book-image" />
        </Col>
        <Col md className="container__book-detail container--mb">
          <h2 className="container__header--blue">{book.title}</h2>
          <p>by {book.authors.map((author) => author.name)}</p>
          {book.genres.map((genre) => (
            <Button
              variant="outline-success"
              onClick={() => searchGenre(genre)}
              className="genre-btn"
            >
              {genre}
            </Button>
          ))}
          <hr className="book-detail__border" />
          <p>{book.description}</p>
          <p className="book-detail__mt">
            <small>
              Published {book.publishedYear} by {book.publisher}
            </small>
          </p>
          <p>
            <small>ISBN: {book.ISBN}</small>
          </p>
          <hr className="book-detail__border" />
          <div className="button-container">
            {book.isAvailable ? <BookingButton /> : <p>Currently on Loan</p>}
            <Link to="/" className="book-detail__back-btn">
              <Button variant="success">Back</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
