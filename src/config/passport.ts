// import passport from 'passport'
// import passportLocal from 'passport-local'

// import { Request, Response, NextFunction } from 'express'

// const LocalStrategy = passportLocal.Strategy

// const GoogleTokenStrategy = require('passport-google-id-token')

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
