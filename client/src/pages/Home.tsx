import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../types/types'
import { retrieveBooks } from '../redux/actions/book'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function Home() {
  const dispatch = useDispatch()
  const books = useSelector((state: AppState) => state.books.books)

  // const handleAddProduct = () => {
  //   const product: Product = {
  //     id: (+new Date()).toString(),
  //     name: names[Math.floor(Math.random() * names.length)],
  //     price: +(Math.random() * 10).toFixed(2),
  //   }
  //   dispatch(addProduct(product))
  // }

  useEffect(() => {
    dispatch(retrieveBooks())
  }, [dispatch])

  return (
    <>
      <NavBar />
      {books.map((book) => (
        <Link key={book._id} to={`/books/${book._id}`}>
          <img src={book.imageUrl} alt="book cover" />
        </Link>
      ))}
    </>
  )
}
