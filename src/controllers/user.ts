import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, isAdmin, bookings } = req.body

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      bookings,
    })

    await UserService.create(user)
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
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
