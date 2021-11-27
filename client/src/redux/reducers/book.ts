import {
  BookState,
  BookActions,
  FETCH_ALL_BOOKS,
  SELECT_BOOK,
  FILTER_BOOKS,
} from '../../types/book'

//prettier-ignore
export default function books(
  state: BookState = {
    books: [],
    selectedBook: null,
    filteredBooks: []
  },
  action: BookActions
): BookState {
  switch (action.type) {
  case FETCH_ALL_BOOKS: {
    return { ...state, books: action.payload.books }
  }
  case SELECT_BOOK: {
    return {...state, selectedBook: action.payload.book}
  }
  case FILTER_BOOKS: {
    return {...state, filteredBooks: action.payload.books}
  }
  default:
    return state
  }
}
