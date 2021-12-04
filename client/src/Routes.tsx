import React from 'react'
// import { Switch, Route } from 'react-router-dom' // old
import { Routes as Switch, Route } from 'react-router-dom' // updated to latest
//https://reactrouter.com/docs/en/v6/upgrading/v5
//https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

import Home from './pages/Home'
import Product from './pages/Product'
import BookDetails from './pages/BookDetails'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'

const Routes = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="/books/:bookId" element={<BookDetails />} />
    <Route path="/products/:id" element={<Product />} />
    <Route path="/books" element={<Books />} />
    <Route path="/books/search" element={<Search />} />
    <Route path="/dashboard/:userId" element={<Dashboard />} />
  </Switch>
)

export default Routes
