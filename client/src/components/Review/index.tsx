import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { Rating } from '../../types/book'
import './Review.scss'

type RatingProps = {
  rating: Rating
}

export default function Review({ rating }: RatingProps) {
  return (
    <div className="review">
      <hr className="review__border" />
      <div className="review__details">
        {new Array(rating.rating).fill(null).map(() => (
          <FontAwesomeIcon icon={faStar} />
        ))}
        <b className="review__author">{rating.author}</b>
        <small className="review__details__date">
          {rating.date.toString()}
        </small>
      </div>
      <h5 className="review__header">{rating.title}</h5>
      <p>{rating.content}</p>
    </div>
  )
}
