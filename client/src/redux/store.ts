import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { AppState } from '../types/types'
import createRootReducer from './reducers'
import rootSaga from './sagas'

const initState: AppState = {
  product: {
    inCart: [],
  },
  books: {
    books: [],
    filteredBooks: [],
    selectedBook: null,
  },
  user: {
    user: null,
    token: null,
  },
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state')

      if (serializedState === null) {
        return undefined
      }

      return JSON.parse(serializedState)
    } catch (err) {
      return undefined
    }
  }

  const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
    } catch (err) {
      return undefined
    }
  }

  const savedState = loadState()
  if (savedState) initialState = savedState
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  store.subscribe(() => {
    saveState(store.getState())
  })

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
