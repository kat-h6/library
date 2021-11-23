import { Dispatch } from 'redux'

import {
  FETCH_ALL_BOOKS,
  FetchAllBooks,
  Book,
  SelectBook,
  SELECT_BOOK,
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

export function retrieveBook(bookId: string | undefined) {
  return (dispatch: Dispatch) => {
    return fetch(`/api/v1/books/${bookId}`)
      .then((resp) => resp.json())
      .then((book) => dispatch(selectBook(book)))
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
