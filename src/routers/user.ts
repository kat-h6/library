import express from 'express'
import passport from 'passport'

import {
  findById,
  deleteUser,
  findAll,
  updateUser,
  authenticate,
  createBooking,
  deleteBooking,
  signUp,
  signIn,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', passport.authenticate('jwt', { session: false }), findAll)
router.get('/:userId', findById)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)
router.delete('/:userId', deleteUser)
// router.post('/', createUser)
router.post('/', signUp)
router.post('/login', signIn)
router.post(
  '/google-authenticate',
  passport.authenticate('google-id-token', { session: false }),
  authenticate
)
router.patch('/:userId/bookings', createBooking)
router.delete('/:userId/bookings/:bookingId', deleteBooking)

export default router
