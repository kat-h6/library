import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'

import { googleStrategy, jwtStrategy } from './config/passport'
import bookRouter from './routers/book'
import userRouter from './routers/user'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { filterBooks } from './controllers/book'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(passport.initialize())
app.use(passport.session())
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
passport.use(googleStrategy)
passport.use(jwtStrategy)

// routers
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
//filtering
app.get('/api/v1/search', filterBooks)
// Custom API error handler
app.use(apiErrorHandler)

export default app
