import React from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import './NewBookForm.scss'
import { createBook, retrieveBooks } from '../../redux/actions/book'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'

export default function NewBookForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: '',
      authors: '',
      description: '',
      ISBN: '',
      publisher: '',
      publishedYear: '',
      genres: '',
      imageUrl: '',
      ratings: '',
    },
    onSubmit: (values) => {
      dispatch(createBook(values))
      dispatch(retrieveBooks())
      Swal.fire('Success! Book added').then(function () {
        navigate('/')
      })
    },
  })

  return (
    <div className="form-d-flex">
      <div className="book-form">
        <h5 className="book-form__header">New Book</h5>
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
            <Form.Label htmlFor="authors">Authors</Form.Label>
            <Form.Control
              id="authors"
              placeholder={formik.values.authors}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              placeholder={formik.values.description}
              onChange={formik.handleChange}
              className="book-form__description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ISBN">ISBN</Form.Label>
            <Form.Control
              id="ISBN"
              placeholder={formik.values.ISBN}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="publisher">Publisher</Form.Label>
            <Form.Control
              id="publisher"
              placeholder={formik.values.publisher}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="publishedYear">Published Year</Form.Label>
            <Form.Control
              id="publishedYear"
              placeholder={formik.values.publishedYear}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="genres">Genres</Form.Label>
            <Form.Control
              id="genres"
              placeholder={formik.values.genres}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="imageUrl">Image Url</Form.Label>
            <Form.Control
              id="imageUrl"
              placeholder={formik.values.imageUrl}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="warning">
            Add Book
          </Button>
        </Form>
      </div>
    </div>
  )
}
