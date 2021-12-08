import axios from 'axios'
import { Dispatch } from 'redux'

import {
  FETCH_ALL_BOOKS,
  FetchAllBooks,
  Book,
  Values,
  FilterBooks,
  FILTER_BOOKS,
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

export function filterBooks(books: Book[]): FilterBooks {
  return {
    type: FILTER_BOOKS,
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

// Async action processed by redux-thunk middleware

export function retrieveFilteredBooks(values: Values) {
  return (dispatch: Dispatch) => {
    return fetch(
      `https://kat-h6-library.herokuapp.com/api/v1/search?${values.query.value}=${values.search}`
    )
      .then((resp) => resp.json())
      .then((books) => dispatch(filterBooks(books)))
  }
}

export function retrieveBooks() {
  return (dispatch: Dispatch<any>) => {
    return fetch('https://kat-h6-library.herokuapp.com/api/v1/books')
      .then((resp) => resp.json())
      .then((books) => dispatch(fetchAllBooks(books)))
  }
}

export function getBook(bookId: string | undefined) {
  return (dispatch: Dispatch<any>) => {
    return fetch(`https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`)
      .then((resp) => resp.json())
      .then((book) => dispatch(selectBook(book)))
  }
}

export function submitReview(values: any, bookId: string | undefined) {
  return (dispatch: Dispatch<any>) => {
    const date = new Date()
    const review = {
      author: values.author,
      title: values.title,
      content: values.content,
      rating: values.rating,
      date: date,
    }
    return axios
      .patch(
        `https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}/ratings`,
        review
      )
      .then((data) => dispatch(getBook(data.data._id)))
  }
}

export function makeBookAvailable(bookId: string) {
  return (dispatch: Dispatch<any>) => {
    const availability = { isAvailable: true }
    return axios.patch(
      `https://kat-h6-library.herokuapp.com/api/v1/books/${bookId}`,
      availability
    )
  }
}

export function deleteBooking(
  bookingId: string | undefined,
  userId: string | undefined
) {
  return (dispatch: Dispatch<any>) => {
    const url = `https://kat-h6-library.herokuapp.com/api/v1/users/${userId}/bookings/${bookingId}`
    return axios.delete(url)
  }
}

export function createBook(values: any) {
  return (dispatch: Dispatch<any>) => {
    console.log(values)
    const bookAuthors = values.authors.split(',')
    const bookAuthorObjects = bookAuthors.map((author: string) => {
      let authorObj = {
        name: author,
      }
      return authorObj
    })
    const bookGenres = values.genres.split(',')
    const book = {
      title: values.title,
      description: values.description,
      imageUrl: values.imageUrl,
      publishedYear: values.publishedYear,
      publisher: values.publisher,
      ratings: [],
      isAvailable: true,
      authors: bookAuthorObjects,
      genres: bookGenres,
    }
    console.log(book)
    return axios
      .post('https://kat-h6-library.herokuapp.com/api/v1/books', book)
      .then((data) => console.log(data))
  }
}
