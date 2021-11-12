import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import compression from 'compression'

import bookRouter from './routers/book'
import userRouter from './routers/user'
import bookingRouter from './routers/booking'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/bookings', bookingRouter)
// Custom API error handler
app.use(apiErrorHandler)

export default app
