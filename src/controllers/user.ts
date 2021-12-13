import { JWT_SECRET } from './../util/secrets'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import User from '../models/User'
import UserService from '../services/user'

// POST /users
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, isAdmin, bookings } = req.body
    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
      res.status(403).json({ message: 'Email is already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin,
      bookings,
    })

    await UserService.create(user)
    const token = await jwt.sign({ email }, JWT_SECRET)
    res.status(200).json({ token, user: user })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await UserService.findUserByEmail(req.body.email)
  if (!user) {
    return res.status(400).send('Can\'t find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      )
      res.json({ token, user })
    }
  } catch (error) {
    next(error)
  }
}

// PUT /users/userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, id, firstName, lastName } = req.user as any
    const token = await jwt.sign(
      {
        email,
        id,
        firstName,
        lastName,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token, id, firstName, lastName })
  } catch (error) {
    return next(new InternalServerError())
  }
}

// GET /users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    res.json(await UserService.createBooking(req.body, userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const bookingId = req.params.bookingId
    res.json(await UserService.deleteBooking(bookingId, userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
