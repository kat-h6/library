import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

type Query = {
  title: string
}

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1, publishedYear: -1 })
}

const filterBooks = async (filters: any): Promise<BookDocument[]> => {
  let query
  let foundBooks
  if ('ISBN' in filters) {
    query = { ISBN: { $eq: filters['ISBN'] } }
    foundBooks = await Book.find(query)
  } else if ('title' in filters) {
    query = { $text: { $search: filters['title'] } }
    foundBooks = await Book.find(query)
  } else if ('genre' in filters) {
    query = { genres: filters['genre'] }
    foundBooks = await Book.find(query)
  }
  if (!foundBooks) {
    return []
  }
  return foundBooks
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findById,
  findAll,
  filterBooks,
  update,
  deleteBook,
}
