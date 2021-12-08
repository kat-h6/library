import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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

  let rating = 0

  for (let i = 0; i < book.ratings.length; i++) {
    rating += book.ratings[i].rating
  }

  const numberOfStars = Math.ceil(rating / book.ratings.length)

  return (
    <Container className="container--margin">
      <Row>
        <Col md className="container__book-image container--mb">
          <img src={book.imageUrl} alt="book cover" className="book-image" />
        </Col>
        <Col md className="container__book-detail container--mb">
          <h2 className="container__header--blue">{book.title}</h2>
          <div className="display-flex">
            <p>by {book.authors.map((author) => author.name)}</p>
            <div className="star-rating">
              {book.ratings.length > 0 ? (
                new Array(numberOfStars)
                  .fill(null)
                  .map(() => <FontAwesomeIcon icon={faStar} className="star" />)
              ) : (
                <p>No reviews yet</p>
              )}
              <p className="rating-number">({book.ratings.length})</p>
            </div>
          </div>
          {book.genres.map((genre, index) => (
            <Button
              key={index}
              variant="outline-secondary"
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
          </div>
        </Col>
      </Row>
    </Container>
  )
}
