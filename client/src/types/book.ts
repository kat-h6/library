export const FETCH_ALL_BOOKS = 'FETCH_ALL_BOOKS'

export type Author = {
  firstName: string
  lastName: string
  author: string
}

export type Book = {
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

export type FetchAllBooks = {
  type: typeof FETCH_ALL_BOOKS
  payload: {
    books: Book[]
  }
}

export type BookState = {
  books: Book[]
}

export type BookActions = FetchAllBooks
