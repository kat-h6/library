import { Dispatch } from 'redux'

import {
  FETCH_ALL_BOOKS,
  FetchAllBooks,
  Book,
  Values,
  FilterBooks,
  FILTER_BOOKS,
} from '../../types/book'

export function fetchAllBooks(books: Book[]): FetchAllBooks {
  return {
    type: FETCH_ALL_BOOKS,
    payload: {
      books: books,
    },
  }
}

export function filterBooks(books: Book[]): FilterBooks {
  return {
    type: FILTER_BOOKS,
    payload: {
      books: books,
    },
  }
}

export function retrieveFilteredBooks(values: Values) {
  return (dispatch: Dispatch) => {
    console.log(values)
    return fetch(
      `https://kat-h6-library.herokuapp.com/api/v1/search?${values.query.value}=${values.search}`
    )
      .then((resp) => resp.json())
      .then((books) => dispatch(filterBooks(books)))
  }
}

// Async action processed by redux-thunk middleware
export function retrieveBooks() {
  return (dispatch: Dispatch<any>) => {
    return fetch('https://kat-h6-library.herokuapp.com/api/v1/books')
      .then((resp) => resp.json())
      .then((books) => dispatch(fetchAllBooks(books)))
  }
}
