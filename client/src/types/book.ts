export const FETCH_ALL_BOOKS = 'FETCH_ALL_BOOKS'
export const SELECT_BOOK = 'SELECT_BOOK'
export const FILTER_BOOKS = 'FILTER_BOOKS'

export type Author = {
  firstName: string
  lastName: string
  author: string
}

export type Book = {
  _id: string
  title: string
  authors: Author[]
  description: string
  ISBN: number
  publisher: string
  publishedYear: number
  genres: string[]
  isAvailable: boolean
  imageUrl: string
}

export type Query = {
  value: string
  label: string
}

export type Values = {
  query: string
  search: string
}

export type FetchAllBooks = {
  type: typeof FETCH_ALL_BOOKS
  payload: {
    books: Book[]
  }
}

export type BookState = {
  books: Book[]
  selectedBook: Book | null
  filteredBooks: Book[]
}

export type SelectBook = {
  type: typeof SELECT_BOOK
  payload: {
    book: Book
  }
}

export type FilterBooks = {
  type: typeof FILTER_BOOKS
  payload: {
    books: Book[]
  }
}

export type BookActions = FetchAllBooks | SelectBook | FilterBooks
