import { Dispatch } from 'redux'

import {
  FETCH_ALL_BOOKS,
  FetchAllBooks,
  Book,
  SelectBook,
  SELECT_BOOK,
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

export function selectBook(book: Book): SelectBook {
  return {
    type: SELECT_BOOK,
    payload: {
      book: book,
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

export function retrieveBook(bookId: string | undefined) {
  return (dispatch: Dispatch) => {
    return fetch(`https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`)
      .then((resp) => resp.json())
      .then((book) => dispatch(selectBook(book)))
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
