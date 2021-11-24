import { combineReducers } from 'redux'

import product from './product'
import books from './book'
import user from './user'

const createRootReducer = () =>
  combineReducers({
    product,
    books,
    user,
  })

export default createRootReducer
