import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { retrieveBooks } from '../redux/actions/book'
import NavBar from '../components/NavBar/index'
import BookGrid from '../components/BookGrid/index'
import { AppState } from '../types/types'

export default function Home() {
  const dispatch = useDispatch()

  const user = useSelector((state: AppState) => state.user.user)

  let greeting
  if (user) {
    greeting = <h4>Welcome back {user.firstName}</h4>
  }
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
      {greeting}
      <BookGrid />
    </>
  )
}
