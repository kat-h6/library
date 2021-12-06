import React from 'react'
import { Container } from 'react-bootstrap'

import { Book } from '../../../types/book'
import Review from '../../Review'
import ReviewForm from '../../ReviewForm'
import './BookRatings.scss'

type BookDetailsProps = {
  book: Book
}

export default function BookRatings({ book }: BookDetailsProps) {
  return (
    <Container className="reviews">
      <h4 className="reviews__header">Reviews</h4>
      {book.ratings.length > 0 ? (
        book.ratings.map((rating, index) => (
          <Review key={index} rating={rating} />
        ))
      ) : (
        <p>No ratings yet</p>
      )}
      <ReviewForm />
    </Container>
  )
}
