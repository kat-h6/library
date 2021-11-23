import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
// import axios from 'axios'

import { AppState } from '../types/types'
import { retrieveBooks } from '../redux/actions/book'
import { Link } from 'react-router-dom'

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

  const responseGoogle = async (response: any) => {
    console.log(response)
  }

  return (
    <>
      <h1>The Little Local Library</h1>
      <GoogleLogin
        clientId="566595242960-kl4aklq9e7391q0soj2idrb04prftnmb.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {books.map((book) => (
        <Link key={book._id} to={`/books/${book._id}`}>
          <img src={book.imageUrl} alt="book cover" />
        </Link>
      ))}
      {/* {products.length <= 0 && <div>No products in cart</div>}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{`${p.name} - $${p.price}`}</Link>
            <button onClick={() => dispatch(removeProduct(p))}>Remove</button>
          </li>
        ))} */}
      {/* </ul> */}
    </>
  )
}
