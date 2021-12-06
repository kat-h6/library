import React from 'react'
import { Container } from 'react-bootstrap'

import { Book } from '../../../types/book'
import Review from '../../Review'
import './BookRatings.scss'

type BookDetailsProps = {
  book: Book
}

export default function BookRatings({ book }: BookDetailsProps) {
  return (
    <Container className="reviews">
      <h4 className="reviews__header">Reviews</h4>
      {book.ratings ? (
        book.ratings.map((rating) => (
          <Review key={rating.author} rating={rating} />
        ))
      ) : (
        <p>No ratings yet</p>
      )}
    </Container>
  )
}
