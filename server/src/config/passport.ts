// import passport from 'passport'
// import passportLocal from 'passport-local'

// import { Request, Response, NextFunction } from 'express'

// const LocalStrategy = passportLocal.Strategy
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleTokenStrategy = require('passport-google-id-token')

import UserService from '../services/user'
import { JWT_SECRET } from '../util/secrets'

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
  },
  async function (parsedToken: any, googleId: string, done: any) {
    const userPayload = {
      email: parsedToken?.payload?.email,
      firstName: parsedToken?.payload?.given_name,
      lastName: parsedToken?.payload?.family_name,
    }
    try {
      const user = await UserService.findOrCreate(userPayload)
      done(null, user)
    } catch (e) {
      done(e)
    }
  }
)

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    const userEmail = payload.email
    const foundUser = await UserService.findUserByEmail(userEmail)
    done(null, foundUser)
  }
)
