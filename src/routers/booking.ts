import express from 'express'

import {
  createBooking,
  findById,
  deleteBooking,
  findAll,
  updateBooking,
} from '../controllers/booking'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/:bookingId', findById)
router.put('/:bookingId', updateBooking)
router.delete('/:bookingId', deleteBooking)
router.post('/', createBooking)

export default router
