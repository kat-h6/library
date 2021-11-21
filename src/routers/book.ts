import express from 'express'
import passport from 'passport'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  filterBooks,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.put(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  passport.authenticate('jwt', { session: false }),
  updateBook
)
router.delete(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  deleteBook
)
router.post('/', passport.authenticate('jwt', { session: false }), createBook)
router.get('/search', filterBooks)

export default router
