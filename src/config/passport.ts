// import passport from 'passport'
// import passportLocal from 'passport-local'

// import { Request, Response, NextFunction } from 'express'

// const LocalStrategy = passportLocal.Strategy

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleTokenStrategy = require('passport-google-id-token')

import userService from '../services/user'

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
      const user = await userService.findOrCreate(userPayload)
      done(null, user)
    } catch (e) {
      done(e)
    }
  }
)
// passport.use(
//   new GoogleTokenStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//     },
//     async function (parsedToken: any, googleId: string, done: any) {
//       console.log(parsedToken)
//       const userPayload = {
//         email: parsedToken?.payload?.email,
//         firstName: parsedToken?.payload?.given_name,
//         lastName: parsedToken?.payload?.family_name
//       }
//     }
//   )
// )
