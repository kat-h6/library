import React from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
// import { useNavigate } from 'react-router'

import './ReviewForm.scss'
import axios from 'axios'
import { useParams } from 'react-router'

export default function ReviewForm() {
  const { bookId } = useParams()

  const submitReview = async (values: any) => {
    const date = new Date()
    const review = {
      title: values.title,
      content: values.content,
      rating: values.rating,
      date: date,
    }
    return await axios.patch(
      `https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}/ratings`,
      review
    )
  }

  // const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      title: 'Enter review title',
      author: 'Enter name',
      rating: '1-5',
      content: 'Review content',
    },
    onSubmit: (values) => {
      submitReview(values)
      // navigate('/books/search')
    },
  })

  return (
    <div className="review-form">
      <h5>Write a review</h5>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            id="title"
            placeholder={formik.values.title}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="author">Name</Form.Label>
          <Form.Control
            id="author"
            placeholder={formik.values.author}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="rating">Rating</Form.Label>
          <Form.Control
            id="rating"
            placeholder={formik.values.rating}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="content">Review</Form.Label>
          <Form.Control
            as="textarea"
            id="author"
            placeholder={formik.values.content}
            onChange={formik.handleChange}
            className="review__content"
          />
        </Form.Group>
        <Button type="submit" variant="warning">
          Submit review
        </Button>
      </Form>
    </div>
  )
}
