import { Dispatch } from 'redux'

import { FETCH_ALL_BOOKS, FetchAllBooks, Book } from '../../types/book'

export function fetchAllBooks(books: Book[]): FetchAllBooks {
  return {
    type: FETCH_ALL_BOOKS,
    payload: {
      books: books,
    },
  }
}
// Async action processed by redux-thunk middleware
export function retrieveBooks() {
  return (dispatch: Dispatch<any>) => {
    return fetch('/api/v1/books')
      .then((resp) => resp.json())
      .then((books) => dispatch(fetchAllBooks(books)))
  }
}
