import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Search.scss'
import { retrieveFilteredBooks } from '../../redux/actions/book'

const options = [
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'ISBN', label: 'ISBN' },
  { value: 'genre', label: 'Genre' },
]

export default function Search() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      search: 'search',
      query: { label: 'title', value: 'title' },
    },
    onSubmit: (values) => {
      console.log(values)
      dispatch(retrieveFilteredBooks(values))
      navigate('/books/search')
    },
  })

  const defaultValue = (options: any, value: any) => {
    return options ? options.find((option: any) => option.value === value) : ''
  }

  return (
    <>
      <Form className="d-flex" onSubmit={formik.handleSubmit}>
        <Select
          options={options}
          value={defaultValue(options, formik.values.query)}
          onChange={(value) => formik.setFieldValue('query', value)}
          className="form__dropdown"
        />
        <FormControl
          name="search"
          id="search"
          onChange={formik.handleChange}
          value={formik.values.search}
          className="form__input"
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
    </>
  )
}
