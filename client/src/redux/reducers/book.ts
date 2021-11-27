import {
  BookState,
  BookActions,
  FETCH_ALL_BOOKS,
  SELECT_BOOK,
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
  default:
    return state
  }
}
