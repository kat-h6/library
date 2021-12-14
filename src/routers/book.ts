import express from 'express'
import passport from 'passport'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  filterBooks,
  addRating,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.patch('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)
router.get('/search', filterBooks)
router.patch(
  '/:bookId/ratings',
  passport.authenticate('jwt', { session: false }),
  addRating
)

export default router
