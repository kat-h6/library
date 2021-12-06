export const FETCH_ALL_BOOKS = 'FETCH_ALL_BOOKS'
export const FILTER_BOOKS = 'FILTER_BOOKS'

export type Author = {
  name: string
  author: string
}

export type Rating = {
  title: string
  content: string
  rating: number
  author: string
  date: Date
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
  ratings: Rating[]
}

type Query = {
  value: string
  label: string
}
export type Values = {
  query: Query
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
  filteredBooks: Book[]
}

export type FilterBooks = {
  type: typeof FILTER_BOOKS
  payload: {
    books: Book[]
  }
}

export type BookActions = FetchAllBooks | FilterBooks
