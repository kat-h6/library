import React from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
// import * as yup from 'yup'

import './ReviewForm.scss'
import { submitReview } from '../../../redux/actions/book'

export default function ReviewForm() {
  const { bookId } = useParams()
  const dispatch = useDispatch()

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.title || values.title === 'Enter review title') {
      errors.title = 'Title required'
    }
    if (!values.author || values.author === 'Enter name') {
      errors.author = 'Name required'
    }
    if (!values.rating || values.rating === '1-5') {
      errors.rating = 'Rating required'
    } else if (values.rating > 5 || values.rating < 1) {
      errors.rating = 'Value must be between 1 and 5'
    }

    if (!values.content || values.content === 'Review content') {
      errors.content = 'Review content required'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      title: 'Enter review title',
      author: 'Enter name',
      rating: '1-5',
      content: 'Review content',
    },
    validate,
    onSubmit: (values) => {
      dispatch(submitReview(values, bookId))
    },
  })

  return (
    <div className="review-d-flex">
      <div className="review-form">
        <h5 className="review-form__header">Write a review</h5>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              id="title"
              placeholder={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title ? (
              <Form.Text className="text-muted">
                {formik.errors.title}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="author">Name</Form.Label>
            <Form.Control
              id="author"
              placeholder={formik.values.author}
              onChange={formik.handleChange}
            />
            {formik.errors.author ? (
              <Form.Text className="text-muted">
                {formik.errors.author}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="rating">Rating</Form.Label>
            <Form.Control
              id="rating"
              placeholder={formik.values.rating}
              onChange={formik.handleChange}
            />
            {formik.errors.rating ? (
              <Form.Text className="text-muted">
                {formik.errors.rating}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="content">Review</Form.Label>
            <Form.Control
              as="textarea"
              id="content"
              placeholder={formik.values.content}
              onChange={formik.handleChange}
              className="review__content"
            />
            {formik.errors.content ? (
              <Form.Text className="text-muted">
                {formik.errors.content}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Button type="submit" variant="warning">
            Submit review
          </Button>
        </Form>
      </div>
    </div>
  )
}
