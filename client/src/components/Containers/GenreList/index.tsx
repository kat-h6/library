import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { retrieveFilteredBooks } from '../../../redux/actions/book'

import './GenreList.scss'

export default function GenreList() {
  const dispatch = useDispatch()

  const searchGenre = (genreName: string) => {
    const values = {
      query: {
        value: 'genre',
        label: 'genre',
      },
      search: genreName,
    }
    dispatch(retrieveFilteredBooks(values))
  }

  return (
    <Container className="genres container--margin">
      <h2 className="container__header">Browse Trending Genres</h2>
      <ul className="genres__list">
        <li className="genres__item item--border">
          <Link to="/books/search" onClick={() => searchGenre('fantasy')}>
            Fantasy
          </Link>
        </li>
        <li className="genres__item item--border">
          <Link
            to="/books/search"
            onClick={() => searchGenre("children's literature")}
          >
            Children's Literature
          </Link>
        </li>
        <li className="genres__item item--border">
          <Link
            to="/books/search"
            onClick={() => searchGenre('science fiction')}
          >
            Science Fiction
          </Link>
        </li>
        <li className="genres__item item--border">
          <Link
            to="/books/search"
            onClick={() => searchGenre('dystopian fiction')}
          >
            Dystopian Fiction
          </Link>
        </li>
        <li className="genres__item item--border">
          <Link to="/books/search" onClick={() => searchGenre('thriller')}>
            Thriller
          </Link>
        </li>
        <li className="genres__item">
          <Link to="/books/search" onClick={() => searchGenre('mystery')}>
            Mystery
          </Link>
        </li>
      </ul>
    </Container>
  )
}
