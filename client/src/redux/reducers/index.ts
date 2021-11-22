import { combineReducers } from 'redux'

import product from './product'
import books from './book'

const createRootReducer = () =>
  combineReducers({
    product,
    books,
  })

export default createRootReducer
