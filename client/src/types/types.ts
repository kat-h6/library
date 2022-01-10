import { BookState } from './book'
import { UserState } from './user'

export type AppState = {
  books: BookState
  user: UserState
}
