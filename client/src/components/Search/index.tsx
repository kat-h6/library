import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import Select from 'react-select'
import { useDispatch } from 'react-redux'

import './Search.scss'
import { retrieveFilteredBooks } from '../../redux/actions/book'

const options = [
  { value: 'title', label: 'Title' },
  { value: 'ISBN', label: 'ISBN' },
]

export default function Search() {
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      search: 'search',
      query: 'title',
    },
    onSubmit: (values) => {
      dispatch(retrieveFilteredBooks(values))
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
      {/* <Form className="d-flex">
        <DropdownButton
          id="dropdown-basic-button"
          title="All"
          variant="success"
        >
          <Dropdown.Item href="#/title">Title</Dropdown.Item>
          <Dropdown.Item href="#/isbn">ISBN</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form> */}
    </>
  )
}
