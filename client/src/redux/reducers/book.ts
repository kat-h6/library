import { BookState, BookActions, FETCH_ALL_BOOKS } from '../../types/book'

//prettier-ignore
export default function books(
  state: BookState = {
    books: []
  },
  action: BookActions
): BookState {
  switch (action.type) {
  case FETCH_ALL_BOOKS: {
    return { ...state, books: action.payload.books }
  }

  default:
    return state
  }
}
